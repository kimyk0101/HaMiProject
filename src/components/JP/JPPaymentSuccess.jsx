import { CountdownCircleTimer } from "react-countdown-circle-timer";
import PropTypes from "prop-types";
import styled from "styled-components";

const PaymentComplete = styled.section`
  color: #f47e28;
`;
const OrderSummary = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
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
          ? "トップページに戻ります。"
          : "お支払いが完了しました"}
      </Text>
      {remainingTime !== 0 && (
        <>
          <Text>ありがとうございます</Text>
          <Value>{remainingTime}</Value>
        </>
      )}
    </Timer>
  );
};

function PaymentSuccess({ orderDetails }) {
  if (!orderDetails) {
    return <div>チュウモン ジョウホウ オ シュトク チュウデス...</div>;
  }

  return (
    <div className="payment-success">
      <PaymentComplete>
        <h2>お支払いが完了しました！</h2>
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
        <h2>ちゅうもんサマリー</h2>
        <OrderSummary>
          <li>&nbsp; チュウモン バンゴウ : {orderDetails.id || "정보 없음"}</li>
          <li>&nbsp; チュウモン ニチジ : {orderDetails.date || "정보 없음"}</li>
          <li>&nbsp; ゴウケイ キンガク : {orderDetails.totalPrice}ウォン</li>
        </OrderSummary>

        <h2>チュウモン リレキ</h2>
        <OrderSummary>
          {orderDetails.items?.map((item) => (
            <li key={item.id}>
              &nbsp; {item.name} - {item.isCart} (
              {(item.isCart * item.price || 0).toLocaleString()}ウォン)
            </li>
          )) || <li>チュウモン ショウヒン ハ アリマセン。</li>}
        </OrderSummary>
      </div>
    </div>
  );
}

PaymentSuccess.propTypes = {
  orderDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default PaymentSuccess;
