import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, food_list } = useContext(StoreContext);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredFoods = searchValue
    ? food_list.filter((food) =>
        food.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => setShowSearch((prev) => !prev)}
        />
        {showSearch && (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search..."
              className="navbar-search-input"
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
            {searchValue && filteredFoods.length > 0 && (
              <div
                className="navbar-search-dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "white",
                  zIndex: 10,
                  border: "1px solid #eee",
                  borderRadius: 4,
                }}
              >
                {filteredFoods.map((food) => (
                  <div
                    key={food._id}
                    className="navbar-search-result"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                    onMouseDown={() => {
                      setSearchValue(food.name);
                      setShowSearch(false);
                    }}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      style={{
                        width: 28,
                        height: 28,
                        marginRight: 8,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <span>{food.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {user ? (
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
