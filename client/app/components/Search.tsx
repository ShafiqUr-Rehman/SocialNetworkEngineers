"use client";

import { useState, useEffect } from 'react'
import { Search as SearchIcon, MapPin, Briefcase, Award, X, FileText } from 'lucide-react'
import axios from 'axios'
import { Button } from "@/components/ui/button"

type Engineer = {
  _id: string
  name: string
  title: string
  company: string
  location: string
  skills: string[]
  experience: string
  avatar: string
  cvUrl: string
}

const API_BASE_URL = 'https://social-network-engineers-api.vercel.app/api';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [selectedCV, setSelectedCV] = useState<string | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/register/fetch`)
        setEngineers(response.data)
      } catch (error) {
        console.error('Error fetching engineers:', error)
      }
    }

    fetchEngineers()
  }, [])

  const allSkills = Array.from(new Set(engineers.flatMap(engineer => engineer.skills)))
  const allLocations = Array.from(new Set(engineers.map(engineer => engineer.location)))

  const filteredEngineers = engineers.filter(engineer =>
    (engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    engineer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    engineer.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (skillFilter === '' || engineer.skills.includes(skillFilter)) &&
    (locationFilter === '' || engineer.location === locationFilter)
  )

  const handleViewCV = (cvUrl: string) => {
    setSelectedCV(`${API_BASE_URL}${cvUrl}`)
    setCvError(null)
  }

  const handleCVLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    const iframe = event.target as HTMLIFrameElement
    if (iframe.contentDocument?.body.innerHTML.includes("404")) {
      setCvError("CV not found. The file may have been moved or deleted.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h1 className="text-2xl font-bold mb-4">Find Engineers</h1>
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search engineers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="">All Skills</option>
              {allSkills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {allLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredEngineers.map((engineer) => (
          <div key={engineer._id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center">
                <svg className="h-16 w-16 rounded-full mr-4" viewBox="0 0 64 64" fill="currentColor">
                  <rect width="64" height="64" fill="#e2e8f0" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24">
                    {engineer.name.charAt(0)}
                  </text>
                </svg>
                <div>
                  <h2 className="text-xl font-semibold">{engineer.name}</h2>
                  <p className="text-gray-600">{engineer.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="flex items-center text-gray-600 mb-2">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {engineer.company}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  {engineer.location}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <Award className="h-5 w-5 mr-2" />
                  {engineer.experience} of experience
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {engineer.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <Button 
                className="w-full"
                onClick={() => handleViewCV(engineer.cvUrl)}
              >
                View CV
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedCV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">CV Viewer</h2>
              <button onClick={() => setSelectedCV(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 flex-grow overflow-auto">
              {cvError ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">CV Not Available</p>
                  <p className="text-gray-500">{cvError}</p>
                </div>
              ) : (
                <iframe
                  src={selectedCV}
                  className="w-full h-full border-0"
                  title="CV Viewer"
                  onLoad={handleCVLoad}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}