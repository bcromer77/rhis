import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from urllib.parse import urljoin, urlparse
import pdfplumber
import tempfile
import os
import time
import hashlib  # For robust IDs if needed

def download_and_extract(url, max_chars=50000):
    """Download PDF from URL and extract text."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (compatible; PRISM-Bot/1.0)'}  # Polite UA
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            tmp.write(resp.content)
            tmp_path = tmp.name
        
        text = ""
        with pdfplumber.open(tmp_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                text += page_text + "\n"
        
        os.unlink(tmp_path)
        
        # Truncate and clean
        text = ' '.join(text.split())[:max_chars]  # Basic clean, limit
        if not text.strip():
            raise ValueError("No extractable text")
        
        return text
    except Exception as e:
        print(f"❌ Extraction failed for {url}: {e}")
        return None

def get_country_from_url(url):
    """Infer country from URL domain."""
    parsed = urlparse(url)
    if 'gazette.gc.ca' in parsed.netloc or 'ourcommons.ca' in parsed.netloc:
        return 'Canada'
    elif 'govinfo.gov' in parsed.netloc or 'congress.gov' in parsed.netloc:
        return 'USA'
    elif 'diputados.gob.mx' in parsed.netloc or 'senado.gob.mx' in parsed.netloc or 'dof.gob.mx' in parsed.netloc:
        return 'Mexico'
    return 'Unknown'

def get_latest_canada_gazette_pdfs(num_days=7):
    """Scrape latest Gazette Part I PDFs."""
    year = datetime.now().year
    url = f"https://gazette.gc.ca/rp-pr/p1/{year}/index-eng.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pdf_urls = []
    cutoff = datetime.now() - timedelta(days=num_days)
    for link in soup.find_all('a', href=True):
        href = link['href']
        if href.endswith('.pdf') and '/pdf/' in href:
            date_str = href.split('/')[-2]
            try:
                doc_date = datetime.strptime(date_str, '%Y-%m-%d')
                if doc_date >= cutoff:
                    full_url = urljoin("https://gazette.gc.ca", href)
                    pdf_urls.append(full_url)
            except ValueError:
                continue
    return pdf_urls[:3]

def get_latest_hansard_pdfs(num_sittings=3):
    """Scrape latest Hansard sittings (updated to 45-1 for Sep 2025)."""
    parliament, session = 45, 1
    index_url = f"https://www.ourcommons.ca/documentviewer/en/{parliament}-{session}/house/hansard-index"
    response = requests.get(index_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pdf_urls = []
    sittings = set()
    # Parse sitting links (table-based; look for sitting-N)
    for link in soup.find_all('a', href=True):
        href = link['href']
        if '/sitting-' in href and 'hansard' in href.lower():
            sitting_match = href.split('sitting-')[1].split('/')[0]
            if sitting_match.isdigit():
                sittings.add(int(sitting_match))
    
    sittings = sorted(list(sittings), reverse=True)
    for sitting in sittings[:num_sittings]:
        pdf_url = f"https://www.ourcommons.ca/Content/TopMenu/PDFs/1/HANSARD-{parliament}-{session}-{sitting}-E.pdf"
        try:
            if requests.head(pdf_url, timeout=10).status_code == 200:
                pdf_urls.append(pdf_url)
        except:
            continue
    return pdf_urls

def get_latest_federal_register_pdfs(num_docs=3):
    """Fetch latest Federal Register PDFs via API."""
    api_url = "https://www.federalregister.gov/api/v1/documents.json"
    params = {'per_page': num_docs, 'order': 'newest', 'fields[]': ['pdf_url']}
    response = requests.get(api_url, params=params)
    data = response.json()
    return [doc['pdf_url'] for doc in data['results'] if doc.get('pdf_url')]

def get_latest_congress_bills_pdfs(api_key='DEMO_KEY', num_bills=3):
    """Fetch latest bills PDFs (use real key for prod)."""
    bills_url = "https://api.congress.gov/v3/bill"
    params = {'limit': num_bills, 'api_key': api_key, 'format': 'json', 'sort': 'lastUpdated'}
    response = requests.get(bills_url, params=params)
    bills_data = response.json().get('searchResults', {}).get('bills', [])
    
    pdf_urls = []
    for bill in bills_data:
        congress = bill['congress']
        bill_type = bill['billType']
        bill_num = bill['number']
        text_url = f"https://api.congress.gov/v3/bill/{congress}/{bill_type}/{bill_num}/text"
        text_params = {'format': 'pdf', 'linkType': 'pdf', 'api_key': api_key}
        text_response = requests.get(text_url, params=text_params)
        text_data = text_response.json()
        if 'textVersions' in text_data and text_data['textVersions']:
            latest_version = text_data['textVersions'][0]
            pdf_url = latest_version.get('pdfUrl', '')
            if pdf_url:
                pdf_urls.append(pdf_url)
    return pdf_urls[:num_bills]

def get_latest_dof_pdfs(num_days=1):
    """Scrape DOF for latest PDFs (daily)."""
    url = "https://www.dof.gob.mx/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pdf_urls = []
    cutoff = datetime.now() - timedelta(days=num_days)
    # Find fecha sections and codnota links
    for div in soup.find_all('div', class_='fecha')[:5]:  # Top recent
        date_text = div.get_text()
        if 'Fecha:' in date_text:
            try:
                date_str = date_text.split('Fecha: ')[1].split()[0]
                doc_date = datetime.strptime(date_str, '%d/%m/%Y')
                if doc_date >= cutoff:
                    for link in div.find_all('a', href=True):
                        href = link['href']
                        if 'nota_to_doc.php?codnota=' in href:
                            codnota = href.split('codnota=')[1].split('&')[0]
                            full_pdf_url = f"https://www.dof.gob.mx/nota_to_doc.php?codnota={codnota}"
                            pdf_urls.append(full_pdf_url)
            except ValueError:
                continue
    return pdf_urls[:3]

def get_latest_diputados_pdfs(num_days=7):
    """Scrape main cronica page for latest debate PDFs (/pdf/66/2025/...)."""
    url = "https://cronica.diputados.gob.mx/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pdf_urls = []
    cutoff = datetime.now() - timedelta(days=num_days)
    for link in soup.find_all('a', href=True):
        href = link['href']
        if href.startswith('/pdf/66/2025/') and href.endswith('.pdf'):
            # Extract date from filename, e.g., 250921-1.pdf -> 2025-09-21
            date_code = href.split('/')[-1].replace('.pdf', '').split('-')[0]
            try:
                # Assume YYMMDD format: 250921 -> 2025-09-21
                year = f"20{date_code[:2]}"
                month_day = date_code[2:]
                date_str = f"{year}-{month_day[:2]}-{month_day[2:]}"
                doc_date = datetime.strptime(date_str, '%Y-%m-%d')
                if doc_date >= cutoff:
                    full_url = urljoin("https://cronica.diputados.gob.mx", href)
                    pdf_urls.append(full_url)
            except ValueError:
                continue
    return pdf_urls[:3]  # Fallback to 3 recent

def get_latest_senado_pdfs(leg=66, num_docs=3):
    """Scrape Senado gaceta for latest PDFs."""
    list_url = f"https://www.senado.gob.mx/{leg}/gaceta_del_senado"
    response = requests.get(list_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pdf_urls = []
    doc_links = soup.find_all('a', href=lambda h: h and '/documento/' in h and h.endswith('.pdf'))
    ids = [link['href'].split('/documento/')[1].replace('.pdf', '') for link in doc_links if link['href']]
    ids = sorted(set(ids), reverse=True, key=lambda x: int(x) if x.isdigit() else 0)
    for doc_id in ids[:num_docs]:
        pdf_url = f"https://www.senado.gob.mx/{leg}/gaceta_del_senado/documento/{doc_id}.pdf"
        try:
            if requests.head(pdf_url, timeout=10).status_code == 200:
                pdf_urls.append(pdf_url)
        except:
            continue
    return pdf_urls

def fetch_gov_pdfs(api_key='DEMO_KEY'):
    """Full fetch: Get URLs, download/extract, return list of {'id', 'title', 'transcript', 'type':'pdf'}."""
    all_docs = []
    
    sources = [
        ('Canada Gazette', get_latest_canada_gazette_pdfs()),
        ('Canada Hansard', get_latest_hansard_pdfs()),
        ('USA Federal Register', get_latest_federal_register_pdfs()),
        ('USA Congress Bills', get_latest_congress_bills_pdfs(api_key)),
        ('Mexico DOF', get_latest_dof_pdfs()),
        ('Mexico Diputados', get_latest_diputados_pdfs()),
        ('Mexico Senado', get_latest_senado_pdfs())
    ]
    
    for source_name, urls in sources:
        country = get_country_from_url(urls[0]) if urls else 'Unknown'
        for url in urls[:5]:  # Max 5 per source
            print(f"📥 Processing {source_name}: {url}")
            text = download_and_extract(url)
            if text:
                filename = url.split('/')[-1].replace('.pdf', '')
                doc_id = filename or hashlib.md5(url.encode()).hexdigest()[:8]
                title = f"{country} {source_name} - {filename.split('-')[-1] if '-' in filename else filename}"
                
                doc = {
                    'id': doc_id,
                    'title': title,
                    'transcript': text,
                    'type': 'pdf'
                }
                all_docs.append(doc)
                print(f"✅ Extracted {len(text)} chars for {title}")
            
            time.sleep(1)  # Rate limit
    
    print(f"✅ Fetched {len(all_docs)} PDF docs")
    return all_docs
