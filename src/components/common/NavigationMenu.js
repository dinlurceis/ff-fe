import { NavLink } from 'react-router-dom';

export const NavigationMenu = ({isActive,underlineRef}) =>{
    return (
        <div className="navbar-nav mx-auto py-0 position-relative">
            <NavLink to="/" className={`nav-item nav-link rounded ${isActive('/home') ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={`nav-item nav-link rounded ${isActive('/about') ? 'active' : ''}`}>About</NavLink>
            <NavLink to="/ingredient" className={`nav-item nav-link rounded ${isActive('/courses') ? 'active' : ''}`}>Nguyên liệu</NavLink>
            <NavLink to="/dish" className={`nav-item nav-link rounded ${isActive('/comunity') ? 'active' : ''}`}>Món ăn</NavLink>
            <NavLink to="/contact" className={`nav-item nav-link rounded ${isActive('/contact') ? 'active' : ''}`}>Liên hệ</NavLink>
            <div className="underline" ref={underlineRef}></div>
        </div>
    )
}