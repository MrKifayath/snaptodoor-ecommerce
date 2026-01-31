"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Cancellation Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Order Cancellation by Customer</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You can cancel your order under the following conditions:
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Before Shipment</h3>
                <p className="text-sm text-muted-foreground">
                  Orders can be cancelled without any charges if the cancellation request is made 
                  before the product is shipped. The full amount will be refunded within 5-7 business days.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">After Shipment</h3>
                <p className="text-sm text-muted-foreground">
                  Once an order has been shipped, it cannot be cancelled. However, you can refuse 
                  delivery or initiate a return after receiving the product as per our Return Policy.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Partial Cancellation</h3>
                <p className="text-sm text-muted-foreground">
                  For orders with multiple items, individual items can be cancelled before they are 
                  shipped. The refund will be processed for the cancelled item(s) only.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How to Cancel an Order</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Log in to Your Account</p>
                    <p className="text-muted-foreground text-sm">
                      Visit SnapToDoor and sign in to your account.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Go to My Orders</p>
                    <p className="text-muted-foreground text-sm">
                      Navigate to "My Orders" section in your account dashboard.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Select Order to Cancel</p>
                    <p className="text-muted-foreground text-sm">
                      Find the order you wish to cancel and click "Cancel Order".
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Provide Reason & Confirm</p>
                    <p className="text-muted-foreground text-sm">
                      Select a reason for cancellation and confirm your request.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Order Cancellation by SnapToDoor</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                SnapToDoor reserves the right to cancel orders under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product is out of stock or discontinued</li>
                <li>Pricing or product information errors on the website</li>
                <li>Suspected fraudulent or unauthorized transaction</li>
                <li>Unable to verify customer information</li>
                <li>Delivery address is unserviceable</li>
                <li>Payment failure or decline</li>
                <li>Violation of our Terms and Conditions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                In case of cancellation by SnapToDoor, you will be notified via email/SMS and a 
                full refund will be processed within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cancellation Charges</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Cancellation Stage</th>
                      <th className="text-left py-3 px-4">Charges</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-4">Before order confirmation</td>
                      <td className="py-3 px-4">No charges</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">After confirmation, before shipment</td>
                      <td className="py-3 px-4">No charges</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">After shipment (refused delivery)</td>
                      <td className="py-3 px-4">Shipping charges may apply</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Cash on Delivery orders (refused)</td>
                      <td className="py-3 px-4">Rs 50-100 may be deducted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refund After Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Once your cancellation request is processed, the refund will be initiated based 
                on your original payment method:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
                <li><strong>UPI:</strong> 2-3 business days</li>
                <li><strong>Net Banking:</strong> 5-7 business days</li>
                <li><strong>SnapToDoor Wallet:</strong> Instant (within 24 hours)</li>
                <li><strong>Cash on Delivery:</strong> Not applicable (no payment made)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Special Cases</h2>
              
              <h3 className="font-medium mb-2 mt-4">Pre-Order / Back-Order Items</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pre-ordered items can be cancelled anytime before the product is shipped. 
                Full refund will be provided for all cancelled pre-orders.
              </p>

              <h3 className="font-medium mb-2">Flash Sales / Limited Offers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders placed during flash sales or with special discounts follow the same 
                cancellation policy. However, re-ordering at the discounted price is not 
                guaranteed after cancellation.
              </p>

              <h3 className="font-medium mb-2">Combo / Bundle Offers</h3>
              <p className="text-muted-foreground leading-relaxed">
                For combo offers, partial cancellation may not be allowed. If one item from 
                a combo is cancelled, the entire order may be cancelled and the combo discount 
                will not apply to individual items.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Non-Cancellable Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The following items cannot be cancelled once the order is placed:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Customized or personalized products</li>
                <li>Products marked as "Non-Cancellable" on the product page</li>
                <li>Digital products or services after delivery</li>
                <li>Items purchased during final sale events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you face any issues with order cancellation or have questions, please reach out to us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="mb-1"><strong>Customer Support:</strong></p>
                <p className="mb-1"><strong>Email:</strong> support@SnapToDoor.com</p>
                <p className="mb-1"><strong>Phone:</strong> +91 8420626114</p>
                <p className="mb-1"><strong>Working Hours:</strong> Monday to Saturday, 9:00 AM - 6:00 PM IST</p>
                <p><strong>Address:</strong> 1ST FLOOR, 516, R.N. GUHA ROAD, Dum Dum, Kolkata, North Twenty Four Parganas, West Bengal, 700074</p>
              </div>
            </section>

            <section className="bg-primary/5 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold mb-3">Important Note</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Cancellation Policy is subject to change without prior notice. We recommend 
                reviewing this policy periodically. For the most current information, please 
                refer to this page. By placing an order on SnapToDoor, you agree to abide by 
                this Cancellation Policy.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
