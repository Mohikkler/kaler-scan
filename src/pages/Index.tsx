import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
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
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Professional diagnostic imaging you can trust
            </p>
            <div className="w-24 h-1 bg-medical-blue mx-auto mt-4"></div>
          </div>

          {/* Featured Services - Large Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredServices.map(service => <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} href={service.href} featured={service.featured} image={service.image} />)}
          </div>

          {/* Quick Services - Compact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {quickServices.map(service => 
              <div key={service.title} className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-blue group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-medical-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-base md:text-lg text-medical-blue mb-3">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.description}</p>
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Why Choose Kaler Scan Centre?
            </h2>
            <div className="w-24 h-1 bg-medical-blue mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-medical-blue mb-3">Expert Care</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Experienced medical professionals with advanced training</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-medical-blue mb-3">Advanced Technology</h3>
              <p className="text-gray-600 text-lg leading-relaxed">State-of-the-art 3D/4D and Color Doppler equipment</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-medical-blue mb-3">Convenient Hours</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Open daily from 9:00 AM to 5:00 PM for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Simplified */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-medical-blue-light/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
            Get Started Today
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Quick access to appointments and reports
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="p-8 md:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-medical-blue mb-4">Book Appointment</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Schedule your test online and get instant confirmation
              </p>
              <Button variant="medical" className="w-full min-h-[52px] text-lg font-semibold hover:scale-105 transition-transform duration-300" asChild>
                <Link to="/appointments">
                  Book Now
                </Link>
              </Button>
            </Card>

            <Card className="p-8 md:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-medical-blue mb-4">Check Reports</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Access your results securely anytime, anywhere
              </p>
              <Button variant="medical-outline" className="w-full min-h-[52px] text-lg font-semibold hover:scale-105 transition-transform duration-300" asChild>
                <Link to="/auth">
                  Patient Login
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;