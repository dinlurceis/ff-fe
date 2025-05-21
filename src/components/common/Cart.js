import { Link } from "react-router-dom"

export const Cart = ({role})=>{
    return (
        role && role.includes("USER") && (
            <div className="nav-item mx-2">
                <Link to="/cart" className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                   <i className="fa fa-shopping-cart"></i>
                </Link>
            </div>
        )
    );
}
export default Cart;