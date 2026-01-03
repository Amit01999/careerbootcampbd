import React from 'react';
import { Link } from 'react-router-dom';
import heroimg from '../../assets/home-banner.svg';

export default function HeroSection() {
  const bankLogos = [
    'DBBL',
    'Brac Bank',
    'City Bank',
    'Eastern Bank',
    'IFIC Bank',
    'Pubali Bank',
    'Prime Bank',
    'Jamuna Bank',
    'NCC Bank',
    'One Bank',
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e3f5ff] via-[#f0f9ff] to-white space-y-3">
      {/* Main Hero Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 lg:py-16 ">
          {/* Left Content */}
          <div className="space-y-7 ">
            {/* Headline */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                One Destination for
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                <span className="text-gray-900">Complete Exam Preparation</span>
              </h2>
            </div>

            {/* Learning Journey Steps */}
            <div className="flex items-center gap-3 text-[15px] sm:text-lg font-medium text-gray-800">
              <span>Learn</span>
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>

              <span>Practice</span>
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>

              <span>Improve</span>
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>

              <span>Succeed</span>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              From job circulars to final viva — master every stage of your bank
              job preparation on one streamlined platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Primary CTA */}
              <Link to="/auth">
                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 tracking-wide">
                  Get Started For Free
                </button>
              </Link>

              {/* App Download Buttons */}
              <div className="flex gap-3">
                {/* Google Play */}
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase opacity-70 tracking-wide">
                      Get it on
                    </div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>

                {/* App Store */}
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase opacity-70 tracking-wide">
                      Download on
                    </div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <img
                src={heroimg}
                alt="Students studying and preparing for exams"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Overlapping Cards */}
      <div className="relative -mt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Registered Students
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    7.8+ <span className="text-sm font-bold">Crore</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Student Selections
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    4+ <span className="text-sm font-bold">Lacs</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Tests Attempted
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    242+ <span className="text-sm font-bold">Crore</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Classes Attended
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    5.5+ <span className="text-sm font-bold">Crore</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
