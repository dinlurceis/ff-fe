export const IngredientFeatur = ({ingredient,handleEnrollNow}) =>{
    if(!ingredient){
        return <div>ingredient is not available </div>
    }
    return (
        <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="ingredient-features-container mb-5 py-4 px-4 shadow-lg">
                <h3 className="ingredient-features-title text-white py-3 px-4 m-0">ingredient Features</h3>
                {/* Error Now button:add thêm vào gỏ hàng */}
                <div className="py-3 px-4">
                    <button 
                        className="btn enroll-now-btn btn-block py-3 px-5"
                        onClick={handleEnrollNow}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}