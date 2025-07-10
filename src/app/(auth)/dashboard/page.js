"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/app/components/button";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  BoltIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CloudArrowUpIcon,
  PlusIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const router = useRouter();

  const navigateToGenerate = () => {
    router.push("/generate");
  };

  const [displayModal, setDisplayModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already accepted terms
    const hasAcceptedTerms = localStorage.getItem('personal-letter-llm-terms-accepted');
    if (!hasAcceptedTerms) {
      setDisplayModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  const handleAcceptTerms = () => {
    if (termsAccepted && gdprAccepted) {
      localStorage.setItem('personal-letter-llm-terms-accepted', new Date().toISOString());
      setDisplayModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Modal isOpen={displayModal} onClose={handleCloseModal} showClose={false}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Terms and Disclaimer Section */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Terms of Use & Privacy Notice</h2>
            
            <div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div className="text-sm text-left pt-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Important Disclaimer</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      This application uses AI technology to generate cover letters. Use at your own risk. 
                      We bear no responsibility for the content generated, job application outcomes, or any consequences 
                      arising from the use of this service. Always review and customize generated content before use.
                    </p>
                  </div>
                </div>
            </div>

            <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div className="text-sm text-left pt-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Technology Notice</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      This service is powered by Google&apos;s Gemini AI. Your uploaded documents and generated content 
                      may be processed by Google&apos;s systems according to their privacy policies. 
                      Please avoid uploading sensitive personal information.
                    </p>
                  </div>
                </div>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-4 mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                I agree to the Terms of Service and acknowledge that this is an experimental AI tool. 
                I understand the limitations and disclaimers stated above.
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                I consent to the processing of my data as described above and understand that my documents 
                will be processed by AI systems for the purpose of generating cover letters.
              </span>
            </label>
          </div>


          {/* Accept Button */}
          <div className="text-center">
            <CustomButton
              text={termsAccepted && gdprAccepted ? "Accept & Continue" : "Please accept terms to continue"}
              callBack={handleAcceptTerms}
              disabled={!termsAccepted || !gdprAccepted}
              variant={termsAccepted && gdprAccepted ? "primary" : "secondary"}
              size="lg"
              className={`w-full ${termsAccepted && gdprAccepted ? 'bg-gradient-to-r from-blue-500 to-blue-600 !text-white hover:from-blue-600 hover:to-blue-700' : ''}`}
            />
          </div>
        </div>
      </Modal>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Cover Letter Generator</h1>
          <p className="text-lg text-gray-600">
            Create personalized cover letters using your CV and job advertisements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightBulbIcon className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription><span className="text-success">●</span> Ready to help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  👋 Hello! I&apos;m ready to help you create the perfect cover letter. Upload your CV and job description to get started!
                </p>
              </div>
              <CustomButton
                text={
                  <div className="flex items-center justify-center gap-2">
                    <RocketLaunchIcon className="h-4 w-4" />
                    Start Chat - Generate Letter
                  </div>
                }
                callBack={navigateToGenerate}
                variant="outline"
                size="md"
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learn more</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Get familiar with our service and understand how we protect your data.
              </p>
              <button
                onClick={() => setDisplayModal(true)}
                className="text-primary hover:text-primary/80 underline text-sm font-medium transition-colors duration-200"
              >
                Privacy policy & terms of service
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 pt-8">
              <PencilSquareIcon className="h-8 w-8 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Smart Generation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AI analyzes your CV and job requirements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 pt-8">
              <SparklesIcon className="h-8 w-8 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Perfect Match
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Intelligent skill and experience matching
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 pt-8">
              <BoltIcon className="h-8 w-8 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Professional letters in seconds</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Steps */}
        <Card>
          <CardHeader>
            <div className="text-center">
              <CardTitle className="text-2xl mb-2">Quick Start Guide</CardTitle>
              <CardDescription>Three simple steps to your perfect cover letter</CardDescription>
            </div>
          </CardHeader>
          <CardContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="font-bold text-sm mb-1">Step 1</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload CV</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Share your experience and skills
              </p>
            </div>

            <div className="text-center">
              <PlusIcon className="h-12 w-12 mx-auto mb-4" />
              <div className="font-bold text-sm mb-1">
                Step 2
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Add Job Info
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Paste job requirements</p>
            </div>

            <div className="text-center">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="font-bold text-sm mb-1">Step 3</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Get Letter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Receive personalized content</p>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}