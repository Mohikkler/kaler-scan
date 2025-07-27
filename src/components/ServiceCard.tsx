import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  featured?: boolean;
  image?: string;
}

const ServiceCard = ({ title, description, icon: Icon, href, featured = false, image }: ServiceCardProps) => {
  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-medical-blue/10 ${
      featured ? "ring-2 ring-medical-blue ring-opacity-20 bg-gradient-to-br from-medical-blue-light to-white" : ""
    }`}>
      {image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            featured 
              ? "bg-medical-blue text-white" 
              : "bg-medical-blue-light text-medical-blue"
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className={`text-lg ${featured ? "text-medical-blue" : ""}`}>
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </CardDescription>
        {href && (
          <Button variant={featured ? "medical" : "medical-outline"} size="sm" asChild>
            <Link to={href} className="group/btn">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;