import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/footer-logo.svg" alt="KSC Footer Logo" className="h-10 w-10 object-contain mr-2" />
              <div>
                <h3 className="font-bold text-xl text-white">Kaler Scan Centre</h3>
                <p className="text-gray-400 text-sm">& Digital X-Ray</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Advanced diagnostic imaging services with state-of-the-art technology. 
              Professional care and accurate results for all your medical imaging needs.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center hover:bg-medical-blue-dark transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center hover:bg-medical-blue-dark transition-colors">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-300 hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">
                  Patient Login
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Near City Hospital<br />
                    Shahkot, Jalandhar<br />
                    Punjab, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-medical-blue flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 97793-86009</p>
                  <p className="text-gray-300 text-sm">+91 98767-59939</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-medical-blue flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Daily: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Kaler Scan Centre. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 