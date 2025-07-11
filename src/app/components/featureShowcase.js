import { Card, CardContent } from "@/app/components/card";
import { 
  PencilSquareIcon,
  SparklesIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

export default function FeatureShowcase() {
  const features = [
    {
      icon: PencilSquareIcon,
      title: "Smart Generation",
      description: "AI analyzes your CV and job requirements"
    },
    {
      icon: SparklesIcon,
      title: "Perfect Match",
      description: "Intelligent skill and experience matching"
    },
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description: "Professional letters in seconds"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardContent className="p-6 pt-8">
            <feature.icon className="h-8 w-8 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}