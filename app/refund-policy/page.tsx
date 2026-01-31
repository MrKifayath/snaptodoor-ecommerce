"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                At SnapToDoor, we strive to ensure complete customer satisfaction with every purchase. 
                This Refund Policy outlines the terms and conditions under which refunds are provided 
                for products purchased from our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility for Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You may be eligible for a refund under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product received is damaged or defective</li>
                <li>Wrong product delivered</li>
                <li>Product significantly differs from the description</li>
                <li>Product is missing parts or accessories</li>
                <li>Product received after the promised delivery date (subject to terms)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Refund Timeline</h2>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Electronics</p>
                    <p className="text-muted-foreground">7 days from delivery</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Fashion & Accessories</p>
                    <p className="text-muted-foreground">15 days from delivery</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Beauty Products</p>
                    <p className="text-muted-foreground">7 days from delivery (unopened only)</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Personal Care Items</p>
                    <p className="text-muted-foreground">7 days from delivery (unopened only)</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Non-Refundable Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The following items are not eligible for refunds:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Opened beauty and personal care products (hygiene reasons)</li>
                <li>Customized or personalized items</li>
                <li>Innerwear, lingerie, and swimwear</li>
                <li>Products with tampered serial numbers or labels</li>
                <li>Items damaged due to misuse by the customer</li>
                <li>Free gifts or promotional items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refund Process</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Initiate Refund Request</p>
                    <p className="text-muted-foreground text-sm">
                      Log in to your account and navigate to "My Orders". Select the order and click 
                      "Request Refund".
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Provide Details</p>
                    <p className="text-muted-foreground text-sm">
                      Select the reason for refund and upload relevant photos/videos if applicable.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Approval & Pickup</p>
                    <p className="text-muted-foreground text-sm">
                      Once approved, a pickup will be scheduled within 2-3 business days.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Refund Credit</p>
                    <p className="text-muted-foreground text-sm">
                      Refund will be processed within 5-7 business days after we receive the returned item.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Refund Methods</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Refunds will be credited based on your original payment method:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
                <li><strong>UPI:</strong> 2-3 business days</li>
                <li><strong>Net Banking:</strong> 5-7 business days</li>
                <li><strong>Cash on Delivery:</strong> Refund to bank account or SnapToDoor wallet</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Partial Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                In certain cases, partial refunds may be granted:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Items returned with signs of use or missing original packaging</li>
                <li>Items returned after the standard return window but within extended warranty</li>
                <li>Products with missing accessories (refund adjusted for missing items)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about our Refund Policy, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="mb-1"><strong>Email:</strong> support@SnapToDoor.com</p>
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
