// controllers/transcriptController.js

import { OpenAI } from 'openai';
import Transcript from '../models/Transcript.js';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CRITICAL_MINERALS = [
  'iron ore', 'coal', 'coking coal', 'manganese', 'ferroalloys', 'ferrosilicon', 'ferrochrome',
  'tin', 'tungsten', 'tantalum',
  'lithium', 'cobalt', 'graphite', 'copper', 'rare earth', 'nickel', 'vanadium',
  'bauxite', 'zinc', 'molybdenum', 'chromium'
];

const RED_FLAG_PHRASES = [
  'supreme court stay', 'environment clearance', 'illegal mining', 'judicial review',
  'forest conservation act', 'section 144', 'nationalise', 'strategic reserve',
  'state ownership', 'sovereign control', 'indigenisation',
  'export duty', 'windfall tax', 'customs relief', 'tariff barrier', 'subsidy approval',
  'fdi withdrawal', 'investor exit', 'expropriation', 'lease revocation'
];

const ACTIVIST_TERMS = [
  'greenpeace', 'earthrights', 'adivasi', 'tribal protest', 'activists', 'campaigners',
  '#stopmining', 'fridays for future'
];

const SHIPPING_TERMS = [
  'port access', 'export corridor', 'container terminal', 'supply chain disruption',
  'logistics hub', 'shipping ban', 'dock workers', 'coastal movement'
];

export const createTranscript = async (req, res) => {
  try {
    const {
      country,
      speaker,
      text,
      date,
      source,
      tags = [],
      sentiment = 'unknown'
    } = req.body;

    // 🔥 Generate vector embedding from OpenAI
    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text
    });
    const vector = embeddingRes.data[0].embedding;

    // 🧠 Extract symbolic tags
    const detectedMinerals = CRITICAL_MINERALS.filter(m => text.toLowerCase().includes(m));
    const flaggedPhrases = RED_FLAG_PHRASES.filter(p => text.toLowerCase().includes(p));
    const activists = ACTIVIST_TERMS.filter(a => text.toLowerCase().includes(a));
    const shippingAlerts = SHIPPING_TERMS.filter(s => text.toLowerCase().includes(s));

    const transcript = new Transcript({
      country,
      speaker,
      text,
      date,
      source,
      tags,
      sentiment,
      vector,
      minerals: detectedMinerals,
      regulatoryWarnings: flaggedPhrases,
      activists,
      shippingAlerts
    });

    const saved = await transcript.save();
    res.json({ message: 'Transcript saved', data: saved });
  } catch (err) {
    console.error('Transcript creation error:', err);
    res.status(500).json({ message: 'Error creating transcript', error: err.message });
  }
};

