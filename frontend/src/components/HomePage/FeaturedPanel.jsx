import { NavLink } from "react-router-dom";

function FeaturedPanel() {
  return (
    <div className="container w-fit mx-auto p-6 text-center rounded-lg bg-[linear-gradient(10deg,_#fed7aa,_#fcd34d)]">
      <h2 className="w-auto h-auto text-3xl lg:text-4xl mb-3">
        Find or sell music gear easily with <strong>vibrato</strong>.
      </h2>
      <NavLink
        to="/products"
        className="inline-block w-auto px-4 py-2 rounded-full text-xl lg:text-2xl font-semibold text-amber-50 bg-stone-800 transition-colors hover:bg-stone-700"
      >
        Explore Products
      </NavLink>
    </div>
  );
}

export default FeaturedPanel;
