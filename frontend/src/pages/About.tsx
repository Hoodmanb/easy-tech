import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Easy Technologies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the industry in precision manufacturing and industrial machinery for over two decades
          </p>
        </div>

        {/* Company Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2002, Easy Technologies has grown from a small fabrication shop to one of the region's 
                most trusted manufacturers of industrial machinery. Our journey began with a simple mission: 
                to provide high-quality, reliable manufacturing solutions that help businesses thrive.
              </p>
              <p>
                Over the years, we've expanded our capabilities to include custom machine fabrication, 
                equipment modification, maintenance services, and comprehensive technical support. 
                Our commitment to excellence and innovation has earned us the trust of clients across 
                various industries.
              </p>
              <p>
                Today, we operate from our state-of-the-art 50,000 square foot facility, equipped with 
                the latest CNC machinery, advanced welding systems, and precision measurement tools. 
                Our team of skilled engineers and technicians work tirelessly to deliver solutions 
                that exceed expectations.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To deliver innovative, high-quality industrial machinery solutions that empower 
                  businesses to achieve their manufacturing goals efficiently and reliably.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading manufacturer of industrial machinery, recognized for our 
                  innovation, quality, and exceptional customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Location</h2>
            <div className="bg-muted rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Factory & Office</h3>
                <p className="text-muted-foreground">
                  123 Industrial Boulevard<br />
                  Manufacturing District, MD 21201<br />
                  United States
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Operational Hours</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-sm text-accent">Emergency services available 24/7</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>📞 Main: (555) 123-4567</p>
                  <p>📞 Emergency: (555) 123-4568</p>
                  <p>✉️ info@easytechnologies.com</p>
                  <p>✉️ support@easytechnologies.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Find Us</h2>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Certifications & Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>ISO 9001:2015</CardTitle>
                <CardDescription>Quality Management Systems</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>ASME Certified</CardTitle>
                <CardDescription>Pressure Vessel Manufacturing</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>AWS Certified</CardTitle>
                <CardDescription>Structural Welding Standards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>John Smith</CardTitle>
                <CardDescription>Chief Executive Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  25+ years in industrial manufacturing with expertise in operations and strategic planning.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Sarah Johnson</CardTitle>
                <CardDescription>Chief Technical Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Expert in mechanical engineering with focus on precision manufacturing technologies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Mike Chen</CardTitle>
                <CardDescription>Production Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Oversees all manufacturing operations with emphasis on quality control and efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;