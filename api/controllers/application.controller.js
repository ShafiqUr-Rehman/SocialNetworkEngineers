import { JobApplication } from '../models/Application.js';

export const ApplicationData = async (req, res) => {
  const { applicantName, applicantEmail, coverLetter } = req.body;

  try {
    if (!applicantName || !applicantEmail || !coverLetter) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const application = new JobApplication({
      applicantName,
      applicantEmail,
      coverLetter,
    });

    await application.save();
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error in ApplicationData:', error);
    res.status(500).json({ message: 'Error submitting application.', error: error.message });
  }
};

export const fetchApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();  // Removed populate
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error in fetchApplications:', error);
    res.status(500).json({ message: 'Error fetching applications.', error: error.message });
  }
};


// export const editApplication = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const updatedApplication = await JobApplication.findByIdAndUpdate(id, updates, { new: true });
//     if (!updatedApplication) {
//       return res.status(404).json({ message: 'Application not found' });
//     }
//     res.status(200).json(updatedApplication);
//   } catch (error) {
//     console.error('Error in editApplication:', error);
//     res.status(500).json({ message: 'Error updating application', error: error.message });
//   }
// };

// export const deleteApplication = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedApplication = await JobApplication.findByIdAndDelete(id);
//     if (!deletedApplication) {
//       return res.status(404).json({ message: 'Application not found' });
//     }
//     res.status(200).json({ message: 'Application deleted successfully!' });
//   } catch (error) {
//     console.error('Error in deleteApplication:', error);
//     res.status(500).json({ message: 'Error deleting application', error: error.message });
//   }
// };