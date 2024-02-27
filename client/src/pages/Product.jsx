import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct,increaseProduct } from "../redux/cartRedux";
import { useDispatch,useSelector } from "react-redux";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  overflow:hidden;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid teal;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const products = useSelector((state) => state.cart.products);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product,setProduct]=useState();
  const [quantity,setQuantity]=useState(1);
  const [color,setColor]=useState();
  const [size,setSize]=useState();
  const dispatch=useDispatch();
  useEffect(()=>{
    window.scrollTo({top: 0, left: 0});
    const getProduct= async ()=>{
      try{
        const res=await publicRequest.get(`/Products/find/${id}`)
        setProduct(res.data);
        setColor(res.data.color[0])
        setSize(res.data.size[0])
      }catch(err){
        console.log(err)
      }
    }
    getProduct();
  },[id])
  
  const handleQuantity = (type)=>{
    if(type==="dec"){
        if(quantity>1)
          setQuantity(q=>q-1)
    }
    else if(type==="inc")
    {
      setQuantity(q=>q+1)

    }
  }
  const handleClick=()=>{
    var index=-1;
    if(products!==undefined)
      for (var x=0;x<=products?.length;x++){
        console.log(products[x])
        if(products[x]?._id===product._id)
          index=x;
    }
    if (index===-1)
      dispatch(addProduct({product:{...product,quantity,color,size}}))
    else
      dispatch(increaseProduct({
        product:{...product,color,size},
        index:index,
        quantity:quantity,
      }))


  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title} </Title>
          <Desc>
          {product?.desc}
          </Desc>
          <Price>{product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              
              {product?.color?.map((col)=>
                <FilterColor key={col} color={col} onClick={(c)=>setColor(c)}>
                </FilterColor >
              )}
          
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e=>setSize(e.target.value))}>
                {product?.size?.map((s)=><FilterSizeOption key={s}>{s}</FilterSizeOption>)}
                
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={()=>handleClick()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
