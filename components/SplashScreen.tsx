"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);

      setTimeout(() => {
        onFinish();
      }, 700); // must match transition duration
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-[#A9883A] transition-all duration-700 ${
        animateOut ? "scale-150 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <Image
        src="/logobg.png"
        alt="Logo"
        width={220}
        height={220}
        priority
        className="animate-fadeIn"
      />
    </div>
  );
}
