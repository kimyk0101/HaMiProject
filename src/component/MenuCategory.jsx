import PropTypes from "prop-types";
import styled from "styled-components";

/* styled-components */
const Wrapping = styled.div`
  width: 1100px;
  height: 70px;
  background-color: #8b4513;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryBox = styled.span`
  width: 25%;
  height: 100%;
  background-color: #c19a6b;
  border: 1px solid #8b4513;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

/* MenuCategory-components */
function MenuCategory({ categoryData, setSelectedCategory }) {
  return (
    <Wrapping>
      {/* 메뉴 카테고리 리스트 */}
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
