import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = ({childId}) => {
  console.log(childId)
  return (
    <Container>
      {childId?
        childId.map((item) => (
          <CategoryItem id={item} key={item} />
        ))
        :categories.map((item) => (
        <CategoryItem id={item.id} key={item.id} />
      ))
      }
    </Container>
  );
};

export default Categories;
