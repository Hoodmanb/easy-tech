import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-md"></div>
              <span className="text-xl font-bold text-foreground">
                Easy Technologies
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Leading manufacturer of industrial machines and fabrication solutions. 
              We deliver precision, quality, and reliability for your manufacturing needs.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 123 Industrial Blvd, Manufacturing District</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@easytechnologies.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/machines" className="text-muted-foreground hover:text-primary transition-colors">
                  Machines Catalog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Machine Fabrication</li>
              <li>Custom Solutions</li>
              <li>Maintenance & Repair</li>
              <li>Technical Support</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2024 Easy Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;