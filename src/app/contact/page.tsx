"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      title: "WhatsApp Us",
      description: "Chat with us instantly",
      value: "+91 98765 43210",
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      action: "Chat Now",
      href: "https://wa.me/919876543210?text=Hello%20Bubble%20Liquids!",
      color: "border-green-200 hover:border-green-500 hover:shadow-green-100",
    },
    {
      title: "Call Us",
      description: "Talk to our support team",
      value: "+91 98765 43210",
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      action: "Call Now",
      href: "tel:+919876543210",
      color: "border-blue-200 hover:border-blue-500 hover:shadow-blue-100",
    },
    {
      title: "Email Us",
      description: "Send us your queries",
      value: "bubbleliquids26@gmail.com",
      icon: <Mail className="w-8 h-8 text-pink-500" />,
      action: "Send Email",
      href: "mailto:bubbleliquids26@gmail.com",
      color: "border-pink-200 hover:border-pink-500 hover:shadow-pink-100",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We're here to help! Whether you have questions about our premium cleaning solutions or need assistance with an order, feel free to reach out.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`flex flex-col items-center text-center p-8 rounded-3xl border-2 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${method.color} group relative overflow-hidden`}
            >
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0 opacity-50" />
              
              <div className="relative z-10 mb-6 p-5 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100">
                {method.icon}
              </div>
              
              <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
              <p className="relative z-10 text-gray-500 mb-6">{method.description}</p>
              
              <div className="relative z-10 text-lg font-semibold text-primary mb-8 bg-gray-50/80 px-6 py-3 rounded-xl w-full border border-gray-100">
                {method.value}
              </div>
              
              <div className="relative z-10 mt-auto flex items-center text-sm font-bold text-gray-600 group-hover:text-primary transition-colors">
                {method.action}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
