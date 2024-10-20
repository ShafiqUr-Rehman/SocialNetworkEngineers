'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { ChevronDown, ChevronUp, Code, Users, Briefcase, Zap, Award, TrendingUp, Globe, BookOpen, Lightbulb } from 'lucide-react'
import CountUp from 'react-countup'
import Script from 'next/script'

export default function EnhancedHomePage() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const heroImages = [
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80'
  ]

  const testimonials = [
    { name: "John Doe", role: "Software Engineer", company: "Tech Corp", image: "https://randomuser.me/api/portraits/men/1.jpg", quote: "TechBridge helped me connect with amazing opportunities!" },
    { name: "Jane Smith", role: "UX Designer", company: "Design Co", image: "https://randomuser.me/api/portraits/women/2.jpg", quote: "The network I built through TechBridge was invaluable." },
    { name: "Mike Johnson", role: "Project Manager", company: "Innovate Inc", image: "https://randomuser.me/api/portraits/men/3.jpg", quote: "TechBridge&apos;s resources accelerated my career growth." }
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  ]

  const faqs = [
    { question: "What is TechBridge?", answer: "TechBridge is a free social network for engineers and tech professionals, providing opportunities for networking, skill development, and career growth." },
    { question: "How can I join TechBridge?", answer: "You can join TechBridge by clicking the &apos;Join TechBridge Today&apos; button and following the simple registration process." },
    { question: "What benefits does TechBridge offer?", answer: "TechBridge offers networking opportunities, job postings, skill development resources, mentorship programs, and a community of like-minded professionals." },
    { question: "Is TechBridge free to use?", answer: "Yes, TechBridge is completely free to use. We do not charge any fees for our basic or advanced features." },
    { question: "How can I find job opportunities on TechBridge?", answer: "You can browse job listings in our &apos;Jobs&apos; section, set up job alerts, and network with professionals in your field to discover opportunities." },
    { question: "Can I showcase my projects on TechBridge?", answer: "TechBridge provides a platform for you to showcase your projects, get feedback, and collaborate with others." },
    { question: "Can I create or join tech communities on TechBridge?", answer: "You can create or join various tech communities based on your interests, technologies, or career goals." },
    { question: "How can I contribute to TechBridge?", answer: "You can contribute by sharing your knowledge through blog posts, participating in discussions, mentoring others, or even helping to organize virtual events." }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="chatbot-config" strategy="afterInteractive">
        {`
          window.embeddedChatbotConfig = {
            chatbotId: "omIHp1KtyoDHv6H37OK6d",
            domain: "www.chatbase.co"
          }
        `}
      </Script>

      <Script
        src="https://www.chatbase.co/embed.min.js"
        strategy="lazyOnload"
      />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20"
      >
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="relative h-[calc(100vh-80px)]">
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">Connect. Innovate. Succeed.</h1>
                  <p className="text-xl mb-8">Join the premier social network for tech professionals</p>
                  <Link
                    href="/enrole"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Join TechBridge Today
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="py-20"
        id="about"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl font-bold mb-6">About TechBridge</h2>
              <p className="text-lg text-gray-600 mb-8">
                TechBridge is more than just a social network - it&apos;s a launchpad for your tech career. We connect innovative minds, foster collaboration, and provide free resources you need to excel in the tech industry.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="About TechBridge"
                width={600}
                height={400}
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="bg-blue-600 py-20"
        id="features"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose TechBridge?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-12 h-12 mb-4" />, title: "Skill Development", description: "Access cutting-edge courses and workshops to stay ahead in your field." },
              { icon: <Users className="w-12 h-12 mb-4" />, title: "Networking", description: "Connect with industry leaders and like-minded professionals." },
              { icon: <Briefcase className="w-12 h-12 mb-4" />, title: "Job Opportunities", description: "Discover exclusive job postings from top tech companies." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-blue-600">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="py-20"
        id="testimonials"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-xl"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-2">{testimonial.name}</h3>
                <p className="text-gray-600 text-center mb-4">{testimonial.role} at {testimonial.company}</p>
                <p className="text-gray-800 italic text-center">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="bg-gray-100 py-20"
        id="gallery"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">TechBridge in Action</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative h-64"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="py-20"
        id="stats"
      >
        <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">TechBridge by the Numbers</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: <Users className="w-12 h-12 mb-4 text-blue-600" />, value: 100000, label: "Active Members" },
            { icon: <Briefcase className="w-12 h-12 mb-4 text-blue-600" />, value: 50000, label: "Jobs Posted" },
            { icon: <Zap className="w-12 h-12 mb-4 text-blue-600" />, value: 1000, label: "Happy Users" },
            { icon: <Award className="w-12 h-12 mb-4 text-blue-600" />, value: 500, label: "Partner Companies" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2">
                <CountUp end={stat.value} duration={20} separator="," />
                {stat.value >= 1000 && "+"}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="bg-blue-600 py-20"
        id="career-growth"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Accelerate Your Career Growth</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold  mb-4">Personalized Learning Paths</h3>
              <p className="text-gray-600 mb-4">Our AI-powered system creates customized learning journeys based on your skills, goals, and industry trends.</p>
              
              <ul className="list-disc list-inside text-gray-600">
                <li>Tailored course recommendations</li>
                <li>Progress tracking and analytics</li>
                <li>Adaptive learning algorithms</li>
              </ul>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Mentorship Programs</h3>
              <p className="text-gray-600 mb-4">Connect with industry veterans and receive guidance to navigate your career successfully.</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>One-on-one mentoring sessions</li>
                <li>Group mentorship workshops</li>
                <li>Peer-to-peer learning opportunities</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="py-20"
        id="trending-tech"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Stay Ahead with Trending Technologies</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp className="w-12 h-12 mb-4 text-blue-600" />, title: "AI & Machine Learning", description: "Dive into the world of artificial intelligence and machine learning with our cutting-edge courses and projects." },
              { icon: <Code className="w-12 h-12 mb-4 text-blue-600" />, title: "Blockchain & Crypto", description: "Explore the revolutionary world of blockchain technology and cryptocurrency development." },
              { icon: <Zap className="w-12 h-12 mb-4 text-blue-600" />, title: "IoT & Edge Computing", description: "Learn how to build and manage Internet of Things (IoT) devices and implement edge computing solutions." },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-center">{tech.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="bg-gray-100 py-20"
        id="global-community"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Join Our Global Tech Community</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Connect Across Borders</h3>
              <p className="text-gray-600 mb-4">
                TechBridge brings together tech enthusiasts, professionals, and innovators from around the world. Expand your network globally and gain diverse perspectives on the latest tech trends and challenges.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Participate in international tech events</li>
                <li>Collaborate on cross-border projects</li>
                <li>Share knowledge with a global audience</li>
              </ul>
              <Link href="/search" className="bg-blue-600 text-white px-6 py-2 rounded-full inline-block hover:bg-blue-700 transition-colors">
                Explore Our Community
              </Link>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Global Tech Community"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="py-20"
        id="learning-resources"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Expand Your Knowledge</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Continuous Learning</h3>
              <p className="text-gray-600 mb-4">
                At TechBridge, we believe in the power of continuous learning. Our platform offers a wide range of resources to help you stay ahead in the fast-paced tech industry.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Access to cutting-edge online courses</li>
                <li>Live webinars with industry experts</li>
                <li>Hands-on workshops and coding challenges</li>
                <li>Comprehensive tech documentation and tutorials</li>
              </ul>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                alt="Expand Your Knowledge"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="bg-gray-100 py-20"
        id="faq"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-md"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {activeAccordion === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {activeAccordion === index && (
                  <div className="p-4 bg-white rounded-b-lg shadow-md mt-1">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechBridge</h3>
              <p className="mb-4">Connecting innovative minds in the world of technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>






              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/jobs" className="hover:text-blue-400 transition-colors">Jobs</Link></li>
                <li><Link href="/search" className="hover:text-blue-400 transition-colors">Search</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-2">Emporium Mall basement, Johar Town, Lahore</p>
              <p className="mb-2">Phone: (+92) 3264139439</p>
              <p>Email: shafiqurrehmanbscs2022@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} TechBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}