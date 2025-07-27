import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Lock, 
  Download, 
  Eye, 
  Calendar,
  User,
  Phone,
  Shield,
  Search
} from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock reports data
  const mockReports = [
    {
      id: "RPT001",
      date: "2024-01-15",
      testType: "3D Ultrasound",
      status: "Ready",
      downloadUrl: "#"
    },
    {
      id: "RPT002", 
      date: "2024-01-10",
      testType: "Color Doppler",
      status: "Ready",
      downloadUrl: "#"
    },
    {
      id: "RPT003",
      date: "2024-01-05",
      testType: "Digital X-Ray",
      status: "Processing",
      downloadUrl: null
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Header Section */}
        <section className="bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Access Your Reports</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Securely view and download your diagnostic test reports online
              </p>
            </div>
          </div>
        </section>

        {/* Login Form */}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-medical-blue" />
                </div>
                <CardTitle className="text-2xl text-medical-blue">Patient Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Registered Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter the phone number registered with our center
                    </p>
                  </div>
                  
                  <Button type="submit" variant="medical" className="w-full">
                    <User className="w-4 h-4" />
                    Access My Reports
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-medical-blue mt-1" />
                    <div>
                      <h4 className="font-medium text-medical-blue">Privacy & Security</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your reports are protected with secure encryption. Only patients with 
                        registered phone numbers can access their reports.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Need help accessing your reports?
                  </p>
                  <div className="flex flex-col space-y-2 mt-2">
                    <a href="tel:+919779386009" className="text-medical-blue hover:underline text-sm">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Call Sarabjeet Singh: +91 97793-86009
                    </a>
                    <a href="tel:+919876759939" className="text-medical-blue hover:underline text-sm">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Call Harpreet Singh: +91 98767-59939
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Reports</h1>
              <p className="text-xl text-blue-100">
                Welcome back! Here are your diagnostic test reports.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-medical-blue"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Reports Dashboard */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Reports List */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-medical-blue">Your Reports</h2>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input placeholder="Search reports..." className="w-64" />
                </div>
              </div>

              <div className="space-y-4">
                {mockReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-medical-blue-light rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-medical-blue" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{report.testType}</h3>
                            <p className="text-gray-600">Report ID: {report.id}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(report.date).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            report.status === 'Ready' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status}
                          </span>
                          
                          {report.status === 'Ready' && (
                            <div className="flex space-x-2">
                              <Button variant="medical-outline" size="sm">
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                              <Button variant="medical" size="sm">
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {mockReports.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-600">
                      You don't have any reports available yet. Reports will appear here once your tests are completed.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-medical-blue">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-gray-600">Phone Number</Label>
                      <p className="font-medium">{phoneNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Total Reports</Label>
                      <p className="font-medium">{mockReports.length}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Ready Reports</Label>
                      <p className="font-medium text-green-600">
                        {mockReports.filter(r => r.status === 'Ready').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-medical-blue">How to Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li>1. Wait for report status to show "Ready"</li>
                    <li>2. Click "View" to preview online</li>
                    <li>3. Click "Download" to save PDF</li>
                    <li>4. Reports are password protected</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-medical-blue">Need Support?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Having trouble accessing your reports? Contact us for assistance.
                  </p>
                  <div className="space-y-2">
                    <Button variant="medical-outline" size="sm" className="w-full" asChild>
                      <a href="tel:+919779386009">
                        <Phone className="w-4 h-4" />
                        Call Support
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;