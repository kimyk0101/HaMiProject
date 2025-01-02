import { CountdownCircleTimer } from "react-countdown-circle-timer";
import PropTypes from "prop-types";
import styled from "styled-components";

const PaymentComplete = styled.section`
  color: #f47e28;
`;
const OrderSummary = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;

  li {
    padding: 7px;
    &:before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 5px;
      border-radius: 50%;
      background-color: #f47e28;
    }
  }
`;

const Timer = styled.div`
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.span`
  color: #aaa;
`;
const Value = styled.span`
  font-size: 40px;
`;
const renderTime = ({ remainingTime }) => {
  return (
    <Timer>
      <Text>
        {remainingTime === 0
          ? "You will be redirected to the home page."
          : "Payment complete."}
      </Text>
      {remainingTime !== 0 && (
        <>
          <Text>Thank you.</Text>
          <Value>{remainingTime}</Value>
        </>
      )}
    </Timer>
  );
};

function PaymentSuccess({ orderDetails }) {
  if (!orderDetails) {
    return <div>Retrieving order information...</div>;
  }

  return (
    <div className="payment-success">
      <PaymentComplete>
        <h2>Payment complete!</h2>
      </PaymentComplete>
      <CountdownCircleTimer
        isPlaying
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      >
        {renderTime}
      </CountdownCircleTimer>
      <br />
      <div className="order-summary">
        <h2>Order Summary</h2>
        <OrderSummary>
          <li>&nbsp; Order Number : {orderDetails.id || "정보 없음"}</li>
          <li>
            &nbsp; Order Date and Time : {orderDetails.date || "정보 없음"}
          </li>
          <li>&nbsp; Total Amount : {orderDetails.totalPrice}won</li>
        </OrderSummary>

        <h2>Order Details</h2>
        <OrderSummary>
          {orderDetails.items?.map((item) => (
            <li key={item.id}>
              &nbsp; {item.name} - {item.isCart} (
              {(item.isCart * item.price || 0).toLocaleString()}won)
            </li>
          )) || <li>No items in order.</li>}
        </OrderSummary>
      </div>
    </div>
  );
}

PaymentSuccess.propTypes = {
  orderDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default PaymentSuccess;
