// models/Kahanqah.js
import mongoose from "mongoose";

const KhanaqahSchema = new mongoose.Schema(
  {
    metaTags: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      keywords: {
        type: String,
        default: "",
      },
    },
    heroImage: {
      type: String,
      default: "",
    },
    content: {
      english: {
        type: String,
        default: "",
      },
      urdu: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplication by using a singleton model
export default mongoose.models.Khanaqah ||
  mongoose.model("Khanaqah", KhanaqahSchema);
