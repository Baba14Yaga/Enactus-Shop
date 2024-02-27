import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest,userRequest } from "../requestMethods";
import { saveCart } from "./cartRedux";

export const login= async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res =await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data)); 
    }catch(err){
        dispatch(loginFailure(err.response.data))
    }
}
const getProduct= async (id)=>{
    try{
      const res=await publicRequest.get(`/Products/find/${id}`)
      const product=res.data
      return(product);
    }catch(err){
      console.log(err)
    }
  }  

export const fetchCart=async(dispatch,id)=>{

    var products=[]
    try{
        const res =await userRequest().get(`/carts/find/${id}`)
        products=res.data.products
      
    }catch(err){
        console.log(err)
    }
   Promise.all(products.map(product=>(
        getProduct(product.productId).then() 
    ))).then(fullproducts=>{
        products = products.map((product,key)=>({
            ...fullproducts[key],
            quantity:product.quantity
        }))
        console.log({products})
        dispatch(saveCart({products}))
    })
  
}

