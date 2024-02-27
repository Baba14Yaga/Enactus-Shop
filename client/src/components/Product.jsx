import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch,useSelector} from "react-redux";
import { addProduct,increaseProduct } from "../redux/cartRedux";
const Info = styled.div`
    
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  object-fit: contain;
  z-index: 2;
  overflow:hidden;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.5);
  }
`;

const Product = ({ item:product }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch=useDispatch();
  const handleClick=()=>{
    var index=-1;
    if(products!==undefined)
      for (var x=0;x<=products?.length;x++){
        if(products[x]?._id===product._id)
          index=x;
    }
    if (index===-1)
      dispatch(addProduct({product:{...product,quantity:1}}))
    else
      dispatch(increaseProduct({
        product:product,
        index:index,
        quantity:1,
      }))


  }
  return (
    <Container>
      <Circle />
      <Image src={product.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={()=>handleClick()} />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
