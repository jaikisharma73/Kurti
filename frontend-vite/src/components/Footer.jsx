import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (

    <footer className="relative w-full bg-white border-t border-neutral-200 mt-24 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">

        <h1
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            uppercase
            whitespace-nowrap
            text-black/[0.035]
            leading-none
            select-none
            text-[13vw]
          "
          style={{
            letterSpacing: '0.05em',
            transform: 'translate(-50%, -50%)',
          }}
        >
          ZORRYFASH
        </h1>

      </div>

      <div className="relative z-10 px-[10px] sm:px-[10px] py-16 sm:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20">

          <div>

            <img
              src={assets.logo}
              alt="ZorryFash"
              className="w-36 mb-8"
            />

            <p className="text-neutral-600 text-sm leading-[2] max-w-sm">
              ZorryFash blends elevated essentials with modern luxury streetwear.
              Timeless silhouettes, premium fabrics, and fashion designed for
              everyday confidence.
            </p>

            <div className="flex items-center gap-3 mt-8 flex-nowrap">

              <a
                href="#"
                className="text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[2px] text-black hover:opacity-50 transition duration-300 whitespace-nowrap"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[2px] text-black hover:opacity-50 transition duration-300 whitespace-nowrap"
              >
                Twitter
              </a>

              <a
                href="#"
                className="text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[2px] text-black hover:opacity-50 transition duration-300 whitespace-nowrap"
              >
                Pinterest
              </a>

            </div>

          </div>

          <div>

            <p className="text-black text-sm tracking-[4px] uppercase mb-8">
              Shop
            </p>

            <div className="flex flex-col gap-5 text-sm text-neutral-600">

              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Home
              </Link>

              <Link
                to="/collection"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Collection
              </Link>

              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Contact
              </Link>

            </div>

          </div>

          <div>

            <p className="text-black text-sm tracking-[4px] uppercase mb-8">
              Support
            </p>

            <div className="flex flex-col gap-5 text-sm text-neutral-600">

              <Link
                to="/orders"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Track Order
              </Link>

              <Link
                to="/shipping"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Shipping
              </Link>

              <Link
                to="/returns"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Returns
              </Link>

              <Link
                to="/size-guide"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-black transition duration-300"
              >
                Size Guide
              </Link>

            </div>

          </div>

          <div>

            <p className="text-black text-sm tracking-[4px] uppercase mb-8">
              Contact
            </p>

            <div className="flex flex-col gap-5 text-sm text-neutral-600 leading-relaxed">

              <p>Gorakhpur, India</p>

              <a
                href="mailto:contact@zorryfash.com"
                className="hover:text-black transition duration-300 break-all"
              >
                contact@zorryfash.com
              </a>

              <a
                href="tel:+917379185718"
                className="hover:text-black transition duration-300"
              >
                +91 7379185718
              </a>

            </div>

          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">

          <p className="text-[11px] sm:text-xs tracking-[3px] uppercase text-neutral-500 text-center sm:text-left">
            © 2026 ZorryFash — All Rights Reserved
          </p>

          <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center text-[11px] sm:text-xs uppercase tracking-[3px] text-neutral-500">

            <Link
              to="/privacy-policy"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-black transition duration-300"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-black transition duration-300"
            >
              Terms
            </Link>

            <Link
              to="/refund"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-black transition duration-300"
            >
              Refunds
            </Link>

          </div>

        </div>

      </div>

    </footer>

  )
}

export default Footer