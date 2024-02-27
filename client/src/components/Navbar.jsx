import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { saveCart } from "../redux/cartRedux";
const Container = styled.div`
  top: 0px;
  left: 0px;
  position: sticky;
  background-color: white;
  z-index: 99;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  padding: 3px;
  align-items: center;
  margin-left: 25px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  justify-content: space-between;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  margin: 0px;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  a,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser) || false;
  const firstName = user?.firstName;
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(saveCart({ products: [] }));
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>Enactus Shop</Logo>
          </Link>
        </Left>

        <Right>
          {!user && (
            <>
              <MenuItem>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  LOGIN
                </Link>
              </MenuItem>
            </>
          )}
          {user && (
            <>
              <MenuItem>{firstName}</MenuItem>
              <MenuItem onClick={handleClick}>SIGN OUT</MenuItem>
            </>
          )}
          <MenuItem>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
