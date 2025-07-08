import mongoose from 'mongoose';

const transcriptSchema = new mongoose.Schema({
  country: String,
  speaker: String,
  text: String,
  date: Date,
  source: String,
  vector: [Number], // for embeddings
  tags: [String],
  sentiment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Transcript = mongoose.model('Transcript', transcriptSchema);
export default Transcript;

