import JobApplicationForm from "../components/JobApplicationForm";


export default function ApplyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Apply for Job</h1>
      <JobApplicationForm/>
    </div>
  )
}