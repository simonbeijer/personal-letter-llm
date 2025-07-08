"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/app/components/button";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal";

export default function Dashboard() {
  const router = useRouter();

  const navigateToGenerate = () => {
    router.push("/generate");
  };

  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    setDisplayModal(true);
  }, []);

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Modal isOpen={displayModal} onClose={handleCloseModal}>
        <div className="flex flex-row space-x-4 bg-background">
          <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-200/20">
            <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Smart Generation
            </h3>
            <p className="text-sm text-grey">
              AI analyzes your CV and job requirements
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-4 border border-green-200/20">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Perfect Match
            </h3>
            <p className="text-sm text-grey">
              Intelligent skill and experience matching
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-200/20">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Lightning Fast
            </h3>
            <p className="text-sm text-grey">Professional letters in seconds</p>
          </div>
        </div>
      </Modal>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
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
            <h1 className="text-3xl font-bold text-foreground">
              Personal Letter LLM
            </h1>
          </div>
          <p className="text-lg text-grey max-w-xl mx-auto">
            Generate personalized cover letters using AI
          </p>
        </div>

        {/* Main AI Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Chat Window - Main Focus */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl border-2 border-border p-6 h-96 shadow-sm">
              <div className="flex items-center mb-4 pb-3 border-b border-border/20">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-success">● Ready to help</p>
                </div>
              </div>

              <div className="space-y-4 mb-4 h-64 overflow-y-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div className="bg-muted rounded-xl p-3 flex-1">
                    <p className="text-sm text-foreground">
                      👋 Hello! I&apos;m ready to help you create the perfect cover
                      letter. Upload your CV and job description to get started!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Sidebar */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-200/20">
              <div className="pb-2 mt-8">
                <h3 className="font-semibold text-foreground mb-2">
                  Learn more
                </h3>
                <div className="border-t border-border/20 pt-4 pb-4 ">
                  <button
                    onClick={navigateToGenerate}
                    className="px-4 py-2 rounded bg-gradient-to-br from-green-500/10 to-teal-500/10 p-4 border border-green-200/20"
                  >
                    🚀 Start Chat - Generate Letter
                  </button>
                </div>
                <div className="border-t border-border/20 pt-4 pb-4">
                  <button
                    onClick={() => setDisplayModal(true)}
                    className="px-4 py-2 rounded bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 border border-orange-200/20"
                  >
                    Privacy policy & terms of service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Steps */}
        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6 border border-blue-200/30">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Quick Start Guide
            </h2>
            <p className="text-grey">
              Three simple steps to your perfect cover letter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-primary font-bold text-sm mb-1">Step 1</div>
              <h3 className="font-semibold text-foreground mb-2">Upload CV</h3>
              <p className="text-sm text-grey">
                Share your experience and skills
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="text-secondary font-bold text-sm mb-1">
                Step 2
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Add Job Info
              </h3>
              <p className="text-sm text-grey">Paste job requirements</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
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
              <div className="text-accent font-bold text-sm mb-1">Step 3</div>
              <h3 className="font-semibold text-foreground mb-2">Get Letter</h3>
              <p className="text-sm text-grey">Receive personalized content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}