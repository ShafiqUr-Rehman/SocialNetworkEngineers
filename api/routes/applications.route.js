import express from 'express';
import { ApplicationData,fetchApplications} from '../controllers/application.controller.js';

const router = express.Router();

// Route to submit a job application
router.post('/apply', ApplicationData);


// Admin routes for managing applications
router.get('/admin/applications', fetchApplications);
// router.get('/admin/applications', editApplication);
// router.delete('/admin/applications/:id', deleteApplication);

export default router;