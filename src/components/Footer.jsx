import React from 'react';
import { ChefHat, Instagram, Twitter, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-red-600 border-t border-orange-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white to-red-100 rounded-xl">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xl font-bold bg-white bg-clip-text text-transparent">
                MealMatch
              </span>
            </div>
            <p className="text-sm text-white text-center md:text-left max-w-xs">
              Discover, create, and share amazing recipes for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center items-center">
            <div className="flex gap-2 text-sm">
              {['Dashboard', 'Mealmatch', 'Favourites', 'About'].map((link, index) => (
                <a
                  key={index}
                  href={`/${link.toLowerCase()}`}
                  className="text-white hover:text-gray-400 transition-colors duration-200 font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
                { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-500' },
                { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 text-white ${social.color} transition-all duration-200 hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-white text-center md:text-right">
              © {new Date().getFullYear()} MealMatch. Made with{' '}
              <Heart className="w-3 h-3 inline text-white" /> for food lovers.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;