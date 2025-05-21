import { NavLink } from "react-router-dom";
import "../layouts/layouts.css";

export const NavigationMenu = ({ isActive, underlineRef }) => {
  return (
    <div className="navbar-nav mx-auto py-0 position-relative">
      <NavLink
        to="/"
        className={`lexend-peta nav-item nav-link rounded ${
          isActive("/home") ? "active" : ""
        }`}
      >
        <div class="lexend-peta">Home</div>
      </NavLink>
      <NavLink
        to="/about"
        className={`lexend-peta nav-item nav-link rounded ${
          isActive("/about") ? "active" : ""
        }`}
      >
        <div class="lexend-peta">About</div>
      </NavLink>
      <NavLink
        to="/ingredient"
        className={`lexend-peta nav-item nav-link rounded ${
          isActive("/ingredient") ? "active" : ""
        }`}
      >
        <div class="lexend-peta">Nguyên liệu</div>
      </NavLink>
      <NavLink
        to="/dish"
        className={`nav-item nav-link rounded ${
          isActive("/dish") ? "active" : ""
        }`}
      >
        <div class="lexend-peta">Món ăn</div>
      </NavLink>
      <NavLink
        to="/contact"
        className={`nav-item nav-link rounded ${
          isActive("/contact") ? "active" : ""
        }`}
      >
        <div class="lexend-peta">Liên hệ</div>
      </NavLink>
      <div className="underline" ref={underlineRef}></div>
    </div>
  );
};
