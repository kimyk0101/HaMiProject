import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import OrderHistory from "/src/components/OrderHistory";
import PaymentSuccess from "/src/components/PaymentSuccess";
import KioskCountdownTimer from "/src/components/KioskCountdownTimer";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

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

const loadingSpinnerStyles = {
  loadingSpinner: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: "10px",
  },
};

function PaymentScreen({ onClose, items, totalAmount, totalPrice }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [orderId, setOrderId] = useState(1000); // 초기값 설정
  // 타이머 초기화를 위한 usestate
  const [timerKey, setTimerKey] = useState(0);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleCountdownEnd = () => {
    setShowCountdown(false);
    // 여기에 카운트다운이 끝났을 때 수행할 작업을 추가할 수 있습니다.

    // console.log 확인용으로 해놓음, 삭제할 것
    console.log("결제 시간이 종료되었습니다.");
    // 홈 화면으로 이동(추후 작업)
  };

  const handleMethodSelect = (method) => {
    setPaymentMethod(method);
    setTimerKey((prevKey) => prevKey + 1);
    setShowCountdown(true);
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

  const buttonStyle = (method) => ({
    padding: "20px",
    margin: "10px",
    border: `3px solid ${paymentMethod === method ? "#00BFFF" : "#ccc"}`,
    borderRadius: "10px",
    backgroundColor: paymentMethod === method ? "#E6F7FF" : "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "150px",
    height: "150px",
  });

  const imageStyle = {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  };

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
                    key={timerKey}
                    startFrom={30}
                    onCountdownEnd={handleCountdownEnd}
                  >
                    <img
                      src="/src/images/creditCardClock.png"
                      alt=""
                      style={imageStyle}
                    />
                  </KioskCountdownTimer>
                )}
              </div>
              <div className="order-summary">
                <OrderHistory orders={orders} />
              </div>
              <div className="payment-methods">
                <h3>결제 수단 선택</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      style={buttonStyle("card")}
                      onClick={() => handleMethodSelect("card")}
                    >
                      <img
                        src="/src/images/creditCard.png"
                        alt="카드"
                        style={imageStyle}
                      />
                      <span>카드</span>
                    </button>
                    <button
                      style={buttonStyle("cash")}
                      onClick={() => handleMethodSelect("cash")}
                    >
                      <img
                        src="/src/images/money.png"
                        alt="현금"
                        style={imageStyle}
                      />
                      <span>현금</span>
                    </button>
                  </div>
                  {paymentMethod && (
                    <div
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        style={buttonStyle("payment")}
                      >
                        <img
                          src="/src/images/payments.png"
                          alt="결제"
                          style={imageStyle}
                        />
                        <span>결제하기</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {isProcessing && (
                <div style={loadingSpinnerStyles.loadingSpinner}>
                  <TailSpin color="#00BFFF" height={80} width={80} />
                  <p style={loadingSpinnerStyles.loadingText}>
                    결제 처리 중...
                  </p>
                </div>
              )}
            </>
          ) : (
            // 주문내역 출력
            <PaymentSuccess orderDetails={orders[0]} />
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
