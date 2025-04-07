import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  textToType: string;
  onTextComplete?: () => void;
  className?: string;
}

interface TypingAnimationProps {
  texts: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({
  textToType,
  onTextComplete,
  className,
}) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setText(textToType.substring(0, currentIndex));
        currentIndex++;
        if (currentIndex > textToType.length) {
          clearInterval(typingInterval);
          setTimeout(startWiping, 1000);
        }
      }, 100);
    };

    const startWiping = () => {
      currentIndex = 0;
      typingInterval = setInterval(() => {
        setText(textToType.substring(0, textToType.length - currentIndex));
        currentIndex++;
        if (currentIndex > textToType.length) {
          clearInterval(typingInterval);
          setText("");
          currentIndex = 0;
          onTextComplete && onTextComplete();
        }
      }, 100);
    };

    startTyping();

    return () => clearInterval(typingInterval);
  }, [textToType, onTextComplete]);

  return (
    <motion.div
      className={`${className} inline-block`}
      animate={{ width: "100%" }}
      transition={{ duration: 1 }}
    >
      {text}
    </motion.div>
  );
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ texts }) => {
  const [textIndex, setTextIndex] = useState<number>(0);

  const handleTextComplete = () => {
    console.log(textIndex, texts.length);
    if (textIndex >= texts.length - 1) setTextIndex(0);
    if (textIndex < texts.length - 1) {
      setTextIndex(textIndex + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80px] md:h-[70px] mb-4 text-white">
      <Typewriter
        textToType={texts[textIndex]}
        onTextComplete={handleTextComplete}
        className="text-6xl font-bold text-white"
      />
    </div>
  );
};

export default TypingAnimation;
