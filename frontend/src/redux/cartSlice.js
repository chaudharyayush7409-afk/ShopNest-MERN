import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state,action)=>{
            const item = action.payload;
            const existItem = state.cartItems.find((x)=> x.productId===item.productId);
            if(existItem){
                existItem.qty+=1;
            }
            else{
                state.cartItems.push(item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x)=>x.productId !== itemId);
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        },
        clearCart: (state)=>{
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },

        updateCartItem: (state,action)=>{
            const item = action.payload;
            state.cartItems = state.cartItems.map((x)=>x.productId===item.productId ? item : x)
        }
    },

})

export const{addToCart, removeFromCart, clearCart,updateCartItem}= cartSlice.actions;
export default cartSlice.reducer;


