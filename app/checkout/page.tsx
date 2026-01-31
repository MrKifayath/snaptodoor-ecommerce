"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Lock,
  Shield,
  Truck,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: false,
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");

  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const finalTotal = totalPrice + shipping + tax;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2500);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="bg-muted/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checking out.
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order. We've sent a confirmation email with order details.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Order ID: #SV{Date.now().toString().slice(-8)}
          </p>
          <div className="bg-card rounded-lg p-4 border mb-6 text-left">
            <p className="text-sm font-medium mb-1">Estimated Delivery</p>
            <p className="text-muted-foreground text-sm">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/">Track Order</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/cart" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="SnapToDoor"
              width={500}
              height={115}
              className="h-[90px] w-auto"
            />
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <Lock className="h-4 w-4 mr-1" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Shipping" },
                { num: 2, label: "Payment" },
                { num: 3, label: "Review" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                  </div>
                  <span
                    className={`ml-2 text-sm hidden sm:inline ${
                      step >= s.num ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < 2 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${
                        step > s.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl p-6 border"
                >
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, address: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={shippingInfo.state}
                        onValueChange={(value) =>
                          setShippingInfo({ ...shippingInfo, state: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        value={shippingInfo.pincode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                        }
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="saveAddress"
                      checked={shippingInfo.saveAddress}
                      onCheckedChange={(checked) =>
                        setShippingInfo({ ...shippingInfo, saveAddress: checked as boolean })
                      }
                    />
                    <label htmlFor="saveAddress" className="text-sm text-muted-foreground cursor-pointer">
                      Save this address for future orders
                    </label>
                  </div>

                  <Button className="w-full mt-6" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl p-6 border"
                >
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-3" />
                        Credit / Debit Card
                      </Label>
                      <div className="flex gap-1">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" width={32} height={20} className="object-contain" />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" width={32} height={20} className="object-contain" />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png" alt="Amex" width={32} height={20} className="object-contain" />
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "upi" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 mr-3" />
                        UPI
                      </Label>
                      <div className="flex gap-1">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png" alt="UPI" width={40} height={20} className="object-contain" />
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "netbanking" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                        <Building2 className="h-5 w-5 mr-3" />
                        Net Banking
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "cod" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center cursor-pointer">
                        <Wallet className="h-5 w-5 mr-3" />
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, number: formatCardNumber(e.target.value) })
                          }
                          maxLength={19}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) =>
                              setCardInfo({ ...cardInfo, expiry: formatExpiry(e.target.value) })
                            }
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* UPI Form */}
                  {paymentMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Shipping Address */}
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Shipping Address</h3>
                      <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{shippingInfo.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
                    </p>
                    <p className="text-sm text-muted-foreground">{shippingInfo.phone}</p>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Payment Method</h3>
                      <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm capitalize">
                      {paymentMethod === "card" && `Card ending in ${cardInfo.number.slice(-4)}`}
                      {paymentMethod === "upi" && `UPI: ${upiId}`}
                      {paymentMethod === "netbanking" && "Net Banking"}
                      {paymentMethod === "cod" && "Cash on Delivery"}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="bg-card rounded-xl p-6 border">
                    <h3 className="font-semibold mb-4">Order Items ({items.length})</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Place Order - Rs {finalTotal.toLocaleString()}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-card rounded-xl p-6 border sticky top-24">
              <h2 className="font-bold mb-4">Order Summary</h2>

              <Accordion type="single" collapsible defaultValue="items">
                <AccordionItem value="items" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    {items.length} items in cart
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 max-h-64 overflow-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm line-clamp-1">{item.name}</p>
                            <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                          </div>
                          <p className="text-sm">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span>Rs {tax.toLocaleString()}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rs {finalTotal.toLocaleString()}</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders above Rs 999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
