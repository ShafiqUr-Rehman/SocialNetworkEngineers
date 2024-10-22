import { JobPost } from '../models/jobs.js';
const { StatusCodes } = require("http-status-codes");

export const createListing = async (req, res) => {
  try {
    const job = new JobPost(req.body);  // Updated to use JobPost
    await job.save();
    res.status(StatusCodes.CREATED).json({ message: "Job listing created successfully", job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error creating job listing", error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find();  // Updated to use JobPost
    res.status(StatusCodes.OK).json(jobs);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching jobs", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await JobPost.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });  // Updated to use JobPost

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(StatusCodes.OK).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating job", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await JobPost.findByIdAndDelete(id);  // Updated to use JobPost
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(StatusCodes.OK).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting job", error: error.message });
  }
};
