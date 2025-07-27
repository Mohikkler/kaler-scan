import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Baby, Stethoscope, Eye, Activity, Scan, Calendar, FileText, ArrowRight, Star, Users, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import ultrasoundImage from "@/assets/ultrasound-3d.jpg";
import colorDopplerImage from "@/assets/color-doppler.jpg";
const Index = () => {
  const featuredServices = [{
    title: "3D/4D Ultrasound Scanning",
    description: "Advanced three-dimensional and real-time imaging for detailed fetal development monitoring and anatomical assessment with lifelike visualization.",
    icon: Baby,
    featured: true,
    image: ultrasoundImage,
    href: "/services/3d-4d-ultrasound"
  }, {
    title: "Color Doppler Testing",
    description: "State-of-the-art blood flow visualization using color-coded imaging to detect vascular abnormalities and circulation issues.",
    icon: Heart,
    featured: true,
    image: colorDopplerImage,
    href: "/services/color-doppler"
  }];
  const quickServices = [{
    title: "Digital X-Ray",
    description: "High-resolution digital radiography with reduced radiation exposure.",
    icon: Scan,
    href: "/services/digital-xray"
  }, {
    title: "Ultrasound Scanning",
    description: "Comprehensive abdominal, pelvic, and general diagnostic imaging.",
    icon: Eye,
    href: "/services/ultrasound"
  }, {
    title: "TVS Scan",
    description: "Transvaginal sonography for detailed gynecological assessment.",
    icon: Activity,
    href: "/services/tvs-scan"
  }, {
    title: "ECG Testing",
    description: "Computerized electrocardiogram for cardiac function analysis.",
    icon: Stethoscope,
    href: "/services/ecg"
  }];
  const stats = [{
    icon: Users,
    number: "10,000+",
    label: "Patients Served"
  }, {
    icon: Star,
    number: "98%",
    label: "Patient Satisfaction"
  }, {
    icon: Clock,
    number: "15+",
    label: "Years Experience"
  }, {
    icon: Award,
    number: "50+",
    label: "Tests Daily"
  }];
  return <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
      {/* Key Services - Simplified */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-medical-blue mb-3">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Professional diagnostic imaging you can trust
            </p>
          </div>

          {/* Featured Services - Large Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredServices.map(service => <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} href={service.href} featured={service.featured} image={service.image} />)}
          </div>

          {/* Quick Services - Compact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {quickServices.map(service => 
              <div key={service.title} className="bg-white rounded-lg p-4 md:p-6 text-center hover:shadow-md transition-shadow border border-gray-100">
                <service.icon className="w-8 h-8 md:w-10 md:h-10 text-medical-blue mx-auto mb-3" />
                <h3 className="font-semibold text-sm md:text-base text-medical-blue mb-2">{service.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button variant="medical-outline" size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      

      {/* Why Choose Us - Simple */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-medical-blue mb-3">
              Why Choose Kaler Scan Centre?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="font-semibold text-lg text-medical-blue mb-2">Expert Care</h3>
              <p className="text-gray-600">Experienced medical professionals with advanced training</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="font-semibold text-lg text-medical-blue mb-2">Advanced Technology</h3>
              <p className="text-gray-600">State-of-the-art 3D/4D and Color Doppler equipment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="font-semibold text-lg text-medical-blue mb-2">Convenient Hours</h3>
              <p className="text-gray-600">Open daily from 9:00 AM to 5:00 PM for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Simplified */}
      <section className="py-12 md:py-16 bg-medical-blue-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-medical-blue mb-3">
            Get Started Today
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8">
            Quick access to appointments and reports
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow">
              <Calendar className="w-10 h-10 md:w-12 md:h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-medical-blue mb-3">Book Appointment</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Schedule your test online
              </p>
              <Button variant="medical" className="w-full min-h-[44px]" asChild>
                <Link to="/appointments">
                  Book Now
                </Link>
              </Button>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-medical-blue mb-3">Check Reports</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Access your results securely
              </p>
              <Button variant="medical-outline" className="w-full min-h-[44px]" asChild>
                <Link to="/reports">
                  View Reports
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;