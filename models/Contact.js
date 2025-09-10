import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    address: {
      english: { type: String, required: true },
      urdu: { type: String, required: true },
    },
    phoneNumbers: {
      primary: { type: String, required: true },
      secondary: { type: String, default: "" },
    },
    email: { type: String, required: true },
    description: {
      english: { type: String, required: true },
      urdu: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Create a singleton document
ContactSchema.statics.getContact = async function () {
  let contact = await this.findOne();
  if (!contact) {
    contact = await this.create({
      address: { english: "", urdu: "" },
      phoneNumbers: { primary: "", secondary: "" },
      email: "",
      description: { english: "", urdu: "" },
    });
  }
  return contact;
};

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
