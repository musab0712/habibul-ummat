import mongoose from "mongoose";

const khanaqahGallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
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

export default mongoose.models.KhanaqahGallery ||
  mongoose.model("KhanaqahGallery", khanaqahGallerySchema);
