import PropTypes from "prop-types";
import styled from "styled-components";

/* styled-components */
const Wrapping = styled.div`
  width: 1360px;
  height: 100px;
  background-color: #f47e28;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryBox = styled.span`
  width: 25%;
  height: 100%;
  color: white;
  background-color: #b44b1e;
  border: 1px dashed #4c4b4e;
  border-radius: 10px;
  font-size: 47px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 6px solid #0021f3;
  }
`;

/* MenuCategory-components */
function MenuCategory({ categoryData, setSelectedCategory }) {
  return (
    <Wrapping>
      {categoryData.map((item) => (
        <CategoryBox
          key={item.id}
          onClick={() => {
            setSelectedCategory(item.id);
          }}
        >
          {item.title}
        </CategoryBox>
      ))}
    </Wrapping>
  );
}
MenuCategory.propTypes = {
  categoryData: PropTypes.array,
  setSelectedCategory: PropTypes.func,
};
export default MenuCategory;
