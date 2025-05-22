import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileDropdown = ({
  avatar,
  isTokenValid,
  role,
  handleLogout,
}) => {
  const isUserOnly =
    role &&
    role.includes("USER") &&
    !role.includes("SUPPLIER") &&
    !role.includes("ADMIN");
  const isSupplierOnly =
    role && role.includes("SUPPLIER") && !role.includes("ADMIN");
  const isAdmin = role && role.includes("ADMIN");
  console.log(avatar);
  console.log(isTokenValid);
  console.log(role);
  console.log(handleLogout);
  return (
    <Dropdown className="mx-2">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="p-0 border-0 bg-transparent"
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          border: "2px solid #0d6efd",
          padding: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp3ztVtyMtzjiT_yIthons_zqTQ_TNZm4PS0LxFyFO0ozfM2S87W8QoL4&s"
          }
          alt="User Avatar"
          style={{
            width: "75px", // Tăng kích thước lên bằng với container
            height: "75px", // Tăng kích thước lên bằng với container
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {isTokenValid === null ? null : isTokenValid ? (
          <>
            {isSupplierOnly && (
              <Dropdown.Item as={Link} to="/ingredientBySupplier">
                <i className="fa fa-user-circle-o me-2"></i>Nguyên liệu đã đăng tải
              </Dropdown.Item>
            )}
            <Dropdown.Item as={Link} to="/profile">
              <i className="fa fa-id-card-o me-2"></i>Profile
            </Dropdown.Item>
            {isUserOnly && (
              <Dropdown.Item as={Link} to="/register-supplier">
                <i className="fa fa-graduation-cap me-2"></i>Đăng ký làm nhà cung cấp
              </Dropdown.Item>
            )}
            {isSupplierOnly && (
              <Dropdown.Item as={Link} to="/upload-ingredient-by-supplier">
                <i className="fa fa-upload me-2"></i>Đăng tải nguyên liệu
              </Dropdown.Item>
            )}
            {isAdmin && (
              <Dropdown.Item as={Link} to="/admin">
                <i className="fa fa-user-secret me-2"></i>Admin
              </Dropdown.Item>
            )}
            <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
              <i className="fa fa-sign-out me-2"></i>Logout
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item as={Link} to="/login">
            <i className="fa fa-sign-in me-2"></i>Login
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
