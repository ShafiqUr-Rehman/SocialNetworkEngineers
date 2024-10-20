"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { Bell, Briefcase, Home, Search, User, Menu, Mail, X } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-auto sm:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">TechBridge</span>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900 inline-flex items-center">
              <Home className="w-5 h-5 mr-1" />
              Home
            </Link>
            <Link href="/jobs" className="text-base font-medium text-gray-500 hover:text-gray-900 inline-flex items-center">
              <Briefcase className="w-5 h-5 mr-1" />
              Jobs
            </Link>
            <Link href="/search" className="text-base font-medium text-gray-500 hover:text-gray-900 inline-flex items-center">
              <Search className="w-5 h-5 mr-1" />
              Search
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900 inline-flex items-center">
             <Mail className="w-5 h-5 mr-1" />
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-8 w-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-gray-900">TechBridge</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="/" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    <Home className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-900">Home</span>
                  </Link>
                  <Link href="/jobs" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    <Briefcase className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-900">Jobs</span>
                  </Link>
                  <Link href="/search" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    <Search className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-900">Search</span>
                  </Link>
                  <Link href="/contact" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    <Mail className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-900">Contact Us</span>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <SignedOut>
                  <SignInButton  />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}