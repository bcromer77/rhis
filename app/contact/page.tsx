// app/contact/page.tsx
"use client";

import { useState } from "react";

const contactOptions = [
  {
    title: "Sales & Demos",
    subtitle: "Ready to see PRISM in action?",
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    description: "Book a personalized demo and see how PRISM can transform your risk intelligence.",
    contact: "sales@prism-intelligence.com",
    response: "Response within 2 hours"
  },
  {
    title: "Technical Support",
    subtitle: "Need help with your PRISM account?",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50", 
    iconColor: "text-blue-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    description: "Get help with API integration, data access, or platform troubleshooting.",
    contact: "support@prism-intelligence.com",
    response: "Response within 4 hours"
  },
  {
    title: "Partnerships",
    subtitle: "Interested in partnering with PRISM?",
    borderColor: "border-l-orange-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600", 
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    description: "Explore data partnerships, integrations, or white-label opportunities.",
    contact: "partnerships@prism-intelligence.com", 
    response: "Response within 1 business day"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    inquiry: "sales",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you within 2 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in touch with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              our team
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Ready to transform your risk intelligence? Our team is here to help you get started 
            with PRISM's regulatory monitoring and crisis prediction platform.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Options */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How can we help?</h2>
            <div className="space-y-6">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className={`border-l-4 ${option.borderColor} bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 p-6`}
                >
                  <div className="flex items-start">
                    <div className={`h-12 w-12 rounded ${option.bgColor} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <div className={option.iconColor}>
                        {option.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {option.subtitle}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {option.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <a
                          href={`mailto:${option.contact}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          {option.contact}
                        </a>
                        <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                          {option.response}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Info */}
            <div className="mt-12 border-l-4 border-l-gray-500 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded bg-gray-50 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    PRISM Intelligence HQ
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>123 Financial District</p>
                    <p>New York, NY 10004</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="border-l-4 border-l-blue-500 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="Acme Capital"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="Risk Manager"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiry"
                    id="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="sales">Sales & Demo</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="Tell us about your regulatory intelligence needs..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  By submitting this form, you agree to our privacy policy and terms of service. 
                  We'll only use your information to respond to your inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
