import { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const TimerContainer = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => (props.$isWarning ? "#ff0000" : "#333")};
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeUnit = styled.span`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0 0.2rem;
  color: ${(props) => (props.$isWarning ? "#ff0000" : "inherit")};
`;

function KioskCountdownTimer({ startFrom, onCountdownEnd, children }) {
  const [timeLeft, setTimeLeft] = useState(startFrom);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onCountdownEnd();
      Swal.fire({
        icon: "warning",
        title: "결제 시간이 종료!",
        text: "결제 시간이 종료되었습니다.",
      });
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    //  10초에서 숫자가 빨간색으로 긴박한 느낌주기
    if (timeLeft <= 10) {
      setIsWarning(true);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, onCountdownEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // 오류 1. React는 DOM 요소의 `isWarning` 소품을 인식하지 못합니다.
  // 의도적으로 DOM에 사용자 정의 속성으로 표시하려면 대신
  // 소문자 'iswarning'으로 철자를 입력하세요.
  // 해결 -> iswarning으로 바꿔주면 해결하지만 다른 오류가 나옴

  // 오류 2.경고: 부울이 아닌 속성 `iswarning`에 대해 `false`를 받았습니다.
  // DOM에 쓰려면 대신 문자열
  // (iswarning="false" 또는 iswarning={value.toString()})을 전달하세요
  // 해결 -> iswarning 앞에 $를 붙여줘서 해결 (transient props)

  // styled-components는 컴포넌트에 전달된 모든 props를
  // 기본적으로 DOM 요소에 전달함.
  // 그러나 iswarning은 HTML의 표준 속성이 아니기 때문에,
  // React는 이를 DOM에 전달하려고 할 때 경고를 발생시킴
  // 이때 주의할 점은 스타일적으로 쓰는거 외에는 사용하면 안됨.
  // 이유는 스타일적으로 쓰는데 굳이 DOM에 올라가서 헷갈리게 할 필요없고,
  // 경고도 같이 뜨기 때문에

  return (
    <TimerContainer $isWarning={isWarning}>
      {children}
      <TimeUnit $isWarning={isWarning}>
        {minutes.toString().padStart(2, "0")}
      </TimeUnit>
      <span>:</span>
      <TimeUnit $isWarning={isWarning}>
        {seconds.toString().padStart(2, "0")}
      </TimeUnit>
    </TimerContainer>
  );
}

KioskCountdownTimer.propTypes = {
  startFrom: PropTypes.number,
  onCountdownEnd: PropTypes.func,
  children: PropTypes.node,
};

export default KioskCountdownTimer;
