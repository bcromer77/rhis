const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export const fetchAllTranscripts = async () => {
  const res = await fetch(`${BASE_URL}/api/transcripts/all`);
  return res.json();
};
