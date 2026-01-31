'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function ComingSoonModal({ isOpen, onClose, productName }: ComingSoonModalProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              
              {/* Sparkles Animation */}
              <div className="absolute top-10 left-10 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary/30" />
              </div>
              <div className="absolute bottom-10 right-10 animate-pulse delay-75">
                <Sparkles className="h-8 w-8 text-accent/30" />
              </div>

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 shadow-lg"
                >
                  <Clock className="h-10 w-10 text-primary-foreground" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  Coming Soon!
                </motion.h2>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 mb-6"
                >
                  <p className="text-lg font-medium text-foreground">
                    Stay Tuned!
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We're bringing <span className="font-semibold text-foreground">{productName || 'this amazing product'}</span> to you very soon. 
                    Get notified when it's available!
                  </p>
                </motion.div>

                {/* Notify Form */}
                {!isSubscribed ? (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleNotify}
                    className="space-y-3"
                  >
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                        required
                      />
                      <Button type="submit" className="gap-2 shrink-0">
                        <Bell className="h-4 w-4" />
                        Notify Me
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We'll send you an email when this product launches
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <p className="text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-2">
                      <Bell className="h-4 w-4" />
                      You'll be notified!
                    </p>
                  </motion.div>
                )}

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 pt-6 border-t"
                >
                  <p className="text-sm text-muted-foreground">
                    In the meantime, explore our other amazing products
                  </p>
                  <Button
                    variant="link"
                    onClick={onClose}
                    className="mt-2"
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
