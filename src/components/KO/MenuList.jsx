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
  flex-direction: column; /* 내용을 세로로 배열 */
  justify-content: space-between; /* 내용을 세로로 가운데 정렬 */
  align-items: center;
  box-sizing: border-box; /* 요소의 너비와 높이에 설정한 값이 콘텐츠 영역, 패딩, 테두리를 모두 포함하는 값으로 인식 */
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
  font-size: 30px;
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
      : setData; //  []으로 설정하면 첫 화면에 아무런 리스트도 안나오게끔, setData는 setData가 기본으로 나오게끔 설정

  const toCart = (itemId) => {
    isCart(itemId);
  };

  return (
    <Wrap>
      {/* 선택된 카테고리의 메뉴 목록 */}
      {filteredData.map((item) => (
        <MenuBox key={item.id} onClick={() => toCart(item.id)}>
          <Img src={`/src/images/${item.id}.jpeg`} alt={item.name}></Img>
          <ItemInfo>{item.name}</ItemInfo>
          <ItemInfo>{item.price}원</ItemInfo>
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
