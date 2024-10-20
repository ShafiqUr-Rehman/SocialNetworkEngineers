import express from "express";
import { createListing, getJobs, updateJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/jobs", createListing);   
router.get("/jobs", getJobs);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

export default router;