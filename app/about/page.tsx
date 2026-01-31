"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Target,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "150+", label: "Products" },
    { number: "15+", label: "Categories" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make starts with our customers in mind.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "We partner only with trusted brands and verified sellers.",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing without compromising on quality.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping across India.",
    },
  ];

  const team = [
    { name: "Rajesh Kumar", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
    { name: "Priya Sharma", role: "Head of Operations", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
    { name: "Amit Singh", role: "Tech Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
    { name: "Sneha Patel", role: "Customer Success", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Welcome to SnapToDoor
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
                Your one-stop destination for electronics, fashion, beauty, and personal care 
                products. We're on a mission to make online shopping simple, affordable, and 
                enjoyable for everyone across India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.number}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Bringing Quality Products to Your Doorstep
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 2024, SnapToDoor started with a simple vision: to create an 
                  online shopping experience that combines quality, affordability, and 
                  convenience. Based in Kolkata, we've grown from a small startup to 
                  serving customers across India.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We carefully curate our product selection, partnering with trusted brands 
                  and manufacturers to ensure every item meets our quality standards. From 
                  the latest electronics to trending fashion and premium beauty products, 
                  we've got everything you need under one roof.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-muted/30 rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={value.title} className="text-center">
                      <div className="bg-background w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1 text-sm">{value.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SnapToDoor?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We go above and beyond to ensure your shopping experience is nothing short of excellent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShoppingBag,
                  title: "Wide Selection",
                  description:
                    "Browse through 150+ products across electronics, fashion, beauty, and personal care categories.",
                },
                {
                  icon: Shield,
                  title: "Secure Shopping",
                  description:
                    "Shop with confidence using our secure payment gateway and buyer protection policies.",
                },
                {
                  icon: Truck,
                  title: "Pan-India Delivery",
                  description:
                    "We deliver to all major cities and towns across India with reliable shipping partners.",
                },
                {
                  icon: Users,
                  title: "24/7 Support",
                  description:
                    "Our customer support team is always ready to assist you with any queries or concerns.",
                },
                {
                  icon: Award,
                  title: "Quality Guarantee",
                  description:
                    "All products are genuine and come with manufacturer warranty where applicable.",
                },
                {
                  icon: Heart,
                  title: "Easy Returns",
                  description:
                    "Not satisfied? Return products hassle-free within our return window period.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind SnapToDoor working to make your shopping experience amazing.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-muted overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="mb-6 opacity-90">
              We'd love to hear from you. Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+918420626114"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                <span>Call: +91 8420626114</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
