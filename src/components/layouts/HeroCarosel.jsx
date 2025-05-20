// HeroSlider.jsx
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
export const HeroSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="container-fluid">
      <Slider
        {...settings}
        style={{
          marginTop: "170px",
          height: "280px",
          width: "1480px",
          color: "#fff",
          marginBottom: "100px",
        }}
      >
        {/* Slide 1 */}
        <div className="single-slide bg-image-1">
          <div className="container">
            <div className="home-content text-center">
              <div className="row justify-content-end">
                <div className="col-lg-6" style={{ marginTop: "60px" }}>
                  <h1>Thiếu nguyên liệu nấu ăn</h1>
                  <Link
                    to="/ingredient"
                    className="btn btn-yellow"
                    style={{ background: "#FFCC00" }}
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="bg-image-2">
          <div className="container">
            <div className="home-content text-center">
              <div className="row justify-content-start">
                <div className="col-lg-6" style={{ marginTop: "50px" }}>
                  <h1>I love this idea!</h1>
                  <h2>Tìm kiếm công thức nấu ăn</h2>
                  <Link
                    to="/dish"
                    className="btn btn-yellow"
                    style={{ background: "#FFCC00" }}
                  >
                    Xem ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default HeroSlider;
