'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
              <p className="text-sm text-white/70">Get updates on new arrivals and exclusive offers</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full md:w-64"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/logo.png"
                alt="SnapToDoor"
                width={1265}
                height={292}
                className="h-[230px] w-auto"
              />
            </Link>
            <p className="text-sm text-white/70 mb-4">
              Your one-stop destination for electronics, fashion, beauty products and personal care items. 
              Quality products at the best prices.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-white/70">
                  1ST FLOOR, 516, R.N. GUHA ROAD, Dum Dum, Kolkata, North Twenty Four Parganas, West Bengal, 700074
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-white/70">8420626114</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-white/70">support@snaptodoor.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/category/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/category/fashion" className="hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="/category/beauty" className="hover:text-white transition-colors">Beauty</Link></li>
              <li><Link href="/category/personal-care" className="hover:text-white transition-colors">Personal Care</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social & Payment */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">Follow us:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-white/70 transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white/70 transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white/70 transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white/70 transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">We Accept:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 px-3 py-1 rounded text-xs font-medium">Visa</div>
                <div className="bg-white/10 px-3 py-1 rounded text-xs font-medium">Mastercard</div>
                <div className="bg-white/10 px-3 py-1 rounded text-xs font-medium">UPI</div>
                <div className="bg-white/10 px-3 py-1 rounded text-xs font-medium">COD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-white/10">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} SnapToDoor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
