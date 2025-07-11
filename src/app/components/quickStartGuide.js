import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import { 
  CloudArrowUpIcon,
  PlusIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function QuickStartGuide() {
  const steps = [
    {
      icon: CloudArrowUpIcon,
      step: "Step 1",
      title: "Upload CV",
      description: "Share your experience and skills"
    },
    {
      icon: PlusIcon,
      step: "Step 2",
      title: "Add Job Info",
      description: "Paste job requirements"
    },
    {
      icon: DocumentTextIcon,
      step: "Step 3",
      title: "Get Letter",
      description: "Receive personalized content"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="text-center">
          <CardTitle className="text-2xl mb-2">Quick Start Guide</CardTitle>
          <CardDescription>Three simple steps to your perfect cover letter</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <step.icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="font-bold text-sm mb-1">{step.step}</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}