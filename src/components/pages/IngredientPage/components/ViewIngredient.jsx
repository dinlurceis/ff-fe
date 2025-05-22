import { Link } from "react-router-dom";
import "../../DishPage/components/DishPage.css"; // dùng chung CSS như ViewDish

export const ViewIngredient = ({ ingredients }) => {
  return (
    <div className="view-dish-container">
      {ingredients && ingredients.length > 0 ? (
        ingredients.map((ingredient) => (
          <div className="dish-card" key={ingredient.id}>
            <Link
              className="dish-link"
              to={`/ingredient-detail/${ingredient.id}`}
            >
              <img
                className="dish-image"
                src={ingredient.ingredientUrl}
                alt={ingredient.nameIngredient}
              />
              <div className="dish-info">
                <div className="dish-name">{ingredient.nameIngredient}</div>
                <div className="dish-meta">
                  <div className="price-ingre">
                    {ingredient.priceIngredient.toLocaleString()} VND
                  </div>
                  <div>
                    <strong className="info-ingre">Người đăng tải:</strong>
                    <i className="fa fa-store mr-2"></i>
                    {ingredient.supplierName}
                  </div>
                  <div>
                    <strong className="info-ingre">Còn lại:</strong> {ingredient.stock}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="no-results">
          <h4>Không tìm thấy nguyên liệu phù hợp.</h4>
        </div>
      )}
    </div>
  );
};
