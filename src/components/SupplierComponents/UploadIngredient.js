import { useEffect, useState } from "react";
import { FaUpload, FaIngredient, FaTags, FaDollarSign, FaFileAlt, FaClock, FaImage } from 'react-icons/fa';
import { Select } from "antd";
import TinyMCE from "../../utils/TinyMCE";
import { addIngredient } from "../../service/IngredientBySupplierService";
import { listAllIngredient } from "../../service/IngredientService";
export const UploadIngredient = () =>{

    const [ingredientId,setIngredientId] = useState('');
    const [stock,setStock]=useState('');
    const [price,setPrice]=useState('');
    const [listIngredient,setListIngredient]=useState([]);

    useEffect(() =>{
        document.title = "Create Ingredient By Supplier"
    })

     const fetchIngredients = async () => {
        try {
          const result = await listAllIngredient();
          if (result && result.result) {
            setListIngredient(result.result);
          } else {
            setListIngredient([]);
          }
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        fetchIngredients();
      }, []);
    // Hàm reset form về giá trị mặc định
    const resetForm = () => {
        setIngredientId(null);
        setPrice('');
        setStock('');
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // Prepare Ingredient data object
            const IngredientData = {
              ingredientId: ingredientId,
              stock: stock,
              price: price,
            };
            
            // Call the upload function with Ingredient data and thumbnail, but no PDF
            const result = await addIngredient(IngredientData.ingredientId,IngredientData.stock,IngredientData.price);
            
            // Reset form sau khi upload thành công
            resetForm();
            
          } catch (error) {
            console.error("Upload failed:", error);
            // Handle error - display message to user
          }
        // console.log({ingredientTitle,IngredientIsbn,IngredientDescription,IngredientPrice,categorySearch,IngredientThumbnail})
    };
    return (
        <div className="upload-book-container" style={{marginTop:"150px"}}>
            <div className="container upload-container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-9">
                        <div className="card shadow-lg border-0 rounded-4 bg-light">
                            <div className="card-body p-5">
                                <h3 className="card-title text-center mb-4 text-dark fw-bold">
                                    Upload New Ingredient
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="IngredientCategory" className="form-label fs-5 text-dark fw-semibold">
                                            Chọn sản phẩm
                                        </label>
                                        <Select
                                                placeholder="Select Ingredient"
                                                value={ingredientId}
                                                onChange={(e) => setIngredientId(e)}
                                                options={listIngredient.map((ingredient) => ({
                                                    value: `${ingredient.ingredientId}`,
                                                    label: `${ingredient.name}`
                                                }))}
                                                className="form-select shadow-sm"
                                                // className="w-100"
                                                // style={{ height: '100%' }}
                                                // popupMatchSelectWidth={false}
                                            />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ingredientPrice" className="form-label fs-5 text-dark fw-semibold">
                                            Giá (VND)
                                        </label>
                                        <input 
                                            type="number"
                                            className="form-control shadow-sm"
                                            id="ingredientPrice"
                                            placeholder="Enter the price of the Ingredient"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ingredientPrice" className="form-label fs-5 text-dark fw-semibold">
                                            Stock (Số lượng)
                                        </label>
                                        <input 
                                            type="number"
                                            className="form-control shadow-sm"
                                            id="ingredientPrice"
                                            placeholder="Enter the stock of the Ingredient"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="d-grid btn-block">
                                        <button type="submit" className="btn btn-lg shadow-sm upload-btn">
                                            <FaUpload className="me-2"/> Upload Ingredient
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}