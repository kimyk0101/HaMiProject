# HAMI 돈가스 키오스크 프로젝트

> 풀스택 웹 개발 과정 중 두 번째로 진행한 1920x1080 해상도를 기준으로 설계된 키오스크 UI 프로젝트입니다.
> 다양한 디바이스 대응은 추후 반응형 확장 시 고려할 수 있도록 구조화되어 있습니다.
> 사용자가 키오스크에서 직접 주문할 수 있는 흐름을 React 기반으로 구성하였고,  
> 언어 선택, 메뉴 선택, 장바구니, 결제 시뮬레이션까지의 기능을 구현했습니다.

---

## 프로젝트 기간
- 2024.12.24 ~ 2025.01.03 (11일간)

---

## 대표 이미지

![HAMI Logo](./public/image.png)

---

## 폴더 구조

```txt
public/
├── image.png
├── video-sufer.mp4.mp4
├── vite.svg

src/
├── assets/
│   └── react.svg
├── components/
│   ├── EN/
│   │   ├── ENCart.jsx
│   │   ├── ENHeader.jsx
│   │   ├── ENKioskCountdownTimer.jsx
│   │   ├── ENMenuCategory.jsx
│   │   ├── ENMenuList.jsx
│   │   ├── ENOrderHistory.jsx
│   │   ├── ENPaymentScreen.jsx
│   │   └── ENPaymentSuccess.jsx
│   ├── JP/
│   ├── KO/
│   └── MainScreen.jsx
├── images/
├── js/
│   └── loading-bar.min.js
│   └── styles/
│       └── loading-bar.min.css
├── video/
├── App.css
├── App.jsx
├── main.jsx

프로젝트 루트/
├── README.md
├── db.json
├── index.html
├── package.json
├── vite.config.js
```
---

## 사용 기술

- React.js (Vite 기반)  
- JavaScript (JSX)  
- CSS  
- JSON (데이터 및 다국어 번역 시도용)  
- Git / GitHub

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 언어 선택 | 메인화면에서 한국어 / 영어 / 일본어 선택 가능 |
| 메뉴 선택 | 카테고리 별 메뉴 리스트 출력, 선택 시 자동 장바구니 등록 |
| 장바구니 | 선택된 메뉴들의 가격 합산 및 리스트 출력 |
| 결제 시뮬레이션 | 실제 결제 없이 결제 완료 화면으로 이동 |
| 다국어 UI 구성 | 언어별 컴포넌트 분리 방식으로 UI 구성 (EN, JP, KO) |
| QR 기능 시도 | 키오스크 화면을 모바일에서도 볼 수 있게 QR 코드 기능 구현 시도 (미완성) |

---

## 데이터 예시 구조 (db.json 일부)

```json
{
  "menuCategory": [
    { "id": "A", "title": "세트" },
    { "id": "B", "title": "돈가츠" }
  ],
  "setList": [
    { "id": 1, "name": "어린이 세트", "price": 9000, "isCart": 0 }
  ]
}
```

> 메뉴를 category 별로 나누고 리스트 형태로 분리하여 담았으나,  
> 나중에 전체 메뉴를 flat하게 정리한 뒤 카테고리로 분류하는 방식이 더 효과적이라는 걸 알게 되었습니다.

---

## 느낀 점

> 이 프로젝트에서 가장 기억에 남는 부분은 **다국어 UI 처리 방식**입니다.  
> 처음에는 JSON을 활용해 번역 데이터를 컴포넌트에 주입하려 했지만,  
> 구조 설계 방식의 문제로 인해 라이브러리와의 연동이 어려웠고,  
> 결국 **컴포넌트를 언어별로 분리**하는 방식으로 대체했습니다.  
> 나중에 회고를 통해 **데이터 구조 설계의 중요성**을 크게 느꼈고,  
> 다른 팀의 방식을 참고하며 더 나은 방식에 대한 인사이트를 얻을 수 있었습니다.

---

## 개선 및 회고

- QR 코드를 통한 화면 이동 기능은 구현은 되었으나 배포 미완성 상태로 메인 화면만 확인 가능  
- 메뉴 데이터 구조를 category 중심으로 쪼개기보다 flat하게 만들고 분류하는 방식이 더 유연했을 것  
- 언어 처리 시 i18n 라이브러리 등의 활용법에 대해 더 깊게 고민해볼 필요성을 느낌
