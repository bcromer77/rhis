import express from 'express';
import {
  createTranscript,
  getAllTranscripts,
  searchTranscriptsByVector
} from '../controllers/transcriptController.js';

const router = express.Router();

router.post('/create', createTranscript);
router.get('/all', getAllTranscripts);
router.post('/search', searchTranscriptsByVector);

export default router;

