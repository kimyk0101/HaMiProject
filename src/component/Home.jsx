import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleTouch = () => {
    navigate('/next');

    };

    return (
    <div style=
    {{display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      flexDirection: "coulmn",
    }}
    onTouchStart={handleTouch}>  

    <h1>키오스크 메인 화면</h1>
    <button style= 
    {{ padding: "10px 20px",
       fontSize: "18px",
       cursor: "pointer",
    }}    
    onClick={handleTouch}>다음 화면으로 이동</button>
    </div>
    );
}
export default Home;