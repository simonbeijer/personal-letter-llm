"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/tabs";
import CustomButton from "@/app/components/button";
import RadioGroup from "@/app/components/radioGroup";
import { 
  DocumentArrowUpIcon, 
  DocumentTextIcon, 
  SparklesIcon, 
  ClipboardDocumentIcon, 
  ArrowDownTrayIcon 
} from "@heroicons/react/24/outline";

export default function Generate() {
  const [cvText, setCvText] = useState("");
  const [jobAd, setJobAd] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("english");

  const cvCharCount = cvText.length;
  const jobAdCharCount = jobAd.length;
  const minCharLength = 50;

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCvText(e.target?.result);
      };
      reader.readAsText(file);
    }
  };

  const generateCoverLetter = async () => {
    if (!cvText.trim() || !jobAd.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv: cvText.trim(),
          jobAd: jobAd.trim(),
          language: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate cover letter');
      }

      setCoverLetter(data.coverLetter);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (coverLetter) {
      try {
        await navigator.clipboard.writeText(coverLetter);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Cover Letter Generator</h1>
          <p className="text-lg text-gray-600">
            Create personalized cover letters using your CV and job advertisements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DocumentTextIcon className="h-5 w-5" />
                  Your CV/Resume
                </CardTitle>
                <CardDescription>Upload your CV file or paste your resume content</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="paste">Paste Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <DocumentArrowUpIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <span className="text-sm text-gray-600">Click to upload your CV (TXT format)</span>
                        <input
                          id="cv-upload"
                          type="file"
                          accept=".txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {cvFile && <p className="text-sm text-green-600 mt-2">Uploaded: {cvFile.name}</p>}
                    </div>
                  </TabsContent>
                  <TabsContent value="paste">
                    <div className="space-y-2">
                      <textarea
                        placeholder="Paste your CV/resume content here..."
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        className="w-full min-h-[200px] px-3 py-2.5 bg-surface text-foreground border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                      />
                      <div className="flex justify-between text-xs">
                        <span className={`${cvCharCount < minCharLength ? 'text-red-500' : 'text-green-600'}`}>
                          {cvCharCount} characters {cvCharCount < minCharLength && `(minimum ${minCharLength} required)`}
                        </span>
                        <span className="text-gray-400">Recommended: 200-1000 characters</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Advertisement</CardTitle>
                <CardDescription>Paste the job posting you&apos;re applying for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <textarea
                    placeholder="Paste the job advertisement here..."
                    value={jobAd}
                    onChange={(e) => setJobAd(e.target.value)}
                    className="w-full min-h-[200px] px-3 py-2.5 bg-surface text-foreground border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  />
                  <div className="flex justify-between text-xs">
                    <span className={`${jobAdCharCount < minCharLength ? 'text-red-500' : 'text-green-600'}`}>
                      {jobAdCharCount} characters {jobAdCharCount < minCharLength && `(minimum ${minCharLength} required)`}
                    </span>
                    <span className="text-gray-400">Recommended: 100-800 characters</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="py-4">
                <RadioGroup
                  name="language"
                  label="Output Language"
                  selected={language}
                  onChange={setLanguage}
                  options={[
                    { value: 'english', label: '🇬🇧 English' },
                    { value: 'swedish', label: '🇸🇪 Swedish' }
                  ]}
                />
              </CardContent>
            </Card>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Generation Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    <p className="text-xs text-red-600 mt-2">
                      Please try again. If the problem persists, check your internet connection or try with different content.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <CustomButton
              text={
                <div className="flex items-center justify-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-500" />
                  {isGenerating ? "Generating..." : "Generate Cover Letter"}
                </div>
              }
              callBack={generateCoverLetter}
              disabled={cvCharCount < minCharLength || jobAdCharCount < minCharLength || isGenerating}
              variant="primary"
              size="lg"
              className="w-full !text-gray-900"
            />
          </div>

          {/* Output Section */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>Your personalized cover letter will appear here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isGenerating ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center min-h-[400px] flex items-center justify-center">
                    <div>
                      <div className="relative mb-6">
                        <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
                        <div className="absolute inset-0 h-12 w-12 mx-auto border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-700 font-medium">Generating your personalized cover letter...</p>
                        <p className="text-sm text-gray-500 mt-3">This may take 10-30 seconds</p>
                      </div>
                    </div>
                  </div>
                ) : coverLetter ? (
                  <div className="bg-white border rounded-lg p-6 min-h-[400px]">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 leading-relaxed">
                      {coverLetter}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center min-h-[400px] flex items-center justify-center">
                    <div>
                      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated cover letter will appear here</p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <CustomButton
                    text={
                      <div className="flex items-center gap-2">
                        <ClipboardDocumentIcon className="h-4 w-4" />
                        Copy
                      </div>
                    }
                    callBack={copyToClipboard}
                    disabled={!coverLetter}
                    variant="outline"
                    size="sm"
                  />
                  <CustomButton
                    text={
                      <div className="flex items-center gap-2">
                        <SparklesIcon className="h-4 w-4" />
                        Generate New
                      </div>
                    }
                    callBack={generateCoverLetter}
                    disabled={cvCharCount < minCharLength || jobAdCharCount < minCharLength || isGenerating || !coverLetter}
                    variant="outline"
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}