"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                SnapToDoor ("we," "our," or "us") is committed to protecting your privacy. This 
                Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website www.SnapToDoor.com and use our services. Please read this 
                policy carefully to understand our practices regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect information you provide directly and data collected automatically:
              </p>
              
              <h3 className="font-medium mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name, email address, phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely)</li>
                <li>Date of birth (if provided)</li>
                <li>Account credentials</li>
              </ul>

              <h3 className="font-medium mb-2">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referral URLs</li>
                <li>Location data (with permission)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Provide customer support</li>
                <li>Personalize your shopping experience</li>
                <li>Send promotional offers and newsletters (with consent)</li>
                <li>Improve our website and services</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> Payment processors, shipping partners, cloud services</li>
                <li><strong>Business Partners:</strong> For joint marketing (with consent)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect rights</li>
                <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information, 
                including SSL encryption, secure servers, and regular security audits. However, 
                no method of transmission over the internet is 100% secure. We encourage you to 
                use strong passwords and keep your account credentials confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Object to certain processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience. You can 
                control cookie preferences through your browser settings. Disabling cookies 
                may affect some website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under 18. We do not knowingly 
                collect personal information from children. If you believe a child has 
                provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on 
                this page with an updated revision date. We encourage you to review this 
                policy regularly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions about this Privacy Policy or your personal data:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="mb-1"><strong>Data Protection Officer</strong></p>
                <p className="mb-1"><strong>Email:</strong> privacy@SnapToDoor.com</p>
                <p className="mb-1"><strong>Phone:</strong> +91 8420626114</p>
                <p><strong>Address:</strong> 1ST FLOOR, 516, R.N. GUHA ROAD, Dum Dum, Kolkata, North Twenty Four Parganas, West Bengal, 700074</p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
