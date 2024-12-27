// // MenuScreen.jsx
// import React from "react";

// const MenuScreen = () => {
//   const menuItems = [
//     { id: 1, name: "햄버거", price: 5000 },
//     { id: 2, name: "피자",   price: 12000 },
//     { id: 3, name: "치킨",   price: 15000 },
//     { id: 4, name: "콜라",   price: 2000 },
//   ];

//   return (
//     <div
//       style={{
//         padding: "20px",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#F5F5F5",
//         height: "100vh",
//       }}
//     >
//       <h1 style={{ textAlign: "center", marginBottom: "20px" }}>메뉴</h1>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {menuItems.map((item) => (
//           <li
//             key={item.id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "10px 20px",
//               margin: "10px 0",
//               backgroundColor: "#FFF",
//               borderRadius: "8px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <span>{item.name}</span>
//             <span>{item.price.toLocaleString()}원</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default MenuScreen;
