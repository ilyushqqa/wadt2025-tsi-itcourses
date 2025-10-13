import { useEffect, useState } from "react";

export default function useCarousel(length, interval = 4500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval]);
  return [index, setIndex];
}

