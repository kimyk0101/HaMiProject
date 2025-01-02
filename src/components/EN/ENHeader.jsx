import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const HomeButton = styled.img`
  width: 75px;
  position: absolute;
  top: 40px;
  right: calc(100% - 1500px);
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;

/* Header-components */
function Header({ allCartZero }) {
  const navigate = useNavigate();

  const toHome = () => {
    allCartZero();
    navigate("/");
  };
  return (
    <Wrapper>
      <Title>HA.MI DONKATSU</Title>
      <HomeButton src="/src/images/Home.svg" onClick={toHome} />
    </Wrapper>
  );
}

Header.propTypes = {
  allCartZero: PropTypes.func.isRequired,
};
export default Header;
