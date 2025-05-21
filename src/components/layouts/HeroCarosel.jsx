// HeroSlider.jsx
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./layouts.css";
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
          marginTop: "130px",
          height: "280px",
          width: "100%",
          color: "#fff",
          marginBottom: "70px",
        }}
      >
        {/* Slide 1 */}
        <div className="single-slide bg-image-1">
          <div className="container">
            <div className="home-content text-center">
              <div className="row justify-content-end">
                <div className="col-lg-6 " style={{ marginTop: "40px" }}>
                  <h1 className="script">Thiếu nguyên liệu nấu ăn?</h1>
                  <Link to="/ingredient" className="button-hero">
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
                <div className="col-lg-6" style={{ marginTop: "40px" }}>
                  <h1 className="script">Không biết phải nấu món gì?</h1>
                  <Link to="/dish" className="button-hero">
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
