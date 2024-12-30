import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* styled-components */
const Wrapper = styled.div`
  width: 1920px;
  height: 160px;
  margin: 0;
  padding: 0;
  background: #f47e28;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 90px;
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
          width: "75px",
          position: "absolute",
          top: "40px",
          right: "calc(100% - 1350px)",
          cursor: "pointer",
        }}
        onClick={toHome}
      />
    </Wrapper>
  );
}
export default Header;
