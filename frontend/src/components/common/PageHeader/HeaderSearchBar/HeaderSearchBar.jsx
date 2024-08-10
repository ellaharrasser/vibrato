import "./HeaderSearchBar.css";

function HeaderSearchBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("Search feature coming soon!");
  };
  return (
    <form id="header-search-bar" onSubmit={handleSubmit}>
      <input type="search" placeholder="Search for music gear..." />
    </form>
  );
}

export default HeaderSearchBar;
