import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Baby, 
  Stethoscope, 
  Eye, 
  Activity, 
  Scan, 
  X, 
  CircuitBoard,
  UserCheck,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import ultrasoundImage from "@/assets/ultrasound-3d.jpg";
import colorDopplerImage from "@/assets/color-doppler.jpg";

const Services = () => {
  const services = [
    {
      title: "3D/4D Ultrasound Scanning",
      description: "Advanced three-dimensional and real-time four-dimensional imaging technology for detailed fetal development monitoring and anatomical assessment.",
      icon: Baby,
      featured: true,
      image: ultrasoundImage,
      href: "/services/3d-4d-ultrasound"
    },
    {
      title: "Color Doppler Testing",
      description: "State-of-the-art blood flow visualization using color-coded imaging to detect vascular abnormalities and circulation issues.",
      icon: Heart,
      featured: true,
      image: colorDopplerImage,
      href: "/services/color-doppler"
    },
    {
      title: "Digital X-Ray",
      description: "High-resolution digital radiography for accurate bone, chest, and organ imaging with reduced radiation exposure.",
      icon: X,
      href: "/services/digital-xray"
    },
    {
      title: "Ultrasound Scanning",
      description: "Comprehensive ultrasound examinations for abdominal, pelvic, and general diagnostic imaging.",
      icon: Scan,
      href: "/services/ultrasound"
    },
    {
      title: "TVS Scan",
      description: "Transvaginal sonography for detailed pelvic examination and gynecological assessment.",
      icon: Eye,
      href: "/services/tvs-scan"
    },
    {
      title: "Sono Salpingography",
      description: "Specialized imaging technique to evaluate fallopian tube patency and reproductive health.",
      icon: Activity,
      href: "/services/sono-salpingography"
    },
    {
      title: "Hystero Salpingography",
      description: "Advanced imaging procedure to assess uterine cavity and fallopian tube structure.",
      icon: UserCheck,
      href: "/services/hystero-salpingography"
    },
    {
      title: "Level-2 Scan",
      description: "Detailed fetal anomaly screening performed between 18-22 weeks of pregnancy.",
      icon: Baby,
      href: "/services/level-2-scan"
    },
    {
      title: "Ovulation Study",
      description: "Follicular monitoring to track ovulation cycles for fertility assessment and treatment.",
      icon: Activity,
      href: "/services/ovulation-study"
    },
    {
      title: "Breast/Testis/Thyroid Scanning",
      description: "Specialized ultrasound examinations for breast, testicular, and thyroid gland assessment.",
      icon: Stethoscope,
      href: "/services/organ-scanning"
    },
    {
      title: "Computerized ECG",
      description: "Digital electrocardiogram testing for comprehensive cardiac rhythm and function analysis.",
      icon: CircuitBoard,
      href: "/services/ecg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ultrasoundImage} 
            alt="Medical Diagnostic Services"
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/40 via-medical-blue-dark/35 to-medical-blue/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Diagnostic Services</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive diagnostic imaging services powered by advanced technology and expert medical professionals
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Our Specialty Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced 3D/4D ultrasound and Color Doppler testing with state-of-the-art equipment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.filter(service => service.featured).map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                featured={service.featured}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Complete Diagnostic Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of diagnostic imaging and testing services for all your healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(service => !service.featured).map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 bg-medical-blue-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-medical-blue mb-6">Affordable Pricing</h2>
          <p className="text-lg text-gray-700 mb-8">
            We offer competitive pricing for all our diagnostic services. Contact us for detailed pricing information and package deals.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-medical-blue mb-4">Pricing Available on Inquiry</h3>
            <p className="text-gray-600 mb-6">
              Get personalized quotes for individual tests or comprehensive health packages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="medical" size="lg" asChild>
                <Link to="/contact">
                  <Calendar className="w-5 h-5" />
                  Get Pricing Information
                </Link>
              </Button>
              <Button variant="medical-outline" size="lg" asChild>
                <Link to="/appointments">
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;