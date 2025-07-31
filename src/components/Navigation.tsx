import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import KSCLogo from "./KSCLogo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/ksc-logo.svg" alt="KSC Logo" className="h-14 w-14 object-contain" />
            <div className="flex flex-col min-w-[10rem] md:min-w-[14rem]">
              <span className="font-bold text-lg text-medical-blue">Kaler Scan Centre</span>
              <span className="text-xs text-gray-600">& Digital X-Ray</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-medical-blue ${
                  isActive(link.href)
                    ? "text-medical-blue border-b-2 border-medical-blue pb-1"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="medical-outline" size="sm" asChild>
              <Link to="/appointments">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </Button>
            <Button variant="medical" size="sm" asChild>
              <Link to="/auth">
                <FileText className="w-4 h-4" />
                Patient Login
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    isActive(link.href)
                      ? "text-medical-blue bg-medical-blue-light"
                      : "text-gray-700 hover:text-medical-blue hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button variant="medical-outline" size="sm" className="w-full" asChild>
                  <Link to="/appointments">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="medical" size="sm" className="w-full" asChild>
                  <Link to="/auth">
                    <FileText className="w-4 h-4" />
                    Patient Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;