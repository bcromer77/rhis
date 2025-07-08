import express from 'express';
import { createTranscript, getAllTranscripts } from '../controllers/transcriptController.js';

const router = express.Router();

router.post('/create', createTranscript);
router.get('/all', getAllTranscripts);

export default router;

