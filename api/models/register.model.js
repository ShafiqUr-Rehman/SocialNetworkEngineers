import mongoose from 'mongoose';

// Define the Engineer schema
const EngineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  avatar: { type: String, required: true }, // URL of the user's avatar
  cvUrl: { type: String, required: true }, // URL for the uploaded CV
}, { timestamps: true });

// Create the Engineer model
const Engineer = mongoose.model('Engineer', EngineerSchema);

// Export the Engineer model
export default Engineer;
