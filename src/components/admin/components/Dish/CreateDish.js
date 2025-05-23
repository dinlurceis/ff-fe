import { useEffect, useState } from "react";
import { FaUpload, FaBook, FaTags, FaDollarSign, FaFileAlt, FaClock, FaImage } from 'react-icons/fa';
import { listAllCategory } from "../../../../service/CategoryService";
import { Select } from "antd";
import TinyMCE from "../../../../utils/TinyMCE";
import { AdminUploadBook } from "../../../../service/BookService";
import { uploadDish } from "../../../../service/DishService";
import { listAllIngredient } from "../../../../service/IngredientService";
export const CreateDish = () =>{
    const [listCategory, setListCategory] = useState([]);
    const [categorySearch, setCategorySearch] = useState([]);
    const [listIngredient,setListIngredient]=useState([]);
    const [ingredientSearch,setIngredientSearch]=useState([]);
    const [name,setName] = useState('');
    const [description,setDescription]=useState('');
    const [recipe,setRecipe]= useState('');
    const [timeCook,setTimeCook] = useState(null);
    const [price,setPrice]=useState(null);
    const [dishThumbnail,setDishThumbnail]=useState(null);


    useEffect(() =>{
        document.title = "Admin upload dish"
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

    useEffect(() => {
        const listIngredient = async () => {
            try {
                const data = await listAllIngredient();
                if (data.result && Array.isArray(data.result)) {
                    setListIngredient(data.result);
                }
            } catch (error) {
                console.error("Error fetching favorite course:", error);
            }
        };
        listIngredient();
    }, []);
    console.log(listIngredient);

    // Hàm reset form về giá trị mặc định
    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice(null);
        setRecipe('');
        setTimeCook('');
        setDishThumbnail('');
        setCategorySearch([]);
        setIngredientSearch([]);
        // setBookTitle('');
        // setBookIsbn('');
        // setBookDescription('');
        // setBookPrice('');
        // setBookAuthorName('');
        // setCategorySearch([]);
        // setBookThumbnail(null);
        
        // Reset file input
        const fileInput = document.getElementById('dishThumbnail');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // Prepare book data object
            const dishData = {
                name:name, //rau muốn xào tỏi
                description:description,//món ăn thích hợp vào ngày nắng nóng
                recipe:recipe,
                timeCook:timeCook,//15
                price:price,//20k
                listCategoryId:categorySearch,//1,2,3
                listIngredientId:ingredientSearch//1,2,4
            };
            
            // Call the upload function with book data and thumbnail, but no PDF
            const result = await uploadDish(dishData, dishThumbnail);
            
            // Reset form sau khi upload thành công
            resetForm();
            
          } catch (error) {
            console.error("Upload failed:", error);
            // Handle error - display message to user
          }
        //console.log({bookTitle,bookIsbn,bookDescription,bookPrice,categorySearch,bookThumbnail})
    };
    return (
        <div className="upload-book-container">
            <div className="container upload-container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-9">
                        <div className="card shadow-lg border-0 rounded-4 bg-light">
                            <div className="card-body p-5">
                                <h3 className="card-title text-center mb-4 text-dark fw-bold">
                                    Upload new dish
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="bookTitle" className="form-label fs-5 text-dark fw-semibold">
                                            Tên món ăn
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control shadow-sm"
                                            id="bookTitle"
                                            placeholder="Enter the name of the ingredient"
                                            value={name}
                                            onChange={(e) =>setName(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="mb-4">
                                        <label htmlFor="authorname" className="form-label fs-5 text-dark fw-semibold">
                                            Tác giả
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control shadow-sm"
                                            id="authorname"
                                            placeholder="Enter the isbn of the book"
                                            value={bookAuthorName}
                                            onChange={(e) =>setBookAuthorName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bookIsbn" className="form-label fs-5 text-dark fw-semibold">
                                           Mã số chuẩn quốc tế của sách
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control shadow-sm"
                                            id="bookIsbn"
                                            placeholder="Enter the isbn of the book"
                                            value={bookIsbn}
                                            onChange={(e) =>setBookIsbn(e.target.value)}
                                        />
                                    </div> */}
                                    <div className="mb-4">
                                        <label htmlFor="bookDescription" className="form-label fs-5 text-dark fw-semibold">
                                            Mô tả 
                                        </label>
                                       <TinyMCE value={description} onChange={setDescription}/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bookDescription" className="form-label fs-5 text-dark fw-semibold">
                                            Cách chế biến
                                        </label>
                                       <TinyMCE value={recipe} onChange={setRecipe}/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bookCategory" className="form-label fs-5 text-dark fw-semibold">
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
                                        <label htmlFor="bookCategory" className="form-label fs-5 text-dark fw-semibold">
                                            Chọn Nguyên Liệu cần thiết
                                        </label>
                                        <Select
                                                mode="multiple"
                                                placeholder="Nguyên liệu cần thiết"
                                                value={ingredientSearch}
                                                onChange={(e) => setIngredientSearch(e)}
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
                                        <label htmlFor="bookPrice" className="form-label fs-5 text-dark fw-semibold">
                                            Giá Dự kiến(VND)
                                        </label>
                                        <input 
                                            type="number"
                                            className="form-control shadow-sm"
                                            id="bookPrice"
                                            placeholder="Enter the price of the book"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                     <div className="mb-4">
                                        <label className="form-label fs-5 text-dark fw-semibold">
                                            Thời gian nấu (giây/phút...): 
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control shadow-sm"
                                            placeholder="Thời gian nấu dự kiến"
                                            value={timeCook}
                                            onChange={(e)=>setTimeCook(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bookThumbnail" className="form-label fs-5 text-dark fw-semibold">
                                            Hình ảnh món ăn
                                        </label>
                                        <input 
                                            className="form-control shadow-sm"
                                            type="file"
                                            id="dishThumbnail"
                                            onChange={(e) => setDishThumbnail(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="d-grid btn-block">
                                        <button type="submit" className="btn btn-lg shadow-sm upload-btn">
                                            <FaUpload className="me-2"/> Upload dish
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