import "./globals.css";
import ShopContextProvider from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Chatbot from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

export const metadata = {
  title: {
    default: "ZorryFash | Premium & Luxury Fashion",
    template: "%s | ZorryFash"
  },
  description: "Explore designer ethnic wear, handpicked Kurtis, sarees, and modern fusion clothing at ZorryFash. High quality products with free shipping and cash on delivery.",
  keywords: ["Kurti", "Saree", "Indian wear", "Ethnic wear", "Women fashion", "Men streetwear", "ZorryFash"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zorryfash.com",
    siteName: "ZorryFash",
    title: "ZorryFash | Premium & Luxury Fashion",
    description: "Shop designer ethnic wear, handpicked Kurtis, sarees, and modern fusion clothing at ZorryFash.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-neutral-900 min-h-screen flex flex-col">
        <ShopContextProvider>
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-grow">
            <ScrollToTop />
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar />
            <SearchBar />
            <main>
              {children}
            </main>
            <Footer />
            <Chatbot />
          </div>
        </ShopContextProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
