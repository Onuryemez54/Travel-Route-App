import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".scroll");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 text-stone-200 p-3 rounded-full z-50 transition-opacity duration-300 hover:text-green-400 hover:bg-gray-700 bg-gray-800 shadow-lg hover:shadow-xl cursor-pointer
      ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <FaArrowCircleUp size={30} />
    </button>
  );
};
