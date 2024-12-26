import React from "react";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate();

  // 화면 터치 이벤트 처리
  const handleTouch = () => {
    navigate("/menu"); // 메뉴 화면으로 이동
  };

  return (
    <div
      onClick={handleTouch}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* 동영상 추가 */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/video-sufer.mp4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 텍스트 오버레이 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        화면을 터치하세요.
      </div>
    </div>
  );
};

export default MainScreen;
