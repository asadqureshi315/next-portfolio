"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="back-button-container"
    >
      <a href="/" className="back-button" aria-label="Back to home">
        <ArrowLeft size={24} />
      </a>

      <style jsx>{`
        .back-button-container {
          display: flex;
          align-items: center;
        }

        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: var(--white);
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(141, 240, 204, 0.2);
          color: var(--hue-6);
          transform: translateX(-3px);
        }

        @media (max-width: 768px) {
          .back-button {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 576px) {
          .back-button {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </motion.div>
  );
}
