
import { Add, Remove,Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { removeProduct,increaseProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ₹{mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ₹{(props) => props.type === "filled" && "none"};
  background-color: ₹{(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ₹{(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ₹{mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ₹{mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ₹{mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ₹{(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items:end;
  justify-content: center;
  padding-right:10px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ₹{mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  right:0px;
  ₹{mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ₹{(props) => props.type === "total" && "500"};
  font-size: ₹{(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px; 
  background-color: black;
  color: white;
  font-weight: 600;
`;

export default function Cart() {
  const dispatch=useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(false);
  const navigate = useNavigate();
  const createCart=async(newcart)=>{
    console.log("Creating new cart in dbms")
    try{
      const res =await userRequest().post("/carts",newcart)
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }
  const updateCart= async (cart)=>{
    try{
        const res =await userRequest().put(`/carts/${currentUser._id}`,cart)
        console.log(res.data)
        if (res.data===null)
            createCart(cart)
            

    }catch(err){
        console.log(err)
    }

  }
  useEffect(() => {
    const makeRequest = async () => {
      try {
        /*paytm code for validating payment */
        navigate("/pay", { data: cart });
      } catch (err) {}
    };
    stripeToken && makeRequest();

    if(currentUser)
        updateCart({
          products: cart.products.map(product=>({
                        productId:product._id,
                        quantity:product.quantity
                    })),
          userId: currentUser._id
        })


  }, [stripeToken, cart.total]);
  const handleClick=(product,operation)=>{
   
    if(operation==="reduce")
    {
      if(product.quantity<=1)
        dispatch(removeProduct({product}))
      else{
        dispatch(increaseProduct({
          product:product,
          quantity:-1,
        }))
      }  
    }
    if(operation==="remove"){
      dispatch(removeProduct({product}))
    }
    if(operation==="add")
      dispatch(increaseProduct({
        product:product,
        quantity:1,
      }))  
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => {
              return (
                <Product key={product?._id}>
                  <ProductDetail>
                    <Image src={product?.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product?.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product?._id}
                      </ProductId>
                      <ProductColor color={product?.color} />
                      <ProductSize>
                        <b>Size:</b> {product?.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <Cancel  onClick={()=>{handleClick(product,"remove")}} />
                    <ProductAmountContainer>  
                      <Add onClick={()=>{handleClick(product,"add")}} />
                      <ProductAmount>{product?.quantity}</ProductAmount>
                      <Remove onClick={()=>{handleClick(product,"reduce")}} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ₹ {product?.price * product?.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            
            <Button
              onClick={() => {
                setStripeToken(true);
              }}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}