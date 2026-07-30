import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <>
      <Navbar />

      <Hero search={search} setSearch={setSearch} />

      <Categories setCategory={setCategory} />

      <FeaturedProducts
        search={search}
        category={category}
        sort={sort}
        setSort={setSort}
      />

      <HowItWorks />
      <Features />
    </>
  );
}

export default Home;
