"use client";
import { useState } from "react";
import Modal from "@/app/components/modal";
import CustomButton from "@/app/components/button";
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

export default function TermsModal({ isOpen, onClose, showClose = true }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleAcceptTerms = () => {
    if (termsAccepted && gdprAccepted) {
      localStorage.setItem('personal-letter-llm-terms-accepted', new Date().toISOString());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={showClose}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Terms and Disclaimer Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Terms of Use & Privacy Notice</h2>
          
          <div className="mb-4 bg-orange-50 dark:bg-orange-900/5 border border-orange-200 dark:border-orange-800/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
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

          <div className="mb-6 bg-blue-50 dark:bg-blue-900/5 border border-blue-200 dark:border-blue-800/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
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
              className="mt-1 w-4 h-4 text-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:ring-2"
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
              className="mt-1 w-4 h-4 text-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:ring-2"
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
  );
}