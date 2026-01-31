"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "Orders & Shipping",
      faqs: [
        {
          question: "How can I track my order?",
          answer:
            "Once your order is shipped, you'll receive an email with a tracking link. You can also track your order by logging into your account and visiting the 'My Orders' section. Click on the specific order to view real-time tracking information.",
        },
        {
          question: "What are the delivery charges?",
          answer:
            "We offer FREE shipping on all orders above Rs 999. For orders below Rs 999, a flat shipping fee of Rs 99 is applicable. Delivery times vary based on your location, typically 3-7 business days for most areas.",
        },
        {
          question: "Do you deliver to my area?",
          answer:
            "We deliver to all major cities and towns across India through our trusted logistics partners. During checkout, enter your PIN code to check delivery availability and estimated delivery time for your area.",
        },
        {
          question: "Can I change my delivery address after placing an order?",
          answer:
            "Address changes are possible only before the order is shipped. Please contact our customer support immediately at support@SnapToDoor.com or call +91 8420626114 to request an address change.",
        },
      ],
    },
    {
      category: "Payments",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept Credit Cards (Visa, Mastercard, American Express), Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (available for select PIN codes and order values).",
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer:
            "Absolutely! We use industry-standard 256-bit SSL encryption to protect your payment information. We do not store your complete card details on our servers. All transactions are processed through secure payment gateways.",
        },
        {
          question: "Why was my payment declined?",
          answer:
            "Payment declines can occur due to insufficient funds, incorrect card details, bank restrictions, or security checks. Please verify your card details and try again, or use an alternative payment method. Contact your bank if the issue persists.",
        },
        {
          question: "Do you offer EMI options?",
          answer:
            "Yes, we offer No-Cost EMI and Standard EMI options on select credit cards for orders above Rs 3000. Available EMI tenures range from 3 to 12 months depending on the card issuer.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We offer easy returns within 7-15 days of delivery depending on the product category. Electronics have a 7-day return window, while fashion items can be returned within 15 days. Beauty products can only be returned if unopened.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "Log in to your account, go to 'My Orders', select the order, and click 'Return Item'. Choose the reason for return, upload photos if required, and submit. Our team will verify and schedule a pickup within 2-3 business days.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-7 business days after we receive and verify the returned item. The refund will be credited to your original payment method. UPI refunds are typically faster (2-3 days).",
        },
        {
          question: "Can I exchange a product instead of returning?",
          answer:
            "Currently, we don't offer direct exchanges. You'll need to return the original item and place a new order for the desired product. We're working on adding an exchange feature soon!",
        },
      ],
    },
    {
      category: "Products",
      faqs: [
        {
          question: "Are all products genuine and original?",
          answer:
            "Yes, all products sold on SnapToDoor are 100% genuine and sourced directly from authorized distributors or manufacturers. We maintain strict quality control and offer manufacturer warranty on applicable products.",
        },
        {
          question: "What if I receive a damaged or defective product?",
          answer:
            "If you receive a damaged or defective item, please report it within 48 hours of delivery. Take photos/videos of the damage and contact our support team. We'll arrange a replacement or full refund at no extra cost.",
        },
        {
          question: "Do products come with warranty?",
          answer:
            "Electronics and appliances come with manufacturer warranty (1-2 years depending on the product). Warranty details are mentioned on the product page. Keep your invoice safe as it serves as proof of purchase for warranty claims.",
        },
        {
          question: "Can I check product availability at your store?",
          answer:
            "SnapToDoor is an online-only store. We don't have physical retail locations. All orders are shipped directly from our warehouse to your doorstep.",
        },
      ],
    },
    {
      category: "Account & Orders",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "Click on 'Sign Up' at the top right of our website. Enter your name, email, phone number, and create a password. You can also sign up using your Google or Facebook account for quicker registration.",
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer:
            "Click on 'Login', then 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. The link is valid for 24 hours.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or cancelled before they are shipped. Go to 'My Orders', select the order, and click 'Cancel Order'. Once shipped, cancellation isn't possible, but you can refuse delivery or initiate a return.",
        },
        {
          question: "How do I update my account information?",
          answer:
            "Log in to your account and go to 'Account Settings'. Here you can update your name, email, phone number, addresses, and password. Changes are saved automatically.",
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Find quick answers to common questions about orders, payments,
                shipping, and more.
              </p>

              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${categoryIndex}-${index}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No results found for "{searchQuery}"
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+918420626114">Call +91 8420626114</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
