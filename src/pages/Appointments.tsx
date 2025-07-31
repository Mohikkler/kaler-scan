import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "@/assets/doctor-profile.jpg";

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "General Consultation with Dr. Kuldip Kaler",
    "3D/4D Ultrasound Scanning",
    "Color Doppler Testing",
    "Digital X-Ray",
    "Ultrasound Scanning",
    "TVS Scan",
    "Sono Salpingography",
    "Hystero Salpingography",
    "Level-2 Scan",
    "Ovulation Study",
    "Breast/Testis/Thyroid Scanning",
    "Computerized ECG"
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const generateAppointmentId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `KSC${year}${month}${day}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const age = formData.get('age') as string;
    const gender = formData.get('gender') as string;
    const notes = formData.get('notes') as string;

    if (!firstName || !lastName || !phone) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Generate appointment ID
    const appointmentId = generateAppointmentId();
    const patientName = `${firstName} ${lastName}`;

    // Create appointment data
    const appointmentData = {
      appointmentId,
      serviceType: selectedService,
      patientName,
      phoneNumber: phone,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      email,
      age,
      gender,
      notes
    };

    try {
      // Here you would typically save to Supabase
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Send appointment confirmation email
      if (email) {
        try {
          const emailResponse = await fetch('http://localhost:4000/api/send-appointment-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              appointmentData
            })
          });

          const emailResult = await emailResponse.json();
          
          if (emailResult.success) {
            console.log('✅ Appointment confirmation email sent successfully');
          } else {
            console.error('❌ Failed to send appointment confirmation email:', emailResult.error);
          }
        } catch (emailError) {
          console.error('❌ Error sending appointment confirmation email:', emailError);
        }
      }

      // Store appointment data for confirmation page
      localStorage.setItem('lastAppointment', JSON.stringify(appointmentData));

      // Navigate to confirmation page
      navigate('/appointment-confirmation', { 
        state: { appointmentData } 
      });

    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={doctorImage} 
            alt="Book Your Appointment"
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/40 via-medical-blue-dark/35 to-medical-blue/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Appointment</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Schedule your diagnostic test with our expert medical team
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-medical-blue">
                    <Calendar className="w-6 h-6" />
                    <span>Appointment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Selection */}
                    <div>
                      <Label htmlFor="service" className="text-base font-medium">Select Service</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose the diagnostic service you need" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem 
                              key={service} 
                              value={service}
                              className={service === "General Consultation with Dr. Kuldip Kaler" 
                                ? "bg-gray-50 border-l-4 border-medical-blue font-medium" 
                                : ""
                              }
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{service}</span>
                                {service === "General Consultation with Dr. Kuldip Kaler" && (
                                  <span className="text-xs bg-medical-blue text-white px-2 py-1 rounded-full ml-2">
                                    Recommended
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Patient Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="your.email@example.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input id="age" name="age" type="number" placeholder="Age" min="1" max="120" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender">
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input id="emergencyContact" name="emergencyContact" type="tel" placeholder="Emergency number" />
                      </div>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <Label htmlFor="notes">Additional Information</Label>
                      <Textarea 
                        id="notes" 
                        name="notes"
                        placeholder="Any specific requirements, medical history, or notes for the doctor..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> All appointments are subject to availability. 
                        You will receive a confirmation call within 2-4 hours of booking. 
                        Please arrive 15 minutes before your scheduled time.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      variant="medical" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Booking Appointment...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5" />
                          Confirm Appointment
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-medical-blue">
                    <Clock className="w-5 h-5" />
                    <span>Operating Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Monday - Sunday</strong></p>
                    <p className="text-2xl font-bold text-medical-blue">9:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-500">Appointments available during operating hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-medical-blue">
                    <User className="w-5 h-5" />
                    <span>What to Bring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Valid photo ID (Aadhaar, PAN, etc.)</li>
                    <li>• Previous medical reports (if any)</li>
                    <li>• Doctor's prescription/referral</li>
                    <li>• Insurance card (if applicable)</li>
                    <li>• Comfortable clothing for examination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-medical-blue">
                    <Phone className="w-5 h-5" />
                    <span>Need Help?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Call us if you need assistance with booking or have any questions
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Sarabjeet Singh:</strong><br />
                        <a href="tel:+919779386009" className="text-medical-blue hover:underline">
                          +91 97793-86009
                        </a>
                      </p>
                      <p className="text-sm">
                        <strong>Harpreet Singh:</strong><br />
                        <a href="tel:+919876759939" className="text-medical-blue hover:underline">
                          +91 98767-59939
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Appointments;