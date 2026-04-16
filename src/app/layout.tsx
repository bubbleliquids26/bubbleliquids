import type { Metadata } from "next";
import "../index.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import PromotionalPopup from "@/components/PromotionalPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Bubble Liquid — Premium Cleaning Solutions",
  description: "Premium liquid cleaning solutions for everyday needs. Shop detergents, dishwash, floor cleaners and more.",
  openGraph: {
    title: "Bubble Liquid — Premium Cleaning Solutions",
    description: "Premium liquid cleaning solutions for everyday needs.",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FloatingBubbles />
          <PromotionalPopup />
          <WhatsAppButton />
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
