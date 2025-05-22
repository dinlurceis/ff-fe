import React, { useEffect, useState } from 'react';
import { CartDetail } from './componnent/CartDetail';
import { addItemCart, deleteAllItemcart, deleteItemcart, detailcart } from '../../../service/CartService';
import { getAllIngredient, listAllIngredient } from '../../../service/IngredientService';
import { getAllIngredientBySupplier } from '../../../service/IngredientBySupplierService';
// If you're using the Font Awesome 4.7 in your project, make sure you've imported it in your main CSS or index file

const ShoppingCart = () => {
    const [carts,setCarts] = useState([]);
    const accessToken = sessionStorage.getItem("accessToken");
    const [totalMoney,setTotalMoney] = useState(0);
    const [loading,setLoading] = useState(true);
    const [listIngredient,setListIngredient]=useState([]);
    useEffect(()=>{
        document.title = "Cart";
    });

    useEffect(()=>{
        const fetchCarts = async() =>{
            setLoading(true);

            try{
                const data = await detailcart();
                if(data.result && Array.isArray(data.result.items)){
                    setTotalMoney(data.result.totalMoney);
                    console.log(totalMoney);
                    setCarts(data.result.items);
                }else{
                    setTotalMoney(0);
                    setCarts([]);
                }
            }catch(error){
                console.error("Error fetching favorite course:",error);
                setCarts([]);
            }finally{
                setLoading(false);
            }
        };
        fetchCarts();
    },[accessToken]);

    const updateCart = async(ingredientId, quantity) => {
        setLoading(true);
        try {
            const response = await addItemCart(ingredientId, quantity);
            if(response.result && Array.isArray(response.result.items)) {
                setTotalMoney(response.result.totalMoney)
                setCarts(response.result.items);
                console.log(totalMoney);
            } else {
                setTotalMoney(0)
                setCarts([]);
            }
        } catch(error) {
            console.error("Error updating cart:", error);
            setCarts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteIngredientcart = async (ingredientId) =>{
            try{
                await deleteItemcart(ingredientId);
                //xóa bản ghi trùng với favoriteId và cập nhập lại danh sách favorites
                setCarts((prevCarts) =>
                    prevCarts.filter((ingredient) => ingredient.ingredientId !== ingredientId)
                );                
            }catch(error){
                console.error("Error delete favorite:",error);
            }
        };

        const clearcart = async () =>{
            try{
                await deleteAllItemcart();
                setCarts([]);           
            }catch(error){
                console.error("Error delete favorite:",error);
            }
        };

     const fetchIngredients = async ()=>{
            try{
                console.log(1);
                const result = await getAllIngredientBySupplier(1,12);
                console.log(result);
                if(result && result.result){
                    setListIngredient(result.result.items);
                }else{
                    setListIngredient([]);
                }
            }catch (err){
                console.log(err);
            }
    };
    useEffect(() => {
        fetchIngredients();
    },[]);

        return (
              <div className='py-3'>
                <CartDetail
                  deleteItem={handleDeleteIngredientcart}
                  updateItem={updateCart}
                  ingredients={carts}
                  clearCart={clearcart}
                  totalMoney={totalMoney}
                  listIngredient={listIngredient}
                />
            </div>
        );
};

export default ShoppingCart;