import Engineer from '../models/register.model.js';
const { StatusCodes} = require("http-status-codes");
import path from 'path';

export const registerEngineer = async (req, res) => {
  const { name, title, company, location, skills, experience } = req.body;
  const cvFile = req.file;

  try {
    if (!name || !title || !company || !location || !skills || !experience || !cvFile) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required, including CV upload.' });
    }

    // Create the URL path for the CV file
    const cvUrl = `/uploads/${cvFile.filename}`;

    const engineer = new Engineer({
      name,
      title,
      company,
      location,
      skills: skills.split(',').map(skill => skill.trim()),
      experience,
      cvUrl,
      avatar: 'https://example.com/default-avatar.png', // Add a default avatar URL
    });

    await engineer.save();

    res.status(StatusCodes.OK).json({ message: 'Engineer registered successfully!', engineer });
  } catch (error) {
    console.error('Error in registerEngineer:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error registering engineer.', error: error.message });
  }
};

export const fetchEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.status(StatusCodes.OK).json(engineers);
  } catch (error) {
    console.error('Error in fetchEngineers:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching engineers.', error: error.message });
  }
};
