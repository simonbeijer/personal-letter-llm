"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import FeatureShowcase from "@/app/components/featureShowcase";
import QuickStartGuide from "@/app/components/quickStartGuide";
import TermsModal from "@/app/components/termsModal";
import SparklingStars from "@/app/components/sparklingStars";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        showClose={true}
      />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Cover Letter Generator</h1>
          <p className="text-lg text-gray-600 mb-8">
            Create personalized cover letters using your CV and job advertisements
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleGetStarted}
              className="relative px-12 py-4 text-xl font-bold text-gray-800 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 rounded-lg shadow-md transform hover:scale-105 transition-all duration-500 border-2 border-transparent"
              style={{
                background: 'linear-gradient(to right, #f1f5f9, #e2e8f0) padding-box, linear-gradient(45deg, #c0c0c0, #e5e5e5, #c0c0c0, #f8fafc) border-box',
                border: '2px solid transparent'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <SparklingStars />
                Get Started
              </div>
            </button>
          </div>
        </div>

        {/* AI Assistant and Feature Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="h-[280px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Assistant
              </CardTitle>
              <CardDescription><span className="text-success">●</span> Ready to help</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="bg-gray-50 p-4 rounded-lg mb-4 flex-1">
                <p className="text-sm text-gray-600">
                  👋 Hello! I&apos;m ready to help you create the perfect cover letter. Upload your CV and job description to get started!
                </p>
              </div>
              <CustomButton
                text={
                  <div className="flex items-center justify-center gap-2">
                    <RocketLaunchIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    Get Started - Generate Letter
                  </div>
                }
                callBack={handleGetStarted}
                variant="outline"
                size="md"
                className="w-full bg-gray-100 dark:bg-gray-700 !border-gray-300 dark:!border-gray-600 !text-gray-800 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-600 hover:!text-gray-800 dark:hover:!text-gray-200"
              />
            </CardContent>
          </Card>

          {/* Feature Cards in Column Layout */}
          <div className="h-[280px] flex flex-col justify-between">
            <Card className="flex-1 mb-3">
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0">
                    <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Smart Generation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">AI analyzes your CV and job requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 mb-3">
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0">
                    <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Perfect Match</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Intelligent skill and experience matching</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="p-6 h-full flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0">
                    <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Lightning Fast</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Professional letters in seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Start Guide */}
        <QuickStartGuide />

        {/* Footer Terms */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-800 dark:text-gray-900">
            By using our service, you agree to our{' '}
            <a href="/privacy-policy" className="underline text-gray-800 dark:text-gray-900 hover:text-gray-600">
              Privacy policy
            </a>{' '}
            and{' '}
            <a href="/terms-of-service" className="underline text-gray-800 dark:text-gray-900 hover:text-gray-600">
              Terms of service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
