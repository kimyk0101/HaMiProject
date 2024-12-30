/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
// import { useMemo } from "react";

function OrderHistory({ orders }) {
  return (
    <div className="order-history">
      <h2>주문 내역</h2>

      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderItem({ order }) {
  return (
    <div className="order-item">
      <p>
        <strong>주문 수량 : {order.totalAmount}개</strong>
        <br />
        <strong>주문 금액 : {order.totalPrice}원</strong>
      </p>
      <h3>주문 번호 : {order.id}</h3>

      <p>주문 날짜 : {order.date2}</p>
      <h4>구매 목록</h4>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.isCart}개 ({item.price * item.isCart}원)
          </li>
        ))}
      </ul>
    </div>
  );
}

OrderHistory.propTypes = {
  orders: PropTypes.array,
};

export default OrderHistory;
