import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIngredient } from "../../IngredientPage/components/ViewIngredient";
import { motion } from "framer-motion";

export const CartDetail = ({
  deleteItem,
  updateItem,
  ingredients,
  clearCart,
  totalMoney,
  listingredient,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate(); // điều hướng đến trang thanh toán
  // chọn/bỏ chọn từng sản phẩm
  const handleSelectItem = (supplierHasIngredientId) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(supplierHasIngredientId)
          ? prevSelected.filter((id) => id !== supplierHasIngredientId) // khi người dùng bấm chọn nếu đã có trong selectItem thì mình bỏ chọn
          : [...prevSelected, supplierHasIngredientId] // nếu chưa có thì mình thêm nó vào danh sách
    );
  };

  // chọn tất cả hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    if (selectedItems.length === ingredients.length) {
      setSelectedItems([]); // xóa tất cả check box
    } else {
      setSelectedItems(
        ingredients.map((ingredient) => ingredient.supplierHasIngredientId)
      ); // check box tất cả sản phẩm
    }
  };

  // Xử lý thanh toán những sản phẩm đã chọn
  const handlePayment = () => {
    const selectedIngredients = ingredients.filter((ingredient) =>
      selectedItems.includes(ingredient.supplierHasIngredientId)
    );
    if (selectedIngredients.length === 0) {
      alert("Vui lòng chọn 1 sản phẩm để thanh toán");
    }
    const orderItems = selectedIngredients.map((ingredient) => ({
      supplierHasIngredientId: ingredient.supplierHasIngredientId,
      quantity: ingredient.quantity,
    }));
    console.log("danh sách sản phẩm được thanh toán:", orderItems);
    console.log("danh sách sản phẩm được chọn:", selectedIngredients);
    // ví dụ điều hướng sang trang thanh toán và truyền dữ liệu
    navigate("/order", {
      state: { items: orderItems, listIngredients: selectedIngredients },
    });
  };

  const selectedTotal = ingredients //tổng số tiền các sản phẩm đã chọn
    .filter((ingredient) => selectedItems.includes(ingredient.supplierHasIngredientId))
    .reduce((sum, ingredient) => sum + Number(ingredient.totalPrice), 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="content-page"
    >
      <div className="cart-page-main-block inner-page-sec-padding-bottom py-3 py-md-5 py-xl-8">
        <div className="cart_area cart-area-padding">
          <div className="container">
            <div
              className="page-section-title text-center"
              style={{ paddingBottom: "35px" }}
            >
              <h1>Giỏ hàng</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <form action="#" className="">
                  <div className="cart-table table-responsive mb--40">
                    {ingredients.length > 0 ? (
                      <div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="pro-remove">
                                <input
                                  type="checkbox"
                                  onChange={handleSelectAll}
                                  checked={
                                    selectedItems.length === ingredients.length
                                  }
                                />
                              </th>
                              <th className="pro-thumbnail">Hình ảnh</th>
                              <th className="pro-title">Tên nguyên liệu</th>
                              <th className="pro-supplier">Nhà cung cấp</th>
                              <th className="pro-price">Đơn giá</th>
                              <th className="pro-quantity">Số lượng</th>
                              <th className="pro-subtotal">Tổng tiền</th>
                              <th className="pro-remove"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {ingredients.map((ingredient) => (
                              <tr key={ingredient.supplierHasIngredientId}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.includes(
                                      ingredient.supplierHasIngredientId
                                    )}
                                    onChange={() =>
                                      handleSelectItem(ingredient.supplierHasIngredientId)
                                    }
                                  />
                                </td>
                                <td className="pro-thumbnail">
                                  <Link
                                    to={`/ingredient-detail/${ingredient.supplierHasIngredientId}`}
                                  >
                                    <img
                                      src={ingredient.ingredientUrl}
                                      alt={ingredient.nameIngredient}
                                    />
                                  </Link>
                                </td>
                                <td className="pro-title">
                                  <span>{ingredient.nameIngredient}</span>
                                </td>
                                <td className="pro-supplier">
                                  <span>{ingredient.supplierName}</span>
                                </td>
                                <td className="pro-price">
                                  <span>
                                    {ingredient.priceIngredient.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    đ
                                  </span>
                                </td>
                                <td className="pro-quantity">
                                  <div className="pro-qty">
                                    <div className="count-input-block">
                                      <input
                                        type="number"
                                        className="form-control text-center"
                                        min={1}
                                        value={ingredient.quantity}
                                        onChange={(e) =>
                                          updateItem(
                                            ingredient.supplierHasIngredientId,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className="pro-subtotal">
                                  <span>
                                    {ingredient.totalPrice.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    đ
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteItem(ingredient.supplierHasIngredientId)
                                    }
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div
                          className="btn-block"
                          style={{ marginTop: "50px" }}
                        >
                          <button
                            type="button"
                            className="btn"
                            onClick={handlePayment}
                          >
                            Thanh toán
                          </button>
                          <Link to="/" className="btn">
                            Tiếp tục mua sắm
                          </Link>
                          <button onClick={clearCart} className="btn">
                            Xóa giỏ hàng
                          </button>
                        </div>
                        <h4 style={{ color: "#000", marginTop: "30px" }}>
                          Tổng cộng ({selectedItems.length} sản phẩm):{" "}
                          {selectedTotal.toLocaleString("vi-VN")} đ
                        </h4>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="text-center pt-5 pb-5"
                          style={{ color: "#000" }}
                        >
                          <h3>Bạn chưa thêm nguyên liệu nào vào giỏ hàng.</h3>
                          <p>Hãy tiếp tục mua sắm!</p>
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <hr
                        style={{
                          width: "50%",
                          margin: "40px auto",
                          border: "none",
                          borderTop: "3px solid #ccc",
                        }}
                      />
                      <h3
                        style={{
                          paddingTop: "30px",
                          color: "#000",
                          paddingBottom: "20px",
                        }}
                      >
                        Khám phá thêm các nguyên liệu khác
                      </h3>
                      <ViewIngredient ingredients={listingredient} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
