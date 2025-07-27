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
      
      {/* Featured Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Our Specialty Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience advanced diagnostic imaging with our cutting-edge 3D/4D ultrasound and Color Doppler technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredServices.map(service => <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} href={service.href} featured={service.featured} image={service.image} />)}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
              Complete Diagnostic Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of diagnostic tests and imaging services for all your healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map(service => <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} href={service.href} />)}
          </div>

          <div className="text-center mt-12">
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
      

      {/* CTA Section */}
      <section className="py-16 bg-medical-blue-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-6">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Book your diagnostic test online or access your reports securely through our patient portal
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <Calendar className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                <CardTitle className="text-medical-blue">Book Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Schedule your diagnostic test online with our easy booking system. Choose your preferred date and time.
                </p>
                <Button variant="medical" className="w-full" asChild>
                  <Link to="/appointments">
                    Book Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <FileText className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                <CardTitle className="text-medical-blue">Access Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Securely access and download your test reports online using our patient portal system.
                </p>
                <Button variant="medical-outline" className="w-full" asChild>
                  <Link to="/reports">
                    Check Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;