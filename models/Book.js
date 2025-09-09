import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  titleEnglish: {
    type: String,
    required: true,
    trim: true,
  },
  titleUrdu: {
    type: String,
    required: true,
    trim: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
