import { useEffect, useRef, useState, type ReactNode } from "react";

export const AnimatedSection = ({
  children,
  animation,
}: {
  children: ReactNode;
  animation: "slide-in-bottom";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? animation : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};
