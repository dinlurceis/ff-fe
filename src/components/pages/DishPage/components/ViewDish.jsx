/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";

export const ViewDish = ({ dishes }) => {
  return (
    <div className="row" style={{ width: "100%" }}>
      {dishes.length > 0 ? (
        dishes.map((dish) => (
          <div
            className="col-lg-2 col-md-4 col-sm-6 pb-4"
            key={dish.dishId}
          >
            <Link
              className="ingredients-list-item"
              to={`/dish-detail/${dish.dishId}`}
            >
              <img
                className="img-fluid"
                src={dish.dishImage}
                alt={dish.name}
              />
              <div className="ingredients-info">
                <div className="dishes-title">
                  {dish.namedish}
                </div>
                {/* <div className="dish-price mt-2">
                  <strong>Giá: </strong>
                  <span className="dish-price-value">
                    {dish.pricedish.toLocaleString()} VND
                  </span>
                </div>
                <div className="dish-quantity">
                  <strong>Số lượng còn: </strong>
                  <span>{dish.quantity}</span>
                </div> */}
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center pt-5">
          <h4>Không tìm thấy nguyên liệu phù hợp.</h4>
          <p>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm các danh mục khác!</p>
        </div>
      )}
    </div>
  );
};
