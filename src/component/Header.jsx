import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* styled-components */
const Wrapper = styled.div`
  padding: 1em;
  background: rgba(122, 9, 145, 0.25);
  // width: 100%;
  width: 1500px;
`;
const Title = styled.h1`
  color: yellow;
  text-align: center;
  // width: 100%;
  width: 1500px;
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
