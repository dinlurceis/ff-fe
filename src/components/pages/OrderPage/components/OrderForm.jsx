import { Select } from "antd";
import AddressAutocomplete from "./AddressAutoComplete";
import React from "react";

export const OrderForm = (props) => {
  const {
    handleSubmit,
    handleInputBlur,
    handleInputChange,
    errorMessage,
    formData,
    formErrors,
    setFormData // 👈 đảm bảo truyền được từ component cha nếu cần
  } = props;

  // Cập nhật khi người dùng gõ địa chỉ
  const handleAddressChange = (value) => {
    handleInputChange({ target: { name: "address", value } });
  };

  // Cập nhật khi người dùng chọn địa chỉ gợi ý
  const handleAddressSelect = ({ city, district, ward }) => {
    setFormData((prev) => ({
      ...prev,
      city,
      district,
      ward
    }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="row gy-5 justify-content-center">
          <div className="col-12 col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      id="email"
                      placeholder="Full name"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    {formErrors.fullName && (
                      <p className="text-danger">{formErrors.fullName}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    {formErrors.phoneNumber && (
                      <p className="text-danger">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3" style={{height:"40px"}}>
                    <AddressAutocomplete
                      value={formData.address}
                      onChange={handleAddressChange}
                      onSelect={handleAddressSelect}
                    />
                    {formErrors.address && (
                      <p className="text-danger">{formErrors.address}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="Phường/Xã"
                      value={formData.ward}
                      readOnly
                    />
                    <label htmlFor="city" className="form-label">
                      Phường/Xã
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="district"
                      placeholder="Quận/Huyện"
                      value={formData.district}
                      readOnly
                    />
                    <label htmlFor="district" className="form-label">
                      Quận/Huyện
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="ward"
                      placeholder="Tỉnh/Thành phố"
                      value={formData.city}
                      readOnly
                    />
                    <label htmlFor="ward" className="form-label">
                      Tỉnh/Thành phố
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      id="note"
                      placeholder="Note"
                      required
                      value={formData.note}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    <label htmlFor="note" className="form-label">
                      Note
                    </label>
                    {formErrors.note && (
                      <p className="text-danger">{formErrors.note}</p>
                    )}
                  </div>
                </div>
                <Select
                  placeholder="Phương thức thanh toán"
                  defaultValue="DIRECT"
                  value={formData.paymentExpression}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "paymentExpression", value }
                    })
                  }
                  options={[
                    { value: "DIRECT", label: "Thanh toán trực tiếp" },
                    { value: "ONLINE", label: "Thanh toán online" }
                  ]}
                  className="w-100"
                  style={{ height: "40px" }}
                  popupMatchSelectWidth={false}
                />
                <div className="col-12">
                  <div className="d-grid" style={{marginBottom:"20px"}}>
                    <button
                      className="btn btn-lg btn-dark rounded-0 fs-6"
                      type="submit"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
