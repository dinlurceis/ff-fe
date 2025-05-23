import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierById, getUserById } from "../../../../service/UserService";
import { toast, ToastContainer } from "react-toastify";
import { acceptSupplier, rejectSupplier } from "../../../../service/RegisterSipplierService";
import CIcon from "@coreui/icons-react";
import { FiFileText, FiAward } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import {
  cilEnvelopeClosed,
  cilUser,
  cilPhone,
  cilDescription,
  cilFile,
  cilStar,
  cilCalendar,
} from "@coreui/icons";
import { Button } from "@mui/material";

const SupplierInforDetail = () => {
  const [SupplierDetails, setSupplierDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getSupplierById(id);
        setSupplierDetails(data.result);
      } catch (error) {}
    };

    fetchDetails();
  }, [id]);

  const handleOpenInNewTab = (url) => {
    if (url) {
      const fullUrl = `http://localhost:8081${url}`;
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.error("File not found.");
    }
  };

  const handleApprove = async () => {
    try {
      await acceptSupplier(id);
      //toast.success("Author approved successfully.");
     // setTimeout(() => navigate("/admin/Suppliers/censor"), 3000);
    } catch (error) {
      console.error("Error approving Author:", error);
      //toast.error("Failed to approve Author.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectSupplier(id);
      // toast.warn("Author rejected successfully.");
      // setTimeout(() => navigate("/admin/Suppliers/censor"), 3000);
    } catch (error) {
      console.error("Error rejecting Author:", error);
      //toast.error("Failed to reject Author.");
    }
  };

  if (!SupplierDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Author-info-detail">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="header-section">
        <img
          src={SupplierDetails.avatar}
          alt="Avatar"
          className="Author-avatar"
        />
        <div className="Author-basic-info">
          <div className="name-and-points">
            <div className="Author-name"><strong>Name: </strong>{SupplierDetails.name}</div>
          </div>
          <p className="Author-email">
            <CIcon icon={cilEnvelopeClosed} /> <strong>Email: </strong>{SupplierDetails.email}
          </p>
          <p className="Author-phone">
            <CIcon icon={cilPhone} /> <strong>Phone number: </strong>{SupplierDetails.phone || "N/A"}
          </p>
        </div>
      </div>

      <div className="detail-section">
        <div className="info-card">
          <h3>CV</h3>
          <Button
            variant="outline-primary"
            onClick={() => handleOpenInNewTab(SupplierDetails.cvUrl)}
          >
            <FiFileText /> View CV
          </Button>
        </div>
        <div className="info-card">
          <h3>Certificate</h3>
          <Button
            variant="outline-secondary"
            onClick={() => handleOpenInNewTab(SupplierDetails.certificate)}
          >
            <FiAward /> View Certificate
          </Button>
        </div>
        <div className="info-card">
          <h3>Facebook</h3>
          <p>
            <a
              href={SupplierDetails.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook style={{ color: "#3b5998" }} /> View Facebook Profile
            </a>
          </p>
        </div>
        <div className="info-card">
          <h3>Description</h3>
          <p>
            <CIcon icon={cilDescription} />{" "}
            {SupplierDetails.description || "N/A"}
          </p>
        </div>
        <div className="info-card">
          <h3>Years of Experience</h3>
          <p>
            <CIcon icon={cilCalendar} />{" "}
            {SupplierDetails.yearsOfExperience || "N/A"} years
          </p>
        </div>
      </div>

      <div className="action-section">
        <button className="approve-button" onClick={handleApprove}>
          Phê Duyệt
        </button>
        <button className="reject-button" onClick={handleReject}>
          Từ Chối
        </button>
      </div>
    </div>
  );
};

export default SupplierInforDetail;