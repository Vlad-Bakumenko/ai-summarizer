import { useState, useEffect, useRef } from "react";
import { TYPING_INTERVAL_MS } from "../constants";

const useTypingEffect = (text) => {
  const [typedText, setTypedText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    setTypedText("");
  }, [text]);

  useEffect(() => {
    if (!text) return;
    if (typedText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setTypedText((prev) => prev + text[prev.length]);
    }, TYPING_INTERVAL_MS);

    return () => clearTimeout(timeout);
  }, [text, typedText]);

  useEffect(() => {
    if (typedText && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [typedText]);

  return { typedText, endRef };
};

export default useTypingEffect;
