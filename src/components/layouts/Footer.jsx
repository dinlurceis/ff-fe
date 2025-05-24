import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div>
            <div className="container-fluid position-relative bg-dark text-white-50 py-1" style={{marginTop:'90px'}}>
                <div className="container mt-5 pt-3">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <Link to="/books" className="navbar-brand">
                                <h1 className="mt-n2 text-uppercase text-white">
                                    <i className="fa fa-book mr-3"></i> FridgeFeast
                                </h1>
                            </Link>
                            <p className="m-0">
                                Tìm kiếm công thức nấu ăn từ những nguyên liệu có sẵn trong tủ lạnh của bạn.
                                <br/>Mua những nguyên liệu còn thiếu.
                                <br/>Dễ dàng tra cứu công thức nấu ăn.
                            </p>
                        </div>
                        <div className="col-md-6 mb-5">
                            <h3 className="text-white mb-4">News letter</h3>
                            <div className="input-group">
                                <input 
                                    type="text"
                                    className="form-control border-light"
                                    style={{padding: '30px'}}
                                    placeholder="Your Email Address"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <h3 className="text-white mb-4">Get In Touch</h3>
                            <p><i className="fa fa-map-marker mr-2"></i>Thôn Hoành Quan,xã Thụy Liên,huyện Thái Thụy,tỉnh Thái Bình</p>
                            <p><i className="fa fa-phone mr-2"></i>+084 0379 489 012</p>
                            <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                            <div className="d-flex justify-content-start mt-4">
                                <Link className="text-white mr-4" to="/"><i className="fa fa-twitter fa-2x"></i></Link>
                                <Link className="text-white mr-4" to="/"><i className="fa fa-facebook fa-2x"></i></Link>
                                <Link className="text-white mr-4" to="/"><i className="fa fa-linkedin fa-2x"></i></Link>
                                <Link className="text-white" to="/"><i className="fa fa-instagram fa-2x"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h3 className="text-white mb-4">Khám phá các nguyên liệu</h3>
                            <div className="d-flex flex-column">
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Thực phẩm từ sữa</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Thịt</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Rau củ quả</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Bột</Link>
                                <Link className="text-white-50" to="/"><i className="fa fa-angle-right mr-2"></i>Gia vị</Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <div className="d-flex flex-column">
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Privacy Policy</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Terms & Condition</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Regular FAQs</Link>
                                <Link className="text-white-50 mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Help & Support</Link>
                                <Link className="text-white-50" to="/"><i className="fa fa-angle-right mr-2"></i>Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white-50 border-top py-4" style={{borderColor: 'rgba(256,256,256,0.1)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <p className="m-0">
                                Copyright &copy;
                                <Link className="text-white" to="/"> FridgeFeast</Link>. All Rights Reserved
                            </p>
                        </div>
                        {/* <div className="col-md-6 text-center text-md-right">
                            <p className="m-0">Designed by <a className="text-white" href="https://htmlcodex.com">Tiến Thịnh</a></p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div style={{ position: "fixed", right: "10px", bottom: "30px", zIndex: 1000 }}>
            {/* Nút chat */}
            <button
                className="btn btn-primary rounded-circle"
                style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                marginBottom: "15px", // Khoảng cách giữa 2 nút
                }}
                onClick={() => {
                const event = new CustomEvent("toggleChatPopup");
                window.dispatchEvent(event);
                }}
            >
                💬
            </button>

            {/* Nút back to top */}
            <Link
                to="/"
                className="btn btn-primary rounded-circle" // Đổi từ rounded-0 thành rounded-circle
                style={{
                // color:"#4a4df0",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
            >
                <i className="fa fa-angle-double-up"></i>
            </Link>
            </div>

        </div>
    )
}