"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to SnapToDoor ("we," "our," or "us"). These Terms and Conditions govern your 
                use of our website www.SnapToDoor.com and the purchase of products from our platform. 
                By accessing or using our services, you agree to be bound by these Terms. If you do 
                not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>"Platform"</strong> refers to the SnapToDoor website and mobile applications</li>
                <li><strong>"User"</strong> refers to any individual who accesses or uses the Platform</li>
                <li><strong>"Products"</strong> refers to items available for purchase on the Platform</li>
                <li><strong>"Seller"</strong> refers to SnapToDoor and any third-party vendors</li>
                <li><strong>"Order"</strong> refers to a purchase request placed by a User</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To make purchases on SnapToDoor, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password confidential and secure</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Products and Pricing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We strive to display accurate product information, including descriptions, images, 
                and prices. However:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product images are for illustration purposes and may vary from actual products</li>
                <li>Prices are subject to change without prior notice</li>
                <li>All prices are in Indian Rupees (INR) and inclusive of applicable taxes</li>
                <li>We reserve the right to limit quantities or refuse any order</li>
                <li>Promotional offers are subject to specific terms and availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Order Acceptance and Fulfillment</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Your order constitutes an offer to purchase. Order acceptance occurs when:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We send you an order confirmation email</li>
                <li>We process your payment successfully</li>
                <li>We ship the product(s)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We may cancel orders due to product unavailability, pricing errors, suspected fraud, 
                or other legitimate reasons. In such cases, a full refund will be issued.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Credit Cards (Visa, Mastercard, American Express)</li>
                <li>Debit Cards</li>
                <li>UPI (Unified Payments Interface)</li>
                <li>Net Banking</li>
                <li>Cash on Delivery (available for select locations and order values)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                All payments are processed through secure payment gateways. We do not store your 
                complete card details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Delivery timelines are estimates and may vary based on:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your delivery location</li>
                <li>Product availability</li>
                <li>External factors (weather, strikes, etc.)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Free shipping is available on orders above Rs 999. Standard shipping charges apply 
                to orders below this amount.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on SnapToDoor, including text, graphics, logos, images, and software, 
                is the property of SnapToDoor or its licensors and is protected by Indian and 
                international copyright laws. You may not reproduce, distribute, or create 
                derivative works without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When using our Platform, you agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious software or code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass or abuse other users or our staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, SnapToDoor shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from 
                your use of our services or products. Our total liability shall not exceed the 
                amount paid by you for the specific product or service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold SnapToDoor harmless from any claims, damages, 
                losses, or expenses arising from your breach of these Terms or your use of our Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these Terms shall be resolved through arbitration in 
                Kolkata, India, in accordance with the Arbitration and Conciliation Act, 1996. 
                The language of arbitration shall be English.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of 
                India. The courts of Kolkata, West Bengal shall have exclusive jurisdiction over 
                any disputes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">14. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective 
                upon posting on our Platform. Your continued use after changes constitutes 
                acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">15. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any questions regarding these Terms, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="mb-1"><strong>SnapToDoor</strong></p>
                <p className="mb-1"><strong>Email:</strong> legal@SnapToDoor.com</p>
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
