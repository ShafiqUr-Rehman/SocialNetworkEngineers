"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    location: '',
    experience: '',
    skills: '',
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        setStatusMessage('Invalid file type. Please upload a PDF or an image (.png, .jpg).');
        setCvFile(null);
        return;
      }
      setCvFile(file);
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData]);
    }
    if (cvFile) {
      formDataToSend.append('cv', cvFile);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/register/enroll', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatusMessage(response.data.message);
      setFormData({
        name: '',
        title: '',
        company: '',
        location: '',
        experience: '',
        skills: '',
      });
      setCvFile(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      setStatusMessage('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block mb-1">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="experience" className="block mb-1">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="skills" className="block mb-1">Skills (comma-separated)</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., React, JavaScript, CSS, GraphQL"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="cv" className="block mb-1">Upload CV (PDF, PNG, JPG)</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.png,.jpg"
            onChange={handleCvChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Application
        </button>
      </form>

      {statusMessage && <p className="mt-4 text-center font-semibold">{statusMessage}</p>}
    </div>
  );
}