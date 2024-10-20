import mongoose from 'mongoose';
import Joi from 'joi';

// Mongoose Schema
const jobPostSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  jobType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  },
  requirements: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000
  },
  experience: {
    type: Number, // In years
    required: true
  },
  salary: {
    type: String,
    trim: true,
    match: /^\$\d{1,3}(,\d{3})*(\.\d{2})?$|^$/  // Matches salary in format $100,000 - $130,000
  },
  benefits: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  applicationDeadline: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Mongoose model
const JobPost = mongoose.model('JobPost', jobPostSchema);


// Joi validation schema
const jobPostValidationSchema = Joi.object({
  company: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  jobTitle: Joi.string().min(2).max(100).required(),
  jobType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required(),
  location: Joi.string().required(),
  description: Joi.string().min(10).max(5000).required(),
  requirements: Joi.string().min(10).max(2000).required(),
  experience: Joi.number().min(0).required(),
  salary: Joi.string().pattern(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$|^$/).allow(''),
  benefits: Joi.string().max(1000).allow(''),
  applicationDeadline: Joi.date().iso().allow(null)
});

const validateJobPost = (jobPost) => {
  return jobPostValidationSchema.validate(jobPost);
};

export { JobPost, validateJobPost };

