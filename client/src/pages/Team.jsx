import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import Categories from "../components/Categories";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
justify-content:center;
`;

const Wrapper = styled.div`
  padding: 50px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display:flex;
  justify-content:space-between;
  margin:5px;
`;
const Image = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;
const TeamImage = styled.img`
  height: 40vh;
  width:100%;
  object-fit:cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  display:flex;
  justify-content: center;
`;

const Desc = styled.p`
  margin: 20px 0px;

`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
function Team() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [team, setTeam] = useState({});
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
  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await publicRequest.get("/teams/find/" + id);

        setTeam(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeam();
  }, [id]);
  console.log(team);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={team?.titleImg} />
        </ImgContainer>
        <InfoContainer>
          <Desc>{team?.desc}</Desc>
          <Link
                to={`/products/${team?.cat}`}
                style={{ textDecoration: "none" }}
              >
                <Button name={"shop"} onClick={() => handleGo(team)}>
                  SHOW NOW
                </Button>
              </Link>
        </InfoContainer>
      </Wrapper>
      <Wrapper>
        { 
          team?.img?.map((item)=>(
              <ImgContainer>
                <TeamImage src={item} />
              </ImgContainer>
            )
            )
        }
      </Wrapper>
      <Title>
      {team?.type==="college" && `${team?.title}'s Projects`}
      </Title>
      {team.childId && <Categories childId={[...team?.childId]}/>}
      
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Team;
