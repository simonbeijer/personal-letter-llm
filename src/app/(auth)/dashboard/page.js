"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/userContext";
import CustomButton from "@/app/components/button";
import UserStats from "@/app/components/userStats";
import SessionInfo from "@/app/components/sessionInfo";
import TermsModal from "@/app/components/termsModal";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUserContext();
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    // Check if user has already accepted terms
    const hasAcceptedTerms = localStorage.getItem('personal-letter-llm-terms-accepted');
    if (!hasAcceptedTerms) {
      setShowTermsModal(true);
    }
  }, []);

  const navigateToGenerate = () => {
    router.push("/generate");
  };

  const handleLogout = () => {
    localStorage.removeItem('personal-letter-llm-terms-accepted');
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        showClose={false}
      />

      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">
            Your personal dashboard for AI cover letter generation
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Cover Letter</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Create a personalized cover letter using your CV and job requirements.
            </p>
            <CustomButton
              text={
                <div className="flex items-center justify-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-500" />
                  Generate Cover Letter
                </div>
              }
              callBack={navigateToGenerate}
              variant="primary"
              size="lg"
              className="w-full"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Manage your account preferences and view terms of service.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setShowTermsModal(true)}
                className="w-full text-left text-sm text-primary hover:text-primary/80 underline font-medium transition-colors duration-200"
              >
                View Terms & Privacy Policy
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <UserStats user={user} />

        {/* Session Info */}
        <SessionInfo />
      </div>
    </div>
  );
}