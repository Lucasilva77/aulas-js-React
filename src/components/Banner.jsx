import React, { useState, useEffect } from "react";
import "../styles/Banner.css";

const banners = [
  "/banners/banner 1.png",
  "/banners/banner 2.png",
  "/banners/banner 3.png"
];

function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <img src={banners[index]} alt="Banner" className="banner-image" />

      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;