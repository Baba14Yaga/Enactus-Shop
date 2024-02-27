import {createSlice} from "@reduxjs/toolkit"

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },reducers:{
        saveCart:(state,action)=>{
            state.products=action.payload.products
            state.quantity=action.payload.products.length
            var total=0;
            for (var x=0  ; x<action.payload.products.length ;x++){
                total+=action.payload.products[x].price*action.payload.products[x].quantity;
            }
            state.total=total;
        },
        addProduct:(state,action)=>{
            state.quantity+=1;
            state.products.push(action.payload.product)
            state.total += action.payload.product.price*action.payload.product.quantity;
            
        },
        removeProduct:(state,action)=>{
            if(state.quantity>1 && action.payload.product!==null)
            {
                var index=-1;
                if(state.products!==undefined)
                    for (var x=0;x<=state.products?.length;x++){
                        if(state.products[x]?._id===action.payload.product._id)
                        index=x;
                    }
                if(state.total>state.products[index].price*state.products[index].quantity) 
                    state.total-= state.products[index].price*state.products[index].quantity;
                var spliced=state.products.splice(index, 1);
                state.quantity-=1;
                spliced=null;
            }
            else{

                state.products=[]
                state.quantity=0
                state.total=0
            }
            
        },
        increaseProduct:(state,action)=>{
            var index=-1;
            if(state.products!==undefined)
              for (var x=0;x<=state.products?.length;x++){
                if(state.products[x]?._id===action.payload.product._id)
                  index=x;
            }
            state.products[index].quantity+=action.payload.quantity
            state.total += action.payload.product.price*action.payload.quantity;
            
        },
        
    }

})

export const {addProduct,removeProduct,increaseProduct,saveCart}= cartSlice.actions
export default cartSlice.reducer;