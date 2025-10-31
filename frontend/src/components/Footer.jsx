import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-5 sm:px-10 md:px-20 xl:px-30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h2 className="text-lg font-semibold text-white">BookIt</h2>

        <p className="text-sm mt-2 sm:mt-0">
          © {new Date().getFullYear()} BookIt. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 sm:mt-0">
          <a
            href="#"
            className="hover:text-yellow-400 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-yellow-400 transition-colors text-sm"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-yellow-400 transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
