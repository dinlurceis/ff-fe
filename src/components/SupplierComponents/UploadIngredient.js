import { useEffect, useState } from "react";
import { FaUpload, FaIngredient, FaTags, FaDollarSign, FaFileAlt, FaClock, FaImage } from 'react-icons/fa';
import { listAllCategory } from "../../service/CategoryService";
import { Select } from "antd";
import TinyMCE from "../../utils/TinyMCE";
import { addIngredient } from "../../service/IngredientBySupplierService";
export const UploadIngredient = () =>{
    const [listCategory, setListCategory] = useState([]);
    const [categorySearch, setCategorySearch] = useState([]);
    const [ingredientTitle,setIngredientTitle] = useState('');
    const [ingredientIsbn,setIngredientIsbn]=useState('');
    const [ingredientDescription,setIngredientDescription]= useState('');
    const [ingredientPrice,setIngredientPrice] = useState("");
    const [ingredientThumbnail,setIngredientThumbnail]=useState(null);
    const [ingredientPdf,setIngredientPdf] = useState(null);

    useEffect(() =>{
        document.title = "Create Ingredient By Supplier"
    })

    useEffect(() => {
            const listCategories = async () => {
                try {
                    const data = await listAllCategory();
                    if (data.result && Array.isArray(data.result)) {
                        setListCategory(data.result);
                    }
                } catch (error) {
                    console.error("Error fetching favorite course:", error);
                }
            };
            listCategories();
        }, []);

    // Hàm reset form về giá trị mặc định
    const resetForm = () => {
        setIngredientPdf(null);
        setIngredientTitle('');
        setIngredientIsbn('');
        setIngredientDescription('');
        setIngredientPrice('');
        setCategorySearch([]);
        setIngredientThumbnail(null);
        
        // Reset file input
        const fileInput = document.getElementById('IngredientThumbnail');
        if (fileInput) {
            fileInput.value = '';
        }
        const fileInputIngredient = document.getElementById('IngredientPdf');
        if (fileInput) {
            fileInputIngredient.value = '';
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // Prepare Ingredient data object
            const IngredientData = {
              title: ingredientTitle,
              description: ingredientDescription,
              isbn: ingredientIsbn,
              price: ingredientPrice,
              categoriesId: categorySearch // Assuming your API expects category IDs
            };
            
            // Call the upload function with Ingredient data and thumbnail, but no PDF
            const result = await addIngredient(IngredientData, ingredientThumbnail,ingredientPdf);
            
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
                                        <label htmlFor="ingredientTitle" className="form-label fs-5 text-dark fw-semibold">
                                            Tên sách
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control shadow-sm"
                                            id="ingredientTitle"
                                            placeholder="Enter the title of the Ingredient"
                                            value={ingredientTitle}
                                            onChange={(e) =>setIngredientTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ingredientIsbn" className="form-label fs-5 text-dark fw-semibold">
                                           Mã số chuẩn quốc tế
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control shadow-sm"
                                            id="ingredientIsbn"
                                            placeholder="Enter the isbn of the Ingredient"
                                            value={ingredientIsbn}
                                            onChange={(e) =>setIngredientIsbn(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="IngredientDescription" className="form-label fs-5 text-dark fw-semibold">
                                            Mô tả sách
                                        </label>
                                       <TinyMCE value={ingredientDescription} onChange={setIngredientDescription}/>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="IngredientCategory" className="form-label fs-5 text-dark fw-semibold">
                                            Chọn danh mục
                                        </label>
                                        <Select
                                                mode="multiple"
                                                placeholder="Select categories"
                                                value={categorySearch}
                                                onChange={(e) => setCategorySearch(e)}
                                                options={listCategory.map((category) => ({
                                                    value: `${category.id}`,
                                                    label: `${category.name}`
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
                                            value={ingredientPrice}
                                            onChange={(e) => setIngredientPrice(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ingredientThumbnail" className="form-label fs-5 text-dark fw-semibold">
                                            Bìa sách
                                        </label>
                                        <input 
                                            className="form-control shadow-sm"
                                            type="file"
                                            id="ingredientThumbnail"
                                            onChange={(e) => setIngredientThumbnail(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ingredientPdf" className="form-label fs-5 text-dark fw-semibold">
                                            File sách (PDF)
                                        </label>
                                        <input 
                                            className="form-control shadow-sm"
                                            type="file"
                                            id="ingredientPdf"
                                            onChange={(e) => setIngredientPdf(e.target.files[0])}
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