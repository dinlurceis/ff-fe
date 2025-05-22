"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getIngredientByKeyword2 } from "../../../service/IngredientService";
import { SearchDish } from "../../../service/DishService";
import { Link } from "react-router-dom";
import "./HomePage.css";
import dish1 from "../../../img/mon1.jpg";
import dish2 from "../../../img/mon2.jpg";
import dish3 from "../../../img/mon3.jpg";
import ing1 from "../../../img/nguyenlieu1.jpg";
import ing2 from "../../../img/nguyenlieu2.jpg";
import ing3 from "../../../img/nguyenlieu3.jpg";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [matchedDishes, setMatchedDishes] = useState([]);
  const [showDishes, setShowDishes] = useState(false);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = "Home";
  }, []);

  // Fetch ingredients based on search term
  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      const result = await getIngredientByKeyword2(searchTerm);

      if (result && result.result) {
        setFilteredIngredients(result.result || []);
      } else {
        setFilteredIngredients([]);
      }
      console.log(filteredIngredients);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
      setFilteredIngredients([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchIngredients();
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fetch ingredients when search term, page, or page size changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchIngredients();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Modify the addIngredient function to ensure it properly updates state:
  const addIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.some(
        (item) => item.ingredientId === ingredient.ingredientId
      )
        ? selectedIngredients
        : [...selectedIngredients, ingredient]
    );
  };

  // Remove ingredient from selected list
  const removeIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (item) => item.ingredientId !== ingredient.ingredientId
      )
    );
  };

  // Find matching dishes based on selected ingredients
  const findMatchingDishes = async () => {
    try {
      const ingredientNames = selectedIngredients.map(
        (ingredient) => ingredient.name
      );
      const x = "keyword:" + ingredientNames.join(",");
      const result = await SearchDish(1, 5, null, [x]);
      if (result && result.result) {
        setMatchedDishes(result.result.items || []);
      } else {
        setMatchedDishes([]);
      }
      setShowDishes(true);
    } catch (error) {
      console.error("Error finding dishes:", error);
      setMatchedDishes([]);
      setShowDishes(true);
    }
  };

  // Reset dishes view
  const resetDishes = () => {
    setShowDishes(false);
    setMatchedDishes([]);
  };

  return (
    <div className="container-home">
      <div className="header-home">
        <div className="title-with-line">
          <h1 className="title">TẠO MÓN ĂN</h1>
          <div className="line-decor"></div>
        </div>
        <div className="description-with-line">
          <div className="line-decor"></div>
          <h2 className="description">TỪ NGUYÊN LIỆU CÓ SẴN TRONG TỦ LẠNH</h2>
        </div>
      </div>
      <h3 className="title-brand">fridgefeast</h3>
      <section className="gallery-section">
        <div className="gallery-title-wrapper">
          <div className="line-decor"></div>
          <h2 className="gallery-title">NGUYÊN LIỆU MỚI MỖI NGÀY</h2>
          <div className="line-decor"></div>
        </div>
        <div className="image-grid">
          <img src={ing1 || "/placeholder.svg"} alt="Bổ dưỡng" />
          <img src={ing2 || "/placeholder.svg"} alt="Đậm đà" />
          <img src={ing3 || "/placeholder.svg"} alt="Ngon" />
        </div>
      </section>
      <h3 className="text-do">
        hãy chọn những nguyên liệu có trong tủ lạnh của bạn
      </h3>
      <div className="main-content-home">
        {/* Left Side - Ingredient Selection and Recipe Results */}
        <div className="left-side">
          <div className="selection-panel">
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm nguyên liệu..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="selected-ingredients scroll">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="selected-item">
                    <span>{ingredient.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-message">Chưa chọn nguyên liệu nào</div>
              )}
            </div>
          </div>

          <div className="dish-panel">
            <button
              className="create-button"
              onClick={showDishes ? resetDishes : findMatchingDishes}
              disabled={selectedIngredients.length === 0}
            >
              {showDishes ? "Tìm món khác" : "Tạo món ăn"}
            </button>

            <div className="dishes-container scroll">
              {showDishes ? (
                matchedDishes.length > 0 ? (
                  matchedDishes.map((dish, index) => (
                    <div key={dish.id} className="dish-item">
                      <span>
                        Món {index + 1}: {dish.name}
                      </span>
                      <Link
                        className="choose-btn"
                        to={`/dish-detail/${dish.id}`}
                      >
                        Chọn
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="empty-message">
                    Không tìm thấy món ăn nào với nguyên liệu đã chọn
                  </div>
                )
              ) : (
                <div className="empty-message">
                  Chọn nguyên liệu và nhấn "Tạo món ăn" để tìm kiếm
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Ingredients Grid */}
        <div className="right-side">
          <div className="ingredients-grid">
            {isLoading ? (
              <div className="loading">Đang tải...</div>
            ) : filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredient-card">
                  <div className="ingredient-image">
                    <img
                      src={ingredient.ingredientImage}
                      alt={ingredient.name}
                    />
                  </div>
                  <span className="ingredient-name">{ingredient.name}</span>
                  <button
                    className="add-btn"
                    onClick={() => addIngredient(ingredient)}
                  >
                    Thêm
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">Không tìm thấy nguyên liệu</div>
            )}
          </div>
        </div>
      </div>
      <section className="gallery-section">
        <div className="gallery-title-wrapper">
          <div className="line-decor"></div>
          <h2 className="gallery-title">THƯỞNG THỨC MÓN NGON MỖI NGÀY</h2>
          <div className="line-decor"></div>
        </div>
        <div className="image-grid">
          <img src={dish1 || "/placeholder.svg"} alt="Bổ dưỡng" />
          <img src={dish2 || "/placeholder.svg"} alt="Đậm đà" />
          <img src={dish3 || "/placeholder.svg"} alt="Ngon" />
        </div>
      </section>
      <section className="about-us">
        <div className="about-title">
          <div className="line-decor"></div>
          <h2 className="about-heading">Về Chúng Tôi</h2>
        </div>
        <p className="about-description">
          Ẩm thực là cái nôi của tình thương, hi vọng qua dự án này, FridgeFeast
          sẽ hỗ trợ cộng đồng, khơi gợi nguồn cảm hứng, đam mê sáng tạo món ăn
          từ những nguyên liệu đơn giản nhất trong căn bếp của bạn. FridgeFeast
          hứa hẹn mang đến trải nghiệm nấu ăn thú vị, tiết kiệm và đầy cảm hứng
          mỗi ngày.
          <br />
          FridgeFeast
        </p>
      </section>
    </div>
  );
};
