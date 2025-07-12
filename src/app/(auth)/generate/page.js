"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/tabs";
import CustomButton from "@/app/components/button";
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
                    <textarea
                      placeholder="Paste your CV/resume content here..."
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      className="w-full min-h-[200px] px-3 py-2.5 bg-surface text-foreground border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                    />
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
                <textarea
                  placeholder="Paste the job advertisement here..."
                  value={jobAd}
                  onChange={(e) => setJobAd(e.target.value)}
                  className="w-full min-h-[200px] px-3 py-2.5 bg-surface text-foreground border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                />
              </CardContent>
            </Card>

            <CustomButton
              text={
                <div className="flex items-center justify-center gap-2">
                  <SparklesIcon className="h-4 w-4" />
                  Generate Cover Letter
                </div>
              }
              callBack={() => {}}
              disabled={!cvText.trim() || !jobAd.trim()}
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
                <div className="bg-gray-50 p-8 rounded-lg text-center min-h-[400px] flex items-center justify-center">
                  <div>
                    <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your generated cover letter will appear here</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <CustomButton
                    text={
                      <div className="flex items-center gap-2">
                        <ClipboardDocumentIcon className="h-4 w-4" />
                        Copy
                      </div>
                    }
                    callBack={() => {}}
                    variant="outline"
                    size="sm"
                  />
                  <CustomButton
                    text={
                      <div className="flex items-center gap-2">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Download
                      </div>
                    }
                    callBack={() => {}}
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