import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';
import { Mail, Phone, MapPin, Send, Stethoscope } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PublicFooter() {
  return (
    <footer className="relative border-t bg-slate-50 dark:bg-slate-950/50">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
      
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/30">
            <Stethoscope size={22} className="transition-transform duration-300 group-hover:rotate-12" />
          </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Doctori<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering patients with world-class healthcare technology. Connect with top-rated specialists and manage your health journey seamlessly.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="rounded-full w-9 h-9 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Platform</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Doctors', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Support</h3>
            <ul className="space-y-4">
              {['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Stay Updated</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Subscribe to get the latest health tips and platform updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-600"
              />
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>123 Medical Lane, Health City, HC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>contact@doctori.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
            &copy; {new Date().getFullYear()} Doctori. Built with trust for your health.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems Operational</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;