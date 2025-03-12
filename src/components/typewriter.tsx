import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

export default function Typewriter({
  texts,
  typingSpeed = 7,
  deletingSpeed = 5,
  pause = 2000,
}: TypewriterProps) {
  const [index, setIndex] = useState(0); // Tracks which text is displayed
  const [text, setText] = useState(""); // Displayed text
  const [isDeleting, setIsDeleting] = useState(false); // Whether deleting or typing

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const currentText = texts[index];

    if (!isDeleting && text.length < currentText.length) {
      // Typing effect
      timeout = setTimeout(
        () => setText(currentText.slice(0, text.length + 1)),
        typingSpeed
      );
    } else if (!isDeleting && text.length === currentText.length) {
      // Wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text.length > 0) {
      // Deleting effect
      timeout = setTimeout(
        () => setText(currentText.slice(0, text.length - 1)),
        deletingSpeed
      );
    } else {
      // Move to next text
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, texts, typingSpeed, deletingSpeed, pause]);

  return (
    <motion.p
      className="text-2xl md:text-6xl font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.p>
  );
}
