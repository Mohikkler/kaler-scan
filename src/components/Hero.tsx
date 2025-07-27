import { Button } from "@/components/ui/button";
import { Calendar, FileText, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-medical-blue via-medical-blue-dark to-medical-blue flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern medical diagnostic center"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/90 to-medical-blue-dark/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Advanced <span className="text-blue-200">3D/4D Ultrasound</span> & 
              <span className="text-blue-200"> Color Doppler</span> Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Experience cutting-edge diagnostic imaging with our state-of-the-art equipment and expert medical professionals.
            </p>
            
            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">3D/4D Ultrasound Imaging</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Color Doppler Testing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Digital X-Ray Services</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span className="text-blue-100">Expert Medical Team</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-medical-blue hover:bg-blue-50 shadow-lg" asChild>
                <Link to="/appointments">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-medical-blue" asChild>
                <Link to="/reports">
                  <FileText className="w-5 h-5" />
                  Access Reports
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Visit Our Center</h3>
            
            <div className="space-y-4 text-white">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-200" />
                <div>
                  <p className="font-medium">Near City Hospital</p>
                  <p className="text-blue-100">Salaichan Road, Shahkot-144702</p>
                  <p className="text-blue-100">Jalandhar, Punjab, India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-200" />
                <div>
                  <p className="font-medium">Contact Numbers</p>
                  <p className="text-blue-100">+91 97793-86009 (Sarabjeet Singh)</p>
                  <p className="text-blue-100">+91 98767-59939 (Harpreet Singh)</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mt-6">
                <p className="font-medium mb-2">Operating Hours</p>
                <p className="text-blue-100">Monday - Sunday</p>
                <p className="text-xl font-bold text-white">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;