import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
