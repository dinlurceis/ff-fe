import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDish, getDishById } from "../../../service/DishService";
import "./DishDetail.css";

export const DishDetail = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const { id } = useParams();
  const [dish, setDish] = useState(null); //thông tin chi tiết về Dish
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const result = await getAllDish(1, 12);
      if (result && result.result) {
        setDishes(result.result.items);
      } else {
        setDishes([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(dishes);
  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    document.title = "Món ăn";
  });

  useEffect(() => {
    getDishById(id)
      .then((data) => {
        setDish(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  //thông tin comment
  // useEffect(() => {
  //   getCommentByDish(id)
  //     .then((data) => {
  //       const updatedComments = data.result.items.map((comment) => ({
  //         ...comment,
  //         replying: false, //khó hiểu + nghi ngờ
  //         replies: comment.replies || [],
  //       }));
  //       setComments(updatedComments);
  //     })
  //     .catch((error) => console.log(error));
  // }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!dish) {
    return <div>Dish data is not available</div>;
  }

  return (
    <div className="dish-detail-container">
      <div className="dish-detail-content">
        {/* Header Section */}
        <div className="dish-header">
          <h2>{dish.name}</h2>
          <div className="dish-meta">
            <span>
              <i className="far fa-clock"></i> {dish.timeCook} phút
            </span>
            <span>
              <i className="fas fa-coins"></i>{" "}
              {dish.price?.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="dish-main">
          {/* Left Column - Image */}
          <div className="dish-image">
            <img src={dish.dishImage} alt={dish.name} />
          </div>

          {/* Right Column - Details */}
          <div className="dish-info">
            {/* Description */}
            <section className="dish-section">
              <h3>Mô tả món ăn</h3>
              <p>{dish.description}</p>
            </section>

            {/* Ingredients */}
            <section className="dish-section">
              <h3>Nguyên liệu</h3>
              <ul className="ingredients-list">
                {dish.dishIngredient?.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-item">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recipe */}
            <section className="dish-section">
              <h3>Cách làm</h3>
              <div className="recipe-content">
                {dish.recipe?.split("\n").map((step, index) => (
                  <p key={index} className="recipe-step">
                    <span className="step-number">{index + 1}.</span> {step}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
