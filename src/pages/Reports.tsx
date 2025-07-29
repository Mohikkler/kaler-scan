import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { 
  FileText, 
  Download, 
  Search, 
  Phone, 
  User, 
  Calendar,
  Clock,
  Shield,
  Eye,
  LogOut,
  Loader2
} from 'lucide-react';

interface Report {
  id: string;
  report_id: string;
  test_type: string;
  status: 'pending' | 'ready' | 'delivered';
  report_date: string;
  file_url?: string;
  file_name?: string;
}

export default function Reports() {
  const { user, loading, signOut, isLoggedIn } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    if (user || isLoggedIn()) {
      fetchReports();
    }
  }, [user, isLoggedIn]);

  // Redirect if not authenticated (after all hooks)
  if (!loading && !user && !isLoggedIn()) {
    return <Navigate to="/auth" replace />;
  }

  const fetchReports = async () => {
    try {
      const phone = localStorage.getItem('current_phone');
      if (!phone) {
        toast.error('Phone number not found. Please login again.');
        signOut();
        return;
      }

      // Get patient ID from phone number
      const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('phone_number', phone)
        .maybeSingle();

      if (!patient) {
        toast.error('Patient profile not found. Please contact support.');
        return;
      }

      // Fetch reports for this patient
      const { data: reportsData, error } = await supabase
        .from('reports')
        .select('*')
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReports(reportsData || []);
    } catch (error: any) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const filteredReports = reports.filter(report =>
    report.test_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.report_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadReport = async (report: Report) => {
    if (!report.file_url) {
      toast.error('Report file not available');
      return;
    }

    try {
      // In a real implementation, this would download from Supabase Storage
      // For now, show a success message
      toast.success(`Downloading ${report.file_name || report.report_id}`);
    } catch (error) {
      toast.error('Failed to download report');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
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
              <p className="text-blue-200 mt-2">
                Phone: {localStorage.getItem('current_phone')}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-medical-blue"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
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
                  <Input 
                    placeholder="Search reports..." 
                    className="w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Reports List */}
              {loadingReports ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading your reports...</p>
                </div>
              ) : filteredReports.length > 0 ? (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-medical-blue-light rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-medical-blue" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{report.test_type}</h3>
                              <p className="text-gray-600">Report ID: {report.report_id}</p>
                              <p className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(report.report_date).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                              report.status === 'ready' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                            
                            {report.status === 'ready' && (
                              <div className="flex space-x-2">
                                <Button variant="medical-outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                  View
                                </Button>
                                <Button 
                                  variant="medical" 
                                  size="sm"
                                  onClick={() => downloadReport(report)}
                                >
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
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm 
                        ? "No reports match your search criteria." 
                        : "You don't have any reports yet. Reports will appear here once your tests are completed."
                      }
                    </p>
                    <Link to="/appointments">
                      <Button variant="medical">Book an Appointment</Button>
                    </Link>
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
                      <label className="text-sm text-gray-600">Phone Number</label>
                      <p className="font-medium">{localStorage.getItem('current_phone')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Total Reports</label>
                      <p className="font-medium">{reports.length}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Ready Reports</label>
                      <p className="font-medium text-green-600">
                        {reports.filter(r => r.status === 'ready').length}
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
}