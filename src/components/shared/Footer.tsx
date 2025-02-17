import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import P from "./Typography/P";
import Button from "./Button/Button";
import H2 from "./Typography/H2";
import H3 from "./Typography/H3";

const Footer = () => {
  return (
    <footer className="bg-color1-800 text-whiteFont-500 py-10">
      <div className="container mx-auto px-6 sm:px-10 max-w-screen-xl">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <H2 className="md:text-xl text-whiteFont-500 font-semibold mb-4">
              Holidaze
            </H2>

            <P className="text-gray-400 text-sm">
              Your gateway to amazing venues. Book your next adventure with
              confidence and ease.
            </P>
          </div>

          {/* Quick Links */}
          <div>
            <H3 className="text-lg text-whiteFont-500 font-semibold mb-4">
              Quick Links
            </H3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/venues"
                  className="text-gray-400 hover:text-white transition"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <H3 className="text-lg text-whiteFont-500 font-semibold mb-4">
              Follow Us
            </H3>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <H3 className="text-lg text-whiteFont-500 font-semibold mb-4">
              Subscribe to our Newsletter
            </H3>
            <form className="flex flex-col space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-color1-700 text-whiteFont-500 placeholder-whiteFont-600  focus:ring-2 focus:ring-color1-500 focus:outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-color1-300"
                  />
                </div>
              </div>
              <Button
                type="submit"
                buttonType="violet"
                className="bg-color3-400"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </div>
      </div>
      <P className="text-center text-gray-400 text-sm mt-4">
        Holidaze is a fictional company. This website and it’s content is a
        project for Noroff, created by Kine Odden Nystuen.
      </P>
    </footer>
  );
};

export default Footer;
