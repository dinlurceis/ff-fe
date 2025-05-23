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

  console.log(id);
  const fetchDishes = async () => {
    setLoading(true);
    try {
      const result = await getAllDish(1, 12, null, null);
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
  const steps = dish.recipe.split(".").filter((step) => step.trim());

  return (
    <div className="dish-detail-container">
      <div className="dish-detail-content">
        {/* Header Section */}
        <div className="dish-header">
          <h2>{dish.name}</h2>
          <div className="dish-meta">
            <span>
              <i className="fas fa-coins"></i>
              {"Thời gian nấu dự kiến: "}
              <i className="far fa-clock"></i> {dish.timeCook}
            </span>
            <span>
              <i className="fas fa-coins"></i>
              {"Giá dự kiến: "}
              {(dish.price * 1000)?.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="dish-main">
          {/* Left Column - Image */}
          <div className="dish-image">
            <img src={dish.dishImage} alt={dish.name} />
          </div>

          {/* Right Column - Info (description, ingredients, meta) */}
          <div className="dish-info">
            {/* Description */}
            <section className="dish-section">
              <h3 className="lexe">Mô tả món ăn</h3>
              <div dangerouslySetInnerHTML={{ __html:dish.description }} />
            </section>

            <section className="dish-section">
              <h3 className="lexe">Danh mục món ăn</h3>
              <ul className="ingredients-list">
                {dish.dishCategory?.map((category, index) => (
                  <li key={index}>
                    <span className="ingredient-item">{category}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ingredients */}
            <section className="dish-section">
              <h3 className="lexe">Nguyên liệu</h3>
              <ul className="ingredients-list">
                {dish.dishIngredient?.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-item">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Full Width Recipe Section */}
        <div className="dish-recipe-full">
          <section className="dish-section">
            <h3 className="lexe">Cách làm</h3>
            <div className="recipe-content">
              {/* {steps.map((step, index) =>
                step.trim() ? (
                  <p key={index} className="recipe-step">
                    <span className="step-number">{index + 1}.</span>{" "}
                    <div dangerouslySetInnerHTML={{ __html:steps }} />
                  </p>
                ) : null
              )} */}
              <div dangerouslySetInnerHTML={{ __html:steps }} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
