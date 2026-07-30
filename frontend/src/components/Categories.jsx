import "./Categories.css";

import books from "../assets/categories/books.png";
import electronics from "../assets/categories/electronics.png";
import stationery from "../assets/categories/stationery.png";
import hostel from "../assets/categories/hostel.png";
import calculators from "../assets/categories/calculators.png";
import notes from "../assets/categories/notes.png";

function Categories({ category, setCategory }) {
  const categories = [
    {
      title: "Books",
      image: books,
      products: "120+ Products",
    },
    {
      title: "Electronics",
      image: electronics,
      products: "85+ Products",
    },
    {
      title: "Stationery",
      image: stationery,
      products: "60+ Products",
    },
    {
      title: "Hostel Essentials",
      image: hostel,
      products: "40+ Products",
    },
    {
      title: "Calculators",
      image: calculators,
      products: "25+ Products",
    },
    {
      title: "Notes",
      image: notes,
      products: "100+ Products",
    },
  ];

  return (
    <section id="categories" className="categories">
      <div className="categories-heading">
        <h2>Browse Categories</h2>
        <p>Everything you need around your campus.</p>

        <button className="all-category-btn" onClick={() => setCategory("")}>
          All Categories
        </button>
      </div>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`category-card ${
              category === item.title ? "active" : ""
            }`}
            onClick={() => setCategory(item.title)}
          >
            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

            <span>{item.products}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
