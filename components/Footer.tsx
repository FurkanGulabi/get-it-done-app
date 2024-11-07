import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col p-6 gap-6 container mx-auto transition-all duration-300 ease-in-out">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full">
        {/* Left Section (Logo & Social) */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-foreground">GetItDone</h1>
          <p className="text-muted-foreground">Follow us on</p>
          <div className="flex flex-row gap-4 items-center">
            <Link
              href="https://www.facebook.com"
              className="text-muted-foreground hover:text-blue-600 transition-all duration-300"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://www.twitter.com"
              className="text-muted-foreground hover:text-blue-400 transition-all duration-300"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://www.instagram.com"
              className="text-muted-foreground hover:text-pink-500 transition-all duration-300"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com"
              className="text-muted-foreground hover:text-blue-700 transition-all duration-300"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Right Section (Links) */}
        <div className="flex flex-col gap-4 mt-6 md:mt-0">
          <Link
            className="text-muted-foreground hover:text-foreground/90 transition-all duration-300"
            href={"/terms-of-service"}
          >
            Terms of Service
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground/90 transition-all duration-300"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground/90 transition-all duration-300"
            href={"/contact"}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-muted-foreground/40" />

      {/* Bottom Section (Copyright) */}
      <p className="text-center text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} GetItDone. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
