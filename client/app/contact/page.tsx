"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast, Toaster } from 'react-hot-toast'; // Directly using toast here

const formFields = [
  { id: "company", label: "Company Name", type: "input", placeholder: "Enter your company name" },
  { id: "email", label: "Email", type: "input", inputType: "email", placeholder: "Enter your email" },
  { id: "job-title", label: "Job Title", type: "input", placeholder: "Enter the job title" },
  { id: "job-type", label: "Job Type", type: "select", options: [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ]},
  { id: "location", label: "Location", type: "input", placeholder: "City, state, or remote" },
  { id: "description", label: "Job Description", type: "textarea", placeholder: "Enter the job description", rows: 5 },
  { id: "requirements", label: "Requirements", type: "textarea", placeholder: "Enter job requirements", rows: 3 }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '53de5187-73e5-4778-9ec3-cd61c3a95e1e',
          ...formData
        })
      })

      const result = await response.json()
      if (response.status === 200) {
        toast.success("Your job listing has been submitted successfully!") // Using toast directly
        setFormData({})  // Clear the form
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error("There was a problem submitting your job listing. Please try again.") // Using toast directly
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0496100773917!2d74.26407257469405!3d31.4678214497381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903d4d940f12b%3A0xdb8c83f6699d5226!2sEmporium%20Mall!5e0!3m2!1sen!2s!4v1729215986312!5m2!1sen!2s"
            width="1200"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold">Post a Job</h2>
          <p className="text-muted-foreground">Fill out the form below to post a new job listing</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="access_key" value="53de5187-73e5-4778-9ec3-cd61c3a95e1e" />
            {formFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="text-sm font-medium">{field.label}</label>
                {field.type === "input" && (
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.inputType || "text"}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    value={formData[field.id] || ""}
                    required
                  />
                )}
                {field.type === "select" && (
                  <Select onValueChange={(value) => handleInputChange(field.id, value)} value={formData[field.id] || ""}>
                    <SelectTrigger id={field.id}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    value={formData[field.id] || ""}
                    required
                  />
                )}
              </div>
            ))}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Job Listing"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="w-full pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:shafiqurrehmanbscs2022@gmail.com" className="text-blue-600 hover:underline">
                  shafiqurrehmanbscs2022@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:0326413939" className="text-blue-600 hover:underline">0326413939</a>
              </p>
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Emporium Mall basement, Johar Town, Lahore
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}
