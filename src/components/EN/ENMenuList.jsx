import PropTypes from "prop-types";
import styled from "styled-components";

/* styled-components */
const Wrap = styled.div`
  width: 1360px;
  height: 810px;
  background-color: #f47e28;
  margin: 0;
  padding: 10px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;
const MenuBox = styled.span`
  width: 310px;
  height: 360px;
  margin: 10px 5px 8px 18px;
  padding: 0;
  border: 1px solid #f2c1ae;
  border-radius: 10px;
  background-color: #fdf6d6;
  font-size: 5px;
  font-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 8px solid #0021f3;
  }
`;
const Img = styled.img`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const ItemInfo = styled.div`
  font-size: 27px;
  font-weight: bold;
`;

/* MenuList-components */
function MenuList({
  isCart,
  selectedCategory,
  setData,
  cutletData,
  noodleData,
  sideData,
}) {
  const filteredData =
    selectedCategory === "A"
      ? setData
      : selectedCategory === "B"
      ? cutletData
      : selectedCategory === "C"
      ? noodleData
      : selectedCategory === "D"
      ? sideData
      : setData;

  const toCart = (itemId) => {
    isCart(itemId);
  };

  return (
    <Wrap>
      {filteredData.map((item) => (
        <MenuBox key={item.id} onClick={() => toCart(item.id)}>
          <Img src={`/src/images/${item.id}.jpeg`} alt={item.name}></Img>
          <ItemInfo>{item.name}</ItemInfo>
          <ItemInfo>{item.price}won</ItemInfo>
        </MenuBox>
      ))}
    </Wrap>
  );
}
MenuList.propTypes = {
  isCart: PropTypes.func,
  selectedCategory: PropTypes.string,
  setData: PropTypes.array,
  cutletData: PropTypes.array,
  noodleData: PropTypes.array,
  sideData: PropTypes.array,
};
export default MenuList;
