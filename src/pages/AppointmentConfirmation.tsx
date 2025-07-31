import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  FileText, 
  ArrowLeft,
  Download,
  Share2
} from "lucide-react";
import doctorImage from "@/assets/doctor-profile.jpg";

interface AppointmentData {
  appointmentId: string;
  serviceType: string;
  patientName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);

  useEffect(() => {
    // Get appointment data from location state or localStorage
    const data = location.state?.appointmentData || JSON.parse(localStorage.getItem('lastAppointment') || 'null');
    if (data) {
      setAppointmentData(data);
    } else {
      // Redirect to appointments if no data
      navigate('/appointments');
    }
  }, [location.state, navigate]);

  const handleDownloadConfirmation = () => {
    if (!appointmentData) return;
    
    const confirmationText = `
KALER SCAN CENTRE
Appointment Confirmation

Appointment ID: ${appointmentData.appointmentId}
Patient Name: ${appointmentData.patientName}
Phone: ${appointmentData.phoneNumber}
Service: ${appointmentData.serviceType}
Date: ${appointmentData.preferredDate}
Time: ${appointmentData.preferredTime}

Location: Near City Hospital, Shahkot, Jalandhar
Contact: +91 97793-86009, +91 98767-59939

Please arrive 15 minutes before your scheduled time.
Bring valid photo ID and any previous medical reports.

Thank you for choosing Kaler Scan Centre!
    `;

    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointment-${appointmentData.appointmentId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (!appointmentData) return;
    
    const shareText = `My appointment at Kaler Scan Centre is confirmed for ${appointmentData.preferredDate} at ${appointmentData.preferredTime}. Appointment ID: ${appointmentData.appointmentId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appointment Confirmation - Kaler Scan Centre',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Appointment details copied to clipboard!');
    }
  };

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={doctorImage} 
            alt="Appointment Confirmed"
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/40 via-medical-blue-dark/35 to-medical-blue/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Appointment Confirmed!</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your appointment has been successfully scheduled. We look forward to serving you.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Confirmation Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="text-2xl text-medical-blue flex items-center justify-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <span>Appointment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Appointment ID */}
                    <div className="bg-medical-blue-light rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Appointment ID</p>
                      <p className="text-2xl font-bold text-medical-blue">{appointmentData.appointmentId}</p>
                    </div>

                    {/* Patient Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Patient Name</p>
                        <p className="text-lg font-semibold text-gray-900">{appointmentData.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                        <p className="text-lg font-semibold text-gray-900">{appointmentData.phoneNumber}</p>
                      </div>
                    </div>

                    {/* Service & Schedule */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Service Type</p>
                        <p className="text-lg font-semibold text-gray-900">{appointmentData.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-medical-blue" />
                          <span className="text-lg font-semibold text-gray-900">{appointmentData.preferredDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-medical-blue" />
                          <span className="text-lg font-semibold text-gray-900">{appointmentData.preferredTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointmentData.notes && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Additional Notes</p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{appointmentData.notes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        onClick={handleDownloadConfirmation}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Confirmation
                      </Button>
                      <Button 
                        onClick={handleShare}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Important Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-medical-blue">Important Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Arrive 15 minutes before your scheduled time</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Bring valid photo ID (Aadhaar, PAN, etc.)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Bring any previous medical reports</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Wear comfortable clothing for examination</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>You'll receive a confirmation call within 2-4 hours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Location & Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-medical-blue">Location & Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-medical-blue mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Kaler Scan Centre</p>
                        <p className="text-sm text-gray-600">Near City Hospital, Shahkot, Jalandhar</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-medical-blue mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Operating Hours</p>
                        <p className="text-sm text-gray-600">9:00 AM - 5:00 PM (Daily)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-medical-blue mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Contact Numbers</p>
                        <p className="text-sm text-gray-600">+91 97793-86009</p>
                        <p className="text-sm text-gray-600">+91 98767-59939</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-medical-blue">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>1. <strong>Confirmation Call:</strong> We'll call you within 2-4 hours to confirm your appointment</p>
                    <p>2. <strong>Prepare:</strong> Gather your documents and arrive 15 minutes early</p>
                    <p>3. <strong>Check-in:</strong> Present your appointment ID at reception</p>
                    <p>4. <strong>Results:</strong> Receive your reports as per the service timeline</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="medical" size="lg" asChild>
                <Link to="/appointments">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Book Another Appointment
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Need to reschedule? Call us at +91 97793-86009
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentConfirmation; 