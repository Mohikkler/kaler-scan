import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, 
  Users, 
  Calendar, 
  Phone, 
  MapPin,
  Heart,
  Target,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import doctorImage from "@/assets/doctor-profile.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Kaler Scan Centre</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Dedicated to providing exceptional diagnostic imaging services with advanced technology and compassionate care
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-6">
                Meet Dr. Kuldip Kaler
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>M.B.B.S., M.D. (PGI) Chandigarh</strong> - A highly qualified medical professional 
                  specializing in diagnostic imaging and patient care.
                </p>
                
                <div className="bg-medical-blue-light p-6 rounded-lg">
                  <h3 className="font-bold text-medical-blue mb-3">Professional Credentials</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-medical-blue" />
                      <span><strong>Qualification:</strong> M.B.B.S., M.D. (PGI) Chandigarh</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-medical-blue" />
                      <span><strong>Specialization:</strong> Anesthesiologist & Intensivist, Sonologist</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-medical-blue" />
                      <span><strong>Registration:</strong> 29908 (PMC)</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Dr. Kaler brings extensive experience in diagnostic imaging, with particular expertise in 
                  advanced ultrasound techniques including 3D/4D imaging and Color Doppler studies. His 
                  commitment to patient care and diagnostic excellence has made Kaler Scan Centre a trusted 
                  name in the Jalandhar region.
                </p>

                <p>
                  With his background as an Anesthesiologist and Intensivist, Dr. Kaler understands the 
                  critical importance of accurate and timely diagnostic imaging in patient care, ensuring 
                  that every scan is performed with precision and attention to detail.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src={doctorImage} 
                  alt="Dr. Kuldip Kaler"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-medical-blue text-white p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">Our Professional Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to providing exceptional patient care and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-medical-blue" />
                  <span>Sarabjeet Singh</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Patient Care Coordinator & Administrative Manager</p>
                <div className="flex items-center space-x-2 text-medical-blue">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+91 97793-86009</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Handles appointment scheduling, patient inquiries, and ensures smooth center operations
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-medical-blue" />
                  <span>Harpreet Singh</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Patient Relations & Support Services</p>
                <div className="flex items-center space-x-2 text-medical-blue">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+91 98767-59939</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Assists with patient support, report queries, and general information services
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">Our Values & Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Committed to excellence in diagnostic imaging with patient-centered care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-medical-blue" />
                </div>
                <CardTitle className="text-medical-blue">Precision & Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  State-of-the-art equipment and expert interpretation ensure the highest accuracy in all diagnostic procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-medical-blue" />
                </div>
                <CardTitle className="text-medical-blue">Compassionate Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every patient receives personalized attention and care in a comfortable, welcoming environment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-medical-blue" />
                </div>
                <CardTitle className="text-medical-blue">Excellence in Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuous commitment to maintaining the highest standards in diagnostic imaging and patient service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-medical-blue-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-medical-blue mb-6">Visit Our Center</h2>
          
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="font-bold text-medical-blue mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location
                </h3>
                <p className="text-gray-700 mb-2">Near City Hospital</p>
                <p className="text-gray-700 mb-2">Salaichan Road, Shahkot-144702</p>
                <p className="text-gray-700">Jalandhar, Punjab, India</p>
              </div>
              
              <div className="text-left">
                <h3 className="font-bold text-medical-blue mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Operating Hours
                </h3>
                <p className="text-gray-700 mb-2">Monday - Sunday</p>
                <p className="text-2xl font-bold text-medical-blue">9:00 AM - 5:00 PM</p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Button variant="medical" size="lg" asChild>
                <Link to="/appointments">
                  <Calendar className="w-5 h-5" />
                  Schedule Your Appointment
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;