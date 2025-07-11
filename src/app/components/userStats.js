"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { 
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

export default function UserStats({ user }) {
  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysSinceCreation = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-blue-500" />
            Account Information
          </CardTitle>
          <CardDescription>Your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Name:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Email:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Role:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{user.role}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-green-500" />
            Account Activity
          </CardTitle>
          <CardDescription>Your account statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Joined:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {formatDate(user.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Days Active:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {getDaysSinceCreation(user.createdAt)} days
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-success">●</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Status:</span>
            <span className="text-sm font-medium text-success">Active</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}