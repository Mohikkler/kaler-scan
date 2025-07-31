import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageSquare,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";
import GoogleMap from "@/components/GoogleMap";

const Contact = () => {
  // Kaler Scan Centre coordinates (approximate location in Shahkot, Jalandhar)
  const locationCoordinates = {
    lat: 31.0815, // Approximate latitude for Shahkot, Jalandhar
    lng: 75.3373  // Approximate longitude for Shahkot, Jalandhar
  };

  // You'll need to replace this with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Contact Us"
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/40 via-medical-blue-dark/35 to-medical-blue/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our medical team for appointments, inquiries, or support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-medical-blue mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <Card className="border-l-4 border-l-medical-blue">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3 text-medical-blue">
                      <MapPin className="w-6 h-6" />
                      <span>Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Near City Hospital<br />
                      Salaichan Road, Shahkot-144702<br />
                      Jalandhar, Punjab, India
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-medical-blue">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3 text-medical-blue">
                      <Phone className="w-6 h-6" />
                      <span>Contact Numbers</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Sarabjeet Singh:</strong> +91 97793-86009
                      </p>
                      <p className="text-gray-700">
                        <strong>Harpreet Singh:</strong> +91 98767-59939
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-medical-blue">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3 text-medical-blue">
                      <Clock className="w-6 h-6" />
                      <span>Operating Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Monday - Sunday:</strong> 9:00 AM - 5:00 PM
                      </p>
                      <p className="text-sm text-gray-500">
                        Appointments available during operating hours
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-medical-blue-light rounded-lg">
                <h3 className="font-bold text-medical-blue mb-3">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="medical" size="sm" asChild>
                    <Link to="/appointments">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="tel:+919779386009">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-medical-blue">
                    <MessageSquare className="w-6 h-6" />
                    <span>Send Us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your inquiry or question..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <Button type="submit" variant="medical" className="w-full">
                      <Mail className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Find Our Location</h2>
            <p className="text-lg text-gray-600">
              Located conveniently near City Hospital on Salaichan Road, Shahkot
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg">
            {GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY_HERE' ? (
              <GoogleMap 
                apiKey={GOOGLE_MAPS_API_KEY}
                center={locationCoordinates}
                zoom={15}
                className="h-96 w-full"
              />
            ) : (
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Near City Hospital, Salaichan Road</p>
                  <p className="text-sm">Shahkot-144702, Jalandhar, Punjab</p>
                  <p className="text-sm text-medical-blue mt-2">
                    Add your Google Maps API key to enable interactive map
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-medical-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>
          <p className="text-blue-100 mb-6">
            For urgent medical queries or emergency appointments, contact us immediately
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-blue" asChild>
              <a href="tel:+919779386009">
                <Phone className="w-4 h-4" />
                Emergency: +91 97793-86009
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;