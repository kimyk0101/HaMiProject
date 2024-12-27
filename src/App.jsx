import React,{ useRef } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainScreen from "./component/MainScreen";
// import MenuScreen from "./component/MenuScreen";
import QRCode from "qrcode.react";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainScreen />} />
//         <Route path="/menu" element={<MenuScreen />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

const App = () => {
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  return (
    <div>
      <h1>QR 코드 생성 예제</h1>
      <QRCode value="https://example.com" />
      <QRCode
       value="https://example.com"
       size={256}
       bgColor="#ffffff"
       fgColor="#000000"
       level="H"
       includeMargin={true} />
    <div>
      <h1>QR 코드 다운로드</h1>
      <div ref={qrRef}>
        <QRCode value="http://example.com" size={256} />
      </div>
    <button onClick={downloadQRCode}>QR 코드 다운로드</button>
    </div>
      </div>   
  );
};
export default App;