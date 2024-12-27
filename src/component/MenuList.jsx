import PropTypes from "prop-types";
import styled from "styled-components";

/* styled-components */
const Wrap = styled.div`
  // border: 1px solid yellow;
  width: 1100px;
  height: 540px;
  background-color: #8b4513;
  margin: 0;
  padding: 10px 0px 0px 0px;
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-wrap: wrap;
  overflow: auto;
`;
const MenuBox = styled.span`
  width: 250px;
  height: 230px;
  margin: 20px 9px;
  padding: 0;
  border: 1px solid yellow;
  border-radius: 10px;
  background-color: #c19a6b;
  font-size: 5px;
  font-color: black;
  display: flex;
  flex-direction: column; /* 내용을 세로로 배열 */
  justify-content: space-between; /* 내용을 세로로 가운데 정렬 */
  align-items: center;
  box-sizing: border-box; /* 요소의 너비와 높이에 설정한 값이 콘텐츠 영역, 패딩, 테두리를 모두 포함하는 값으로 인식 */
  cursor: pointer;
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
  font-size: 18px;
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
          <ItemInfo>
            {item.name} - {item.price}원
          </ItemInfo>
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
