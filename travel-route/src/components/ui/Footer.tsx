import { FaLinkedin } from "react-icons/fa";
import {
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

export const Footer = () => {
  return (
    <footer className="py-8 mt-8 bg-gray-900 text-stone-200">
      <div className="grid max-w-4xl grid-cols-1 gap-6 px-4 mx-auto md:grid-cols-3">
        <div className="flex items-center gap-3">
          <img src="/travel-route.png" className="h-10 rounded-full" />
          <div>
            <h2 className="mb-2 text-lg font-bold">Travel Route</h2>
            <p className="text-sm">
              Building beautiful web experiences with React and Tailwind CSS.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="mb-2 font-semibold">Contact</h3>

          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:onuryemez.is@gmail.com"
              className="text-green-400 hover:underline"
            >
              onuryemez.is@gmail.com
            </a>
          </p>

          <p className="text-sm">
            Phone:{" "}
            <a
              href="tel:+905375582845"
              className="text-green-400 hover:underline"
            >
              +90 537 558 28 45
            </a>
          </p>

          <p className="text-sm">Address: Sakarya, Turkey</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 ml-5 lg:flex-nowrap">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <FaSquareXTwitter />
            <span>Twitter</span>
          </a>
          <a
            href="https://github.com/Onuryemez54"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <FaSquareGithub />
            <span>Github</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <ImFacebook2 />
            <span>Facebook</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <FaSquareInstagram />
            <span>Instagram</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <FaLinkedin />
            <span>Linkedin</span>
          </a>
        </div>
      </div>

      <div className="mt-8 text-xs text-center text-gray-500">
        © 2025 Travel Route Designed by {"Onur Yemez"}. All rights reserved
      </div>
    </footer>
  );
};
