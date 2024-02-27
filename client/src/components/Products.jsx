import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios"
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {


  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);

  useEffect(()=>{
    const getProducts= async ()=>{
      try{
        const res=await axios.get(cat?`http://localhost:5000/api/products?category=${cat}`:"http://localhost:5000/api/products")
        setProducts(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getProducts();

  },[cat])
  useEffect(()=>{
    
    cat && setFilteredProducts(
      products.filter(item=> 
          Object.entries(filters).every(([key,value])=>
            item[key].includes(value)))
        // enteries help to make key value pair, 
        //every check for every elemnt of array, 
        //filter remove false values, 
        //include checks whether the element is in array or not
    )
  },[products,cat,filters])
  useEffect(()=>{
    switch(sort){
        case"newest":setFilteredProducts(prev=>
                  [...prev].sort((a,b)=>a.createdAt-b.createdAt))
                break;
        case"asc":setFilteredProducts(prev=>
                  [...prev].sort((a,b)=>a.price-b.price))
                break;
        case"desc":setFilteredProducts(prev=>
                  [...prev].sort((a,b)=>b.price-a.price))
                break;
    }            
      
  
  },[sort])

  return (
    <Container>
      {cat?
        filteredProducts.map((item) => (
          <Product item={item} key={item._id} />
        )):
        products.slice(0,8).map((item) => (
          <Product item={item} key={item._id} />
        ))
      }
    </Container>
  );
};

export default Products;
