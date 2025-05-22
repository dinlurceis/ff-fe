import { Link } from "react-router-dom";
import "./DishPage.css"; // import file CSS

export const ViewDish = ({ dishes }) => {
  return (
    <div className="view-dish-container">
      {dishes && dishes.length > 0 ? (
        dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <Link className="dish-link" to={`/dish-detail/${dish.id}`}>
              <img className="dish-image" src={dish.dishImage} alt={dish.name} />
              <div className="dish-info">
                <div className="dish-name">{dish.name}</div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="no-results">
          <h4>Không tìm thấy món ăn phù hợp.</h4>
        </div>
      )}
    </div>
  );
};
