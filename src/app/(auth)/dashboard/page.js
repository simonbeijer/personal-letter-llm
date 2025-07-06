"use client";
import { useState } from "react";
import CustomButton from "@/app/components/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  
  const navigateToGenerate = () => {
    router.push('/generate');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Personal Letter LLM
          </h1>
          <p className="text-lg text-grey mb-8">
            Generate personalized cover letters using AI by combining your CV with job advertisements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              📝 Smart Letter Generation
            </h3>
            <p className="text-grey mb-4">
              AI-powered analysis of your CV and job requirements to create tailored cover letters
            </p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              🎯 Targeted Matching
            </h3>
            <p className="text-grey mb-4">
              Intelligent matching of your skills and experience to job requirements
            </p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              🚀 Quick & Professional
            </h3>
            <p className="text-grey mb-4">
              Generate professional cover letters in seconds with consistent quality
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <CustomButton
            text="Generate Your First Letter"
            callBack={navigateToGenerate}
            variant="primary"
            size="lg"
          />
        </div>
        
        <div className="mt-12 bg-surface rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold text-foreground mb-2">Upload CV</h3>
              <p className="text-grey">Provide your CV details and experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold text-foreground mb-2">Add Job Info</h3>
              <p className="text-grey">Paste the job advertisement or requirements</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold text-foreground mb-2">Get Letter</h3>
              <p className="text-grey">AI generates a personalized cover letter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
