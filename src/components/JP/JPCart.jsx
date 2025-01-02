import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swal from "sweetalert2";

import PaymentScreen from "/src/components/JP/JPPaymentScreen";

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
  font-size: 34px;
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
  font-size: 23px;
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
  font-size: 24px;
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
  }, [items]);

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
        title: "商品を追加してください。",
        text: "カートは空です。",
      });
    } else {
      setIsPaymentScreenVisible(true);
    }
  };

  return (
    <Wrapper>
      <StyledH1>カート</StyledH1>
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
                さくじょ
              </ButtonAmountControl>
            </RightSide>
          </li>
        ))}
      </StyledUl>
      <StyledH1>ごうけいすうりょう : {totalAmount}</StyledH1>
      <StyledH1>ごうけいきんがく : {totalPrice}ウォン</StyledH1>
      <Style02>
        <Button1 onClick={() => makeAllZero()}>すべてさくじょ</Button1>
        <Button2 onClick={handlePaymentButtonClick}>けっさい</Button2>
      </Style02>
      {isPaymentScreenVisible ? (
        <PaymentScreen
          onClose={() => setIsPaymentScreenVisible(false)}
          totalAmount={totalAmount}
          totalPrice={totalPrice}
          items={items}
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
