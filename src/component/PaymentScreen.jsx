import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import OrderHistory from "/src/components/OrderHistory";
import PaymentSuccess from "/src/components/PaymentSuccess";
import KioskCountdownTimer from "/src/components/KioskCountdownTimer";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  width: 500px;
  height: 600px;
  overflow-y: auto;
`;

const ButtonClose = styled.button`
  background-color: #c19a6b;
  margin-left: 400px;

  font-size: 20px;
  font-weight: bold;
`;

function PaymentScreen({ onClose, items, totalAmount, totalPrice }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [orderId, setOrderId] = useState(1000); // 초기값 설정

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleClose = () => {
    // 일반적인 닫기 버튼 기능 (예: 모달 닫기)
    onClose();
  };

  const handleCompleteClose = () => {
    // orderId 상태를 안전하게 업데이트
    setOrderId((prevOrderId) => {
      const updatedOrderId = prevOrderId + 1;
      console.log("Updated OrderId:", updatedOrderId); // 디버깅용 로그
      return updatedOrderId;
    });

    // 모달 닫기를 상태 업데이트 이후에 실행
    setTimeout(() => {
      onClose();
    }, 50);
  };

  const handleCountdownEnd = () => {
    setShowCountdown(false);
    // 여기에 카운트다운이 끝났을 때 수행할 작업을 추가할 수 있습니다.
    console.log("결제 시간이 종료되었습니다.");
  };

  const orderDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const options2 = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = orderDate.toLocaleString("ko-KR", options);
  const formattedDate2 = orderDate.toLocaleString("ko-KR", options2);

  const orders = [
    {
      id: orderId,
      date: formattedDate,
      date2: formattedDate2,
      totalAmount: totalAmount,
      totalPrice: totalPrice,
      items: items,
    },
  ];

  useEffect(() => {
    if (paymentMethod) {
      setShowCountdown(true);
    }
  }, [paymentMethod]);
  useEffect(() => {
    console.log("orderId:", orderId); // orderId가 변경될 때마다 콘솔에 출력
  }, [orderId]);

  return (
    <ModalOverlay>
      <ModalContent>
        <div className="payment-screen">
          {!isComplete ? (
            <>
              <div>
                <h2>결제 화면</h2>

                {showCountdown && (
                  <KioskCountdownTimer
                    startFrom={30}
                    onCountdownEnd={handleCountdownEnd}
                  >
                    <img src="/src/images/creditCardClock.png" alt="" />
                  </KioskCountdownTimer>
                )}
              </div>

              <div className="order-summary">
                <OrderHistory orders={orders} />
              </div>

              <div className="payment-methods">
                <h3>결제 수단 선택</h3>
                <button onClick={() => setPaymentMethod("card")}>
                  <img src="/src/images/creditCard.png" alt="카드" />
                </button>
                <button onClick={() => setPaymentMethod("cash")}>
                  <img src="/src/images/money.png" alt="현금" />
                </button>
              </div>

              {paymentMethod && (
                <button onClick={handlePayment} disabled={isProcessing}>
                  <img src="/src/images/payments.png" alt="결제" />
                </button>
              )}

              {isProcessing && <div>결제 처리 중...</div>}
            </>
          ) : (
            <PaymentSuccess orderDetails={orders[0]} />
          )}
          {isComplete && (
            <ButtonClose onClick={handleCompleteClose}>닫기+1</ButtonClose>
          )}
          {!isComplete && (
            <ButtonClose onClick={handleClose}>그냥닫기</ButtonClose>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

PaymentScreen.propTypes = {
  items: PropTypes.array,
  totalAmount: PropTypes.number,
  totalPrice: PropTypes.number,
  onClose: PropTypes.func,
};

export default PaymentScreen;
