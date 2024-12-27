import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/* styled-components */
const Wrapper = styled.div`
  // border: 1px solid black;
  width: 401px;
  height: 618px;
  position: absolute;
  margin-left: 1099px;
  margin-top: -620px;
  background-color: white;
`;
const StyledH1 = styled.h2`
  // border: 1px solid black;
  height: 70px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #706555;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledUl = styled.ul`
  // border: 1px solid blue;
  padding: 10px 0 0 20px;
  margin: 0;
  height: 335px;
  width: 381px;
  overflow: auto;
  list-style: none;
`;
const ButtonAmountControl = styled.button`
  border: 1px solid white;
  background-color: #8b4513;
  color: white;
  border-radius: 4px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
`;
const RightSide = styled.a`
  // border: 1px solid gray;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const Menu = styled.a`
  font-weight: bold;
  font-size: 20px;
`;
const Style02 = styled.a`
  // border: 1px solid red;
  display: flex;
  height: 65px;
  width: 401px;
`;
const Button1 = styled.button`
  border: 2px solid #C19A6B;
  height: 100%;
  width: 50%;
  margin=0;
  padding=0;
  background-color: #8B4513;
  color: white;
  padding: 10px 54px;
  cursor: pointer;
  font-size: 21px;
  font-weight: bold;
`;
const Button2 = styled.button`
  border: 2px solid #C19A6B;
  height: 100%;
  width: 50%;
  margin=0;
  padding=0;
  background-color: #8B4513;
  color: white;
  padding: 10px 54px;
  cursor: pointer;
  font-size: 21px;
  font-weight: bold;
`;

/* Cart-components */
function Cart({
  items,
  handleIncrement,
  handleDecrease,
  isCartZero,
  allCartZero,
}) {
  {
    /* 장바구니 총 금액 */
  }
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalP = items.reduce(
        (acc, item) => acc + item.price * item.isCart,
        0
      );
      setTotalPrice(totalP);
    };
    calculateTotalPrice();
  }, [items]); // 마지막의 [items] = 의존성 배열, useEffect가 items 배열의 변화에만 반응하도록 설정하는 것

  {
    /* 장바구니 총 주문수량 */
  }
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const calculateTotalAmount = () => {
      const totalA = items.reduce((acc, item) => acc + item.isCart, 0);
      setTotalAmount(totalA);
    };
    calculateTotalAmount();
  }, [items]);

  const onIncrement = (itemId) => {
    handleIncrement(itemId);
  };
  const onDecrease = (itemId) => {
    handleDecrease(itemId);
  };
  const makeCartZero = (itemId) => {
    isCartZero(itemId);
  };
  const makeAllZero = () => {
    allCartZero();
  };

  return (
    <Wrapper>
      <StyledH1>장 바 구 니</StyledH1>
      <StyledUl>
        {items.map((item) => (
          <li key={item.id}>
            <Menu>{item.name}</Menu>
            <RightSide>
              <ButtonAmountControl onClick={() => onDecrease(item.id)}>
                -
              </ButtonAmountControl>
              &nbsp;{item.isCart}&nbsp;
              <ButtonAmountControl onClick={() => onIncrement(item.id)}>
                +
              </ButtonAmountControl>
              &nbsp;&nbsp;
              <ButtonAmountControl onClick={() => makeCartZero(item.id)}>
                삭제
              </ButtonAmountControl>
            </RightSide>
          </li>
        ))}
      </StyledUl>
      <StyledH1>주문수량 : {totalAmount}개</StyledH1>
      <StyledH1>총 금액 : {totalPrice}원</StyledH1>
      <Style02>
        <Button1 onClick={() => makeAllZero()}>전체삭제</Button1>
        <Button2>결제</Button2>
      </Style02>
    </Wrapper>
  );
}

Cart.propTypes = {
  items: PropTypes.array,
  handleIncrement: PropTypes.func,
  handleDecrease: PropTypes.func,
  isCartZero: PropTypes.func,
  allCartZero: PropTypes.func,
};
export default Cart;
