// models/Slide.js (Mongoose model)
import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Slide || mongoose.model("Slide", SlideSchema);
