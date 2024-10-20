'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api';

const jobSchema = yup.object({
  company: yup.string().required().min(2).max(100),
  email: yup.string().email().required(),
  jobTitle: yup.string().required().min(2).max(100),
  jobType: yup.string().oneOf(['full-time', 'part-time', 'contract', 'internship']).required(),
  location: yup.string().required(),
  description: yup.string().required().min(10).max(5000),
  requirements: yup.string().required().min(10).max(2000),
  experience: yup.number().required().min(0),
  salary: yup.string().matches(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$|^$/, 'Invalid salary format'),
  benefits: yup.string().max(1000),
  applicationDeadline: yup.date().nullable(),
}).required()

type JobFormData = yup.InferType<typeof jobSchema>

type Job = JobFormData & { _id: string, createdAt: string }

type Application = {
  _id: string
  applicantName: string
  applicantEmail: string
  coverLetter: string
  createdAt: string
}

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState('jobs')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<JobFormData>({
    resolver: yupResolver(jobSchema)
  })

  useEffect(() => {
    fetchJobs()
    fetchApplications()
  }, [])

  useEffect(() => {
    if (editingJob) {
      Object.keys(editingJob).forEach((key) => {
        if (key !== '_id' && key !== 'createdAt') {
          setValue(key as keyof JobFormData, editingJob[key as keyof Job])
        }
      })
    }
  }, [editingJob, setValue])

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      alert('Failed to fetch jobs');
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/applications`); // corrected Route
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      alert('Failed to fetch applications');
    }
  };

  const onSubmitJob = async (data: JobFormData) => {
    try {
      if (editingJob) {
        const response = await axios.put(`${API_BASE_URL}/admin/jobs/${editingJob._id}`, data);
        console.log('Job update response:', response.data);
        alert('Job post updated successfully');
      } else {
        const response = await axios.post(`${API_BASE_URL}/admin/jobs`, data);
        console.log('Job creation response:', response.data);
        alert('Job post created successfully');
      }
      reset();
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating/updating job:', error.response?.data || error.message);
        alert(`Failed to ${editingJob ? 'update' : 'create'} job post: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert(`An unexpected error occurred: ${error}`);
      }
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job)
  }

  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/jobs/${id}`);
      alert('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'jobs' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('jobs')}
        >
          Manage Jobs
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'applications' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('applications')}
        >
          Manage Applications
        </button>
      </div>
      {activeTab === 'jobs' && (
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">{editingJob ? 'Edit Job' : 'Create New Job'}</h2>
            <form onSubmit={handleSubmit(onSubmitJob)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input {...register("company")} placeholder="Company Name" className="w-full p-2 border rounded" />
                  {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                </div>
                <div>
                  <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register("jobTitle")} placeholder="Job Title" className="w-full p-2 border rounded" />
                  {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
                </div>
                <div>
                  <select {...register("jobType")} className="w-full p-2 border rounded">
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
                </div>
                <div>
                  <input {...register("location")} placeholder="Location" className="w-full p-2 border rounded" />
                  {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>
                <div>
                  <input {...register("experience")} type="number" placeholder="Experience (in years)" className="w-full p-2 border rounded" />
                  {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                </div>
                <div>
                  <input {...register("salary")} placeholder="Salary (e.g. $50,000 - $70,000)" className="w-full p-2 border rounded" />
                  {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                </div>
                <div>
                  <input {...register("applicationDeadline")} type="date" className="w-full p-2 border rounded" />
                  {errors.applicationDeadline && <p className="text-red-500 text-sm">{errors.applicationDeadline.message}</p>}
                </div>
              </div>
              <div>
                <textarea {...register("description")} placeholder="Job Description" rows={4} className="w-full p-2 border rounded" />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
              <div>
                <textarea {...register("requirements")} placeholder="Job Requirements" rows={4} className="w-full p-2 border rounded" />
                {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
              </div>
              <div>
                <textarea {...register("benefits")} placeholder="Benefits" rows={4} className="w-full p-2 border rounded" />
                {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits.message}</p>}
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {editingJob ? 'Update Job Post' : 'Create Job Post'}
              </button>
              {editingJob && (
                <button type="button" onClick={() => { setEditingJob(null); reset(); }} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Existing Jobs</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Job Title</th>
                  <th className="text-left">Company</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Posted On</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.jobTitle}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEditJob(job)} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2">Edit</button>
                      <button onClick={() => handleDeleteJob(job._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'applications' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Applied On</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.applicantName}</td>
                  <td>{application.applicantEmail}</td>
                  <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => { setSelectedApplication(application); setIsDialogOpen(true); }} className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isDialogOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
            <p><strong>Email:</strong> {selectedApplication.applicantEmail}</p>
            <p><strong>Cover Letter:</strong> {selectedApplication.coverLetter}</p>
            <button onClick={() => setIsDialogOpen(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}