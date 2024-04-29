import React from "react";
import CrimeSection from "./Section/CrimeSection";
import EconomicSeection from "./Section/EconomicSeection";
import Politics from "./Section/Politics";
import CinemaSection from "./Section/CinemaSection";
import Sportsection from "./Section/Sportsection";
import Worldnews from "./Section/Worldnews";
import Footer from "./Footer";

const AllNews = () => {
  return (
    <>
      <CrimeSection />
      <EconomicSeection />
      <Politics />
      <CinemaSection />
      <Sportsection />
      <Footer />
    </>
  );
};

export default AllNews;
