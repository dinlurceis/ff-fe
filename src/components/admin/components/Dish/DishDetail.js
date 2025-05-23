/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getBookById } from "../../../../service/BookService";
import "../../css/IngredientDetail.css";
import { getDishById } from "../../../../service/DishService";
const DishDetail = () =>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [dish,setDish] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetchDishDetails();
    },[id]);
    
    const fetchDishDetails = async () =>{
        try{
            const response = await getDishById(id);
            
            setDish(response.result);
        }catch(error){
            console.log("Error fetching book details:",error);
        }finally{
            setLoading(false);
        }
    };

    const handleSupplierClick = (supplierId) =>{
        if(supplierId){
            navigate(`/admin/users/detail/${supplierId}`)
        }else{
            console.error("Author ID is missing")
        }
    };

    if(loading){
        return <div className="loading">Loading book details...</div>;
    }

    if(!dish){
        return <div className="error-message">No book found.</div>
    }

    return (
        <div className="book-detail-container">
            <div className="book-header">
                <h1 className="book-title">{dish.name}</h1>
            </div>
            <div className="book-detail-content">
                {/* Thumbnail Section */}
                <div className="book-thumbnail">
                    {dish.dishImage ? (
                        <img 
                            src={dish.dishImage}
                            alt="Book Thumbnail"
                            className="thumbnail-image"
                        />
                    ):(
                        <p>No image available</p>
                    )}
                </div>

                {/* Infomation section */}
                <div className="book-info-section">
                    <h2>Book Information</h2>
                    <p>
                        <strong>Description:</strong> <div dangerouslySetInnerHTML={{ __html:dish.description }} />
                    </p>
                     <p>
                        <strong>Recipe:</strong> {dish.recipe}
                    </p>
                    <p>
                        <strong>Price dự kiến:</strong> {dish.price} VND
                    </p>
                    <p>
                        <strong>TimeCook</strong> {dish.timeCook}
                    </p>
                    <p>
                        <strong>Category:</strong> {dish.dishCategory.join(",")}
                    </p>
                     <p>
                        <strong>List ingredient:</strong> {dish.dishIngredient.join(",")}
                    </p>
                </div>
            </div>
        </div> 
    );
};

export default DishDetail;