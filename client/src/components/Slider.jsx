import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #fcf5f5;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  width: 50%;
  flex: 1;
  align-item: center;
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.div`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  text-decoration: none;
  a,&:visited,
  &:hover,
  &:active {
    color: inherit;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  const handleGo = (item) => {
    const getTeam = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/teams/find/" + item._id
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeam();
  };
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teams");
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeams();
  }, []);
  console.log(teams);
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {teams.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Link to={`/team/${item._id}`} style={{ textDecoration: "none" }}>
                <Image src={item.titleImg} />
              </Link>
            </ImgContainer>

            <InfoContainer>
              <Title>{}</Title>
              <Desc>
                <Link
                  to={`/team/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {item.desc}
                </Link>
              </Desc>
              <Link
                to={`/products/${item?.cat}`}
                style={{ textDecoration: "none" }}
              >
                <Button name={"shop"} onClick={() => handleGo(item)}>
                  SHOW NOW
                </Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
