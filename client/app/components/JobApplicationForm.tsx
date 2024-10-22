'use client'

import React, { useState } from 'react'
import axios from 'axios'

const JobApplicationForm: React.FC = () => {
  const [applicantName, setApplicantName] = useState<string>('')
  const [applicantEmail, setApplicantEmail] = useState<string>('')
  const [coverLetter, setCoverLetter] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!applicantName || !applicantEmail || !coverLetter) {
      setError('All fields are required.')
      return
    }

    try {
      const response = await axios.post('https://social-network-engineers-api.vercel.app/api/apply', {
        applicantName,
        applicantEmail,
        coverLetter,
      })

      if (response.status === 200) {
        setSuccess('Application submitted successfully!')
        // Reset form
        setApplicantName('')
        setApplicantEmail('')
        setCoverLetter('')
      }
    } catch (err) {
      setError('Error submitting application. Please try again.')
      console.error('Application submission error:', err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter:</label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}

export default JobApplicationForm