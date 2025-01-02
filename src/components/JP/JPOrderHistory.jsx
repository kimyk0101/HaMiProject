/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import styled from "styled-components";

const Order = styled.section`
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

const OrderList = styled.ul`
  list-style: none;
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
      <h2>チュウモン リレキ</h2>

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
          <li>&nbsp; チュウモン スウリョウ : {order.totalAmount}</li>

          <li>&nbsp; チュウモン キングカク : {order.totalPrice}ウォン</li>
        </OrderList>
      </Order>

      <h2>チュウモン バンゴウ</h2>
      <Order>{order.id}</Order>

      <h2>チュウモン ニチジ</h2>
      <Order>{order.date2}</Order>

      <h2>コウニュウ リスト</h2>
      <OrderList>
        {order.items.map((item) => (
          <li key={item.id}>
            &nbsp; {item.name} - {item.isCart} ({item.price * item.isCart}
            ウォン)
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
