import { Link } from 'react-router-dom';
import { Droplets, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="gradient-primary rounded-xl p-2">
                <Droplets className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">Bubble Liquid</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium liquid cleaning solutions for every corner of your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'Products', 'About Us'].map(label => (
                <li key={label}>
                  <Link to={label === 'Home' ? '/' : label === 'Products' ? '/products' : '#'} className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>bubbleliquids2026@gmail.com</li>
              <li>+91 98765 43210</li>
              <li>Chennai, India</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center hover:bg-secondary hover:text-primary-foreground transition-all hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Bubble Liquid. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
