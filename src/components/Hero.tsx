import { Button } from "@/components/ui/button";
import { Calendar, FileText, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-medical-blue via-medical-blue-dark to-medical-blue flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Kaler Scan Centre - Advanced Diagnostic Center"
          className="w-full h-full object-cover opacity-20 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/90 via-medical-blue-dark/85 to-medical-blue/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center text-white">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            KALER SCAN CENTRE
          </h1>
          <p className="text-lg md:text-xl mb-2 text-blue-100">
            Advanced Diagnostic Imaging Services
          </p>
          <p className="text-sm md:text-base mb-8 text-blue-200">
            Near City Hospital, Shahkot, Jalandhar
          </p>
          
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-md mx-auto">
            <Button size="lg" className="bg-white text-medical-blue hover:bg-white/90 hover:scale-105 shadow-xl text-base py-3 min-h-[48px] transition-all duration-300 font-semibold" asChild>
              <Link to="/appointments">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-medical-blue text-base py-3 min-h-[48px] transition-all duration-300" asChild>
              <Link to="/reports">
                <FileText className="w-5 h-5" />
                Check Reports
              </Link>
            </Button>
          </div>

          {/* Quick Contact & Hours */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Phone className="w-5 h-5 text-blue-200" />
                <p className="font-semibold text-lg">Contact Us</p>
              </div>
              <p className="text-blue-100 text-sm">+91 97793-86009</p>
              <p className="text-blue-100 text-sm">+91 98767-59939</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <MapPin className="w-5 h-5 text-blue-200" />
                <p className="font-semibold text-lg">Open Daily</p>
              </div>
              <p className="text-xl font-bold text-white">9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;