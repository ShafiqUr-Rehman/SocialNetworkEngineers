import Engineer from '../models/register.model.js';
import path from 'path';

export const registerEngineer = async (req, res) => {
  const { name, title, company, location, skills, experience } = req.body;
  const cvFile = req.file;

  try {
    if (!name || !title || !company || !location || !skills || !experience || !cvFile) {
      return res.status(400).json({ message: 'All fields are required, including CV upload.' });
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

    res.status(200).json({ message: 'Engineer registered successfully!', engineer });
  } catch (error) {
    console.error('Error in registerEngineer:', error);
    res.status(500).json({ message: 'Error registering engineer.', error: error.message });
  }
};

export const fetchEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.status(200).json(engineers);
  } catch (error) {
    console.error('Error in fetchEngineers:', error);
    res.status(500).json({ message: 'Error fetching engineers.', error: error.message });
  }
};