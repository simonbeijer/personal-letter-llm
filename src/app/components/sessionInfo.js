"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { 
  ClockIcon,
  GlobeAltIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

export default function SessionInfo() {
  const [sessionData, setSessionData] = useState({
    loginTime: new Date().toISOString(),
    sessionDuration: 0,
    browserInfo: '',
    platform: ''
  });

  useEffect(() => {
    const startTime = new Date();
    
    // Get browser and platform info
    const browserInfo = navigator.userAgent.split(' ').slice(-1)[0];
    const platform = navigator.platform;
    
    setSessionData(prev => ({
      ...prev,
      loginTime: startTime.toISOString(),
      browserInfo,
      platform
    }));

    // Update session duration every minute
    const interval = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now - startTime) / 60000); // duration in minutes
      setSessionData(prev => ({
        ...prev,
        sessionDuration: duration
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes === 0) return 'Just now';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-purple-500" />
          Session Information
        </CardTitle>
        <CardDescription>Current session details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Login Time:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatTime(sessionData.loginTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Session Duration:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDuration(sessionData.sessionDuration)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Browser:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {sessionData.browserInfo}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CpuChipIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Platform:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {sessionData.platform}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}