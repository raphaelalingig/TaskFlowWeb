import React, { useState } from "react";
import "../../App.css";
import image1 from "../../assets/Landingpage.jpg";
import image2 from "../../assets/pexels-fauxels-3183183.jpg";
import image3 from "../../assets/pexels-fauxels-3184418.jpg";
import image4 from "../../assets/pexels-fox-1595385.jpg";
import Header from "./Header";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
  };

  return (
    <div>
      <Header/>
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-80 overflow-hidden rounded-lg md:h-96">
          <img
            src={image1}
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
              currentSlide === 0 ? "" : "hidden"
            }`}
            alt=""
          />
          <img
            src={image2}
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
              currentSlide === 1 ? "" : "hidden"
            }`}
            alt=""
          />
          <img
            src={image3}
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
              currentSlide === 2 ? "" : "hidden"
            }`}
            alt=""
          />
          <img
            src={image4}
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
              currentSlide === 3 ? "" : "hidden"
            }`}
            alt=""
          />
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-black" : "bg-gray-500"
              }`}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div className="container-motto">
        <div className="motto-text mt-10">
          <h1 className="text-4xl font-bold">
            "Empower Your Productivity: Streamline Your Tasks with Ease."
          </h1>
        </div>
        <Link to="/dashboard">
        <button
          type="button"
          className="get-started mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          
        >
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
