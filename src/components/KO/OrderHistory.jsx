/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import styled from "styled-components";

const Order = styled.section`
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

const OrderList = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

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
      <Order>
        <OrderList>
          <li>&nbsp; 주문 수량 : {order.totalAmount}개</li>

          <li>&nbsp; 주문 금액 : {order.totalPrice}원</li>
        </OrderList>
      </Order>

      <h2>주문 번호</h2>
      <Order>{order.id}</Order>

      <h2>주문 날짜</h2>
      <Order>{order.date2}</Order>

      <h2>구매 목록</h2>
      <OrderList>
        {order.items.map((item) => (
          <li key={item.id}>
            &nbsp; {item.name} - {item.isCart}개 ({item.price * item.isCart}원)
          </li>
        ))}
      </OrderList>
    </div>
  );
}

OrderHistory.propTypes = {
  orders: PropTypes.array,
};

export default OrderHistory;
