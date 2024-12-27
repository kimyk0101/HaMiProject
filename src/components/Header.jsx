import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* styled-components */
const Wrapper = styled.div`
  width: 1500px;
  height: 60px;
  margin: 0;
  padding: 0;
  background: #8b4513;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

/* Header-components */
function Header() {
  const navigate = useNavigate();

  // 홈 화면으로
  const toHome = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <Title>HA.MI 돈카츠</Title>
      <img
        src="/src/images/Home.svg"
        style={{
          width: "50px",
          position: "absolute",
          top: "43px",
          right: "500px",
          cursor: "pointer",
        }}
        onClick={toHome}
      />
    </Wrapper>
  );
}
export default Header;
