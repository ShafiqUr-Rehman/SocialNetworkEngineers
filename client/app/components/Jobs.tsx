'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, DollarSign, Briefcase, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Job = {
  id: string
  jobTitle: string
  company: string
  location: string
  salary: string
  jobType: string
  createdAt: string
  description: string
  requirements: string
  benefits: string
}

const API_BASE_URL = 'https://social-network-engineers-api.vercel.app/api/admin'

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`)
      setJobs(response.data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    }
  }

  const filteredJobs = jobs.filter(job =>
    (job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (locationFilter === '' || job.location.includes(locationFilter))
  )

  const locations = Array.from(new Set(jobs.map(job => job.location)))

  const handleApply = (jobId: string) => {
    router.push(`http://localhost:3000/apply?jobId=${jobId}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h1 className="text-2xl font-bold mb-4">Find Your Next Engineering Opportunity</h1>
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                  <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{job.salary}</span>
                  <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{job.jobType}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                {expandedJob === job.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {expandedJob === job.id && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <p className="text-gray-700 mb-4">{job.requirements}</p>
              <h3 className="font-semibold mb-2">Benefits</h3>
              <p className="text-gray-700 mb-4">{job.benefits}</p>
              <button 
                onClick={() => handleApply(job.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}