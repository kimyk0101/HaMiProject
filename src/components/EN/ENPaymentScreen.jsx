/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { QRCodeCanvas } from "qrcode.react";

import PropTypes from "prop-types";
import styled from "styled-components";

import OrderHistory from "/src/components/EN/ENOrderHistory";
import PaymentSuccess from "/src/components/EN/ENPaymentSuccess";
import KioskCountdownTimer from "/src/components/EN/ENKioskCountdownTimer";

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
  height: 800px;
  overflow-y: auto;
  font-size: 20px;
`;
const ButtonClose = styled.button`
  background-color: #f47e28;
  margin-left: 400px;
  margin-top: 60px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    border: 4px solid #0021f3;
  }
`;

const QRWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const PaymentMethods = styled.div`
  background-color: #f47e28;
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  padding: 40px;
  overflow-y: auto;
  font-size: 30px;
  text-align: center;
`;
const ButtonPay = styled.div`
  margin-top: 207px;
  background-color: yellow;
  &:hover {
    border: 4px solid #0021f3;
  }
  &:hover {
    border: 4px solid #0021f3;
  }
`;
const Pay = styled.div`
  color: #f47e28;
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
function PaymentScreen({
  onClose,
  items,
  totalAmount,
  totalPrice,
  makeAllZero,
}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const [timerKey, setTimerKey] = useState(0);

  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  const handlePayment = () => {
    if (paymentMethod === "qr") {
      setShowQRCode(true);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 2000);
    } else {
      setShowQRCode(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  const [orderId, setOrderId] = useState(() => {
    const storedValue = sessionStorage.getItem("paymentCount");
    return storedValue ? parseInt(storedValue) : 1000;
  });
  useEffect(() => {
    sessionStorage.setItem("paymentCount", orderId);
  }, [orderId]);
  const handleClose = () => {
    onClose();
  };
  const handleCompleteClose = () => {
    setOrderId((prevOrderId) => {
      const updatedOrderId = prevOrderId + 1;
      console.log("Updated OrderId:", updatedOrderId);
      return updatedOrderId;
    });
    makeAllZero();
    setTimeout(() => {
      onClose();
      toHome();
    }, 50);
  };

  const handleCompleteClose2 = () => {
    setOrderId((prevOrderId) => {
      const updatedOrderId = prevOrderId + 1;
      console.log("Updated OrderId:", updatedOrderId);
      return updatedOrderId;
    });
  };

  const handleCountdownEnd = () => {
    setShowCountdown(false);
    onClose();
  };

  const handleMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "qr") {
      setShowQRCode(true);
      setTimerKey((prevKey) => prevKey + 1);
      setShowCountdown(true);
    } else {
      setShowQRCode(false);
      setTimerKey((prevKey) => prevKey + 1);
      setShowCountdown(true);
    }
  };

  const orderDate = new Date();
  const options = {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const options2 = {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = orderDate.toLocaleString("en-US", options);
  const formattedDate2 = orderDate.toLocaleString("en-US", options2);
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
    if (isComplete) {
      const timer = setTimeout(() => {
        makeAllZero();
        toHome();
        handleCompleteClose2();
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onClose, toHome]);

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

  const qrCodeValue = `http://localhost:5175/menu'?orderId=${orderId}&amount=${totalPrice}`; // 결제 URL
  return (
    <ModalOverlay>
      <ModalContent>
        <div className="payment-screen">
          {!isComplete ? (
            <>
              <Pay>
                <h2>Payment Screen</h2>
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
                {showQRCode && (
                  <QRWrapper>
                    <QRCodeCanvas value={qrCodeValue} size={200} />
                    <p>Please scan the QR code to pay.</p>
                  </QRWrapper>
                )}
              </Pay>
              <div className="order-summary">
                <OrderHistory orders={orders} />
              </div>
              <PaymentMethods>
                <div className="payment-methods">
                  <br />
                  <h2>Select Payment Option</h2>
                  <br />
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
                        <span>Credit Card</span>
                      </button>
                      <br />
                      <button
                        style={buttonStyle("cash")}
                        onClick={() => handleMethodSelect("cash")}
                      >
                        <img
                          src="/src/images/money.png"
                          alt="현금"
                          style={imageStyle}
                        />
                        <span>Cash</span>
                      </button>
                      <br />
                      <button
                        style={buttonStyle("qr")}
                        onClick={() => handleMethodSelect("qr")}
                      >
                        <img
                          src="/src/images/image.png"
                          alt="QR 코드"
                          style={imageStyle}
                        />
                        <span>QR Code</span>
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
                        <ButtonPay>
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
                            <span>Pay</span>
                          </button>
                        </ButtonPay>
                      </div>
                    )}
                  </div>
                </div>
              </PaymentMethods>
              {isProcessing && (
                <div style={loadingSpinnerStyles.loadingSpinner}>
                  <TailSpin color="#00BFFF" height={80} width={80} />
                  <p style={loadingSpinnerStyles.loadingText}>
                    Processing Payment...
                  </p>
                </div>
              )}
            </>
          ) : (
            <PaymentSuccess orderDetails={orders[0]} />
          )}
          {isComplete && (
            <ButtonClose onClick={handleCompleteClose}>Close</ButtonClose>
          )}
          {!isComplete && (
            <ButtonClose onClick={handleClose}>Close</ButtonClose>
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
  makeAllZero: PropTypes.func.isRequired,
};
export default PaymentScreen;
