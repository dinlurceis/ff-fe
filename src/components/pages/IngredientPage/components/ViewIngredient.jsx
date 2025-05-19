/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";

export const ViewIngredient = ({ ingredients }) => {
  return (
    <div className="row" style={{ width: "100%" }}>
      {ingredients.length > 0 ? (
        ingredients.map((ingredient) => (
          <div
            className="col-lg-2 col-md-4 col-sm-6 pb-4"
            key={ingredient.ingredientId}
          >
            <Link
              className="ingredients-list-item"
              to={`/ingredient-detail/${ingredient.ingredientId}`}
            >
              <img
                className="img-fluid"
                src={ingredient.thumbnail}
                alt={ingredient.nameIngredient}
              />
              <div className="ingredients-info">
                <div className="ingredients-supplier">
                  <span>
                    <i className="fa fa-store mr-2"></i>
                    {ingredient.supplierName}
                  </span>
                </div>
                <div className="ingredients-title">
                  {ingredient.nameIngredient}
                </div>
                <div className="ingredient-price mt-2">
                  <strong>Giá: </strong>
                  <span className="ingredient-price-value">
                    {ingredient.priceIngredient.toLocaleString()} VND
                  </span>
                </div>
                <div className="ingredient-quantity">
                  <strong>Số lượng còn: </strong>
                  <span>{ingredient.quantity}</span>
                </div>
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
