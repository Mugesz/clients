import React from "react";
import CrimeSection from "./Section/CrimeSection";
import EconomicSeection from "./Section/EconomicSeection";
import Politics from "./Section/Politics";
import CinemaSection from "./Section/CinemaSection";

import Footer from "./Footer";
import ThreeDBackground from "./ThreeDBackground";


const AllNews = () => {
  return (
    <>
      <ThreeDBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CrimeSection />
        <EconomicSeection />
        <Politics />
        <CinemaSection />
        <Footer />
      </div>
    </>
  );
};

export default AllNews;
