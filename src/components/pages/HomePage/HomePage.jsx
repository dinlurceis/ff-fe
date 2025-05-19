"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import {
  getIngredientWithSortAndMultiFieldAndSearch,
  listAllIngredient,
} from "../../../service/IngredientService";
import { SearchDish } from "../../../service/DishService";
import "./HomePage.css";

export const HomePage = () => {
  const [listSearch, setListSearch] = React.useState("");
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [matchedDishes, setMatchedDishes] = React.useState([]);
  const [showDishes, setShowDishes] = React.useState(false);
  const [filteredIngredients, setFilteredIngredients] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);

  // Filter ingredients based on search term
  useEffect(() => {
    document.title = "Home";
  });

  const fetchIngredients = async () => {
    try {
      // const result = await getIngredientWithSortAndMultiFieldAndSearch(
      //   1,
      //   10,
      //   null,
      //   [listSearch]
      // );
      const result = await listAllIngredient();
      if (result && result.result) {
        setFilteredIngredients(result.result.items);
        // setTotalPages(result.result.totalPages);
      } else {
        setFilteredIngredients([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setPageSize(10);
  }, [listSearch]);

  useEffect(() => {
    fetchIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, null, listSearch]);

  // Handle ingredient selection
  const handleSelectIngredient = (ingredient) => {
    if (!selectedIngredients.some((item) => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Handle ingredient removal
  const handleRemoveIngredient = (id) => {
    setSelectedIngredients(
      selectedIngredients.filter((ingredient) => ingredient.id !== id)
    );
    if (showDishes) {
      findMatchingDishes(
        selectedIngredients.filter((ingredient) => ingredient.id !== id)
      );
    }
  };

  // Find Dishes that match selected ingredients
  const findMatchingDishes = () => {
    const ingredientNames = selectedIngredients.map(
      (ingredient) => ingredient.name
    );

    const matches = async () => {
      const result = await SearchDish(1, 10, null, ingredientNames);
      if (result && result.result) {
        return result.result.items;
      } else {
        return [];
      }
    };

    setMatchedDishes(matches);
    setShowDishes(true);
  };

  const removeIngredient = (ingredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item.id !== ingredientId)
    );
  };

  const resetDishes = () => {
    setShowDishes(false);
    setMatchedDishes([]);
  };

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.some((item) => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className="container-home">
      <div className="main-content-home">
        {/* Left Side - Ingredient Selection and Recipe Results */}
        <div className="left-side">
          <div className="selection-panel">
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm nguyên liệu..."
                className="search-input"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
              />
            </div>

            <div className="selected-ingredients">
              {selectedIngredients && selectedIngredients.map((ingredient) => (
                <div key={ingredient.id} className="selected-item">
                  <span>{ingredient.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {selectedIngredients.length === 0 && (
                <div className="empty-message">Chưa chọn nguyên liệu nào</div>
              )}
            </div>
          </div>

          <div className="recipe-panel">
            <button
              className="create-button"
              onClick={showDishes ? resetDishes : findMatchingDishes}
            >
              {showDishes ? "Tìm món khác" : "Tạo món ăn"}
            </button>

            <div className="dishes-container">
              {showDishes ? (
                matchedDishes.length > 0 ? (
                  matchedDishes.map((dish, index) => (
                    <div key={dish.id} className="dish-item">
                      <span>
                        Món {index + 1}: {dish.name}
                      </span>
                      <button className="choose-btn">Chọn</button>
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
            {filteredIngredients && filteredIngredients.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-card">
                <div className="ingredient-image">
                  <img src={ingredient.image} alt={ingredient.name} />
                </div>
                <span className="ingredient-name">{ingredient.name}</span>
                <button
                  className="add-btn"
                  onClick={() => addIngredient(ingredient)}
                >
                  Thêm
                </button>
              </div>
            ))}
            {filteredIngredients.length === 0 && (
              <div className="no-results">Không tìm thấy nguyên liệu</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
