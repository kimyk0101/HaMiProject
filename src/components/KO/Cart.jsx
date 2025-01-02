import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swal from "sweetalert2";

import PaymentScreen from "/src/components/KO/PaymentScreen";

/* styled-components */
const Wrapper = styled.div`
  width: 560px;
  height: 740px;
  position: absolute;
  margin-left: 1360px;
  margin-top: -920px;
  background-color: white;
`;
const StyledH1 = styled.h2`
  height: 100px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #4c4b4e;
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledUl = styled.ul`
  padding: 10px 0 0 20px;
  margin: 0;
  height: 510px;
  width: 530px;
  overflow: auto;
  list-style: none;
}
`;
const ButtonAmountControl = styled.button`
  border: 1px solid white;
  background-color: #b44b1e;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
  border-radius: 4px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  &:active {
    border: 2px solid #0021f3;
  }
`;
const RightSide = styled.a`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const Menu = styled.a`
  font-weight: bold;
  font-size: 30px;
`;
const Style02 = styled.a`
  display: flex;
  height: 100px;
  width: 560px;
`;
const Button1 = styled.button`
  border: 1px solid #4c4b4e;
  height: 100%;
  width: 50%;
  margin: 0;
  padding: 0;
  background-color: #b44b1e;
  color: white;
  padding: 10px 54px;
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
  font-family: "Varela Round", "Jua", serif;
  &:hover {
    border: 6px solid #0021f3;
  }
`;
const Button2 = styled.button`
  border: 1px solid #4c4b4e;
  height: 100%;
  width: 50%;
  margin: 0;
  padding: 0;
  background-color: #b44b1e;
  color: white;
  padding: 10px 54px;
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
  font-family: "Varela Round", "Jua", serif;
  &:hover {
    border: 6px solid #0021f3;
  }
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

  const [isPaymentScreenVisible, setIsPaymentScreenVisible] = useState(false);
  const handlePaymentButtonClick = () => {
    if (totalAmount === 0 || totalPrice === 0) {
      Swal.fire({
        icon: "info",
        title: "장바구니가 비어있습니다.",
        text: "상품을 추가해주세요.",
      });
    } else {
      setIsPaymentScreenVisible(true);
    }
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
        <Button2 onClick={handlePaymentButtonClick}>결제</Button2>
      </Style02>
      {isPaymentScreenVisible ? (
        <PaymentScreen
          onClose={() => setIsPaymentScreenVisible(false)}
          totalAmount={totalAmount}
          totalPrice={totalPrice}
          items={items}
          // PaymentScreen에 makeAllZero를 사용하기 위해 prop으로 전달
          makeAllZero={makeAllZero}
        />
      ) : null}
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
