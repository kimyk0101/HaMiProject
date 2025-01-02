import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainScreen from "/src/components/MainScreen";
// KO
import Header from "/src/components/KO/Header";
import MenuCategory from "/src/components/KO/MenuCategory";
import MenuList from "/src/components/KO/MenuList";
import Cart from "/src/components/KO/Cart";
// EN
import ENHeader from "/src/components/EN/ENHeader";
import ENMenuCategory from "/src/components/EN/ENMenuCategory";
import ENMenuList from "/src/components/EN/ENMenuList";
import ENCart from "/src/components/EN/ENCart";
// JP
import JPHeader from "/src/components/JP/JPHeader";
import JPMenuCategory from "/src/components/JP/JPMenuCategory";
import JPMenuList from "/src/components/JP/JPMenuList";
import JPCart from "/src/components/JP/JPCart";

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [setData, setSetData] = useState([]);
  const [cutletData, setCutletData] = useState([]);
  const [noodleData, setNoodleData] = useState([]);
  const [sideData, setSideData] = useState([]);

  const [ENcategoryData, setENCategoryData] = useState([]);
  const [ENsetData, setENSetData] = useState([]);
  const [ENcutletData, setENCutletData] = useState([]);
  const [ENnoodleData, setENNoodleData] = useState([]);
  const [ENsideData, setENSideData] = useState([]);

  const [JPcategoryData, setJPCategoryData] = useState([]);
  const [JPsetData, setJPSetData] = useState([]);
  const [JPcutletData, setJPCutletData] = useState([]);
  const [JPnoodleData, setJPNoodleData] = useState([]);
  const [JPsideData, setJPSideData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          menuCategoryResponse,
          setListResponse,
          cutletListResponse,
          noodleListResponse,
          sideListResponse,

          ENmenuCategoryResponse,
          ENsetListResponse,
          ENcutletListResponse,
          ENnoodleListResponse,
          ENsideListResponse,

          JPmenuCategoryResponse,
          JPsetListResponse,
          JPcutletListResponse,
          JPnoodleListResponse,
          JPsideListResponse,
        ] = await Promise.all([
          fetch("http://localhost:3000/menuCategory"),
          fetch("http://localhost:3000/setList"),
          fetch("http://localhost:3000/cutletList"),
          fetch("http://localhost:3000/noodleList"),
          fetch("http://localhost:3000/sideList"),

          fetch("http://localhost:3000/en-menuCategory"),
          fetch("http://localhost:3000/en-setList"),
          fetch("http://localhost:3000/en-cutletList"),
          fetch("http://localhost:3000/en-noodleList"),
          fetch("http://localhost:3000/en-sideList"),

          fetch("http://localhost:3000/jp-menuCategory"),
          fetch("http://localhost:3000/jp-setList"),
          fetch("http://localhost:3000/jp-cutletList"),
          fetch("http://localhost:3000/jp-noodleList"),
          fetch("http://localhost:3000/jp-sideList"),
        ]);

        const data1 = await menuCategoryResponse.json();
        const data2 = await setListResponse.json();
        const data3 = await cutletListResponse.json();
        const data4 = await noodleListResponse.json();
        const data5 = await sideListResponse.json();

        const data6 = await ENmenuCategoryResponse.json();
        const data7 = await ENsetListResponse.json();
        const data8 = await ENcutletListResponse.json();
        const data9 = await ENnoodleListResponse.json();
        const data10 = await ENsideListResponse.json();

        const data11 = await JPmenuCategoryResponse.json();
        const data12 = await JPsetListResponse.json();
        const data13 = await JPcutletListResponse.json();
        const data14 = await JPnoodleListResponse.json();
        const data15 = await JPsideListResponse.json();

        setCategoryData(data1);
        setSetData(data2);
        setCutletData(data3);
        setNoodleData(data4);
        setSideData(data5);

        setENCategoryData(data6);
        setENSetData(data7);
        setENCutletData(data8);
        setENNoodleData(data9);
        setENSideData(data10);

        setJPCategoryData(data11);
        setJPSetData(data12);
        setJPCutletData(data13);
        setJPNoodleData(data14);
        setJPSideData(data15);

        setAllMenuLists([...data2, ...data3, ...data4, ...data5]); // 데이터 병합: set, cutlet, noodle, side
        setENAllMenuLists([...data7, ...data8, ...data9, ...data10]); // 데이터 병합: ENset, ENcutlet, ENnoodle, ENside
        setJPAllMenuLists([...data12, ...data13, ...data14, ...data15]); // 데이터 병합: JPset, JPcutlet, JPnoodle, JPside
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리(클릭 이벤트)

  const [allMenuLists, setAllMenuLists] = useState([]);
  const [ENallMenuLists, setENAllMenuLists] = useState([]);
  const [JPallMenuLists, setJPAllMenuLists] = useState([]);

  const boughtItems = allMenuLists.filter((item) => item.isCart > 0);
  const ENboughtItems = ENallMenuLists.filter((item) => item.isCart > 0);
  const JPboughtItems = JPallMenuLists.filter((item) => item.isCart > 0);

  // KO
  // KO 수량 +1
  const handleIncrement = (itemId) => {
    setAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart + 1 } : item
      )
    );
  };

  // KO 수량 -1
  const handleDecrease = (itemId) => {
    setAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart - 1 } : item
      )
    );
  };

  // KO 삭제
  const isCartZero = (itemId) => {
    setAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: 0 } : item
      )
    );
  };

  // KO isCart 전체 삭제
  const allCartZero = () => {
    setAllMenuLists(allMenuLists.map((item) => ({ ...item, isCart: 0 })));
  };

  //  KO 코드 1: 메뉴를 직접 선택해도 cart에 수량을 추가할 수 있음
  /*
  const isCart = (itemId) => {
    setAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart + 1 } : item
      )
    );
  };
  */

  //  KO 코드 2: cart에 담기기 전에만 메뉴를 선택해서 수량을 +1하고, 이후에는 cart의 +를 사용해야만 수량이 추가됨
  const isCart = (itemId) => {
    setAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? { ...item, isCart: item.isCart === 0 ? 1 : item.isCart }
          : item
      )
    );
  };

  // EN
  // EN 수량 +1
  const ENhandleIncrement = (itemId) => {
    setENAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart + 1 } : item
      )
    );
  };

  // EN 수량 -1
  const ENhandleDecrease = (itemId) => {
    setENAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart - 1 } : item
      )
    );
  };

  // EN 삭제
  const ENisCartZero = (itemId) => {
    setENAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: 0 } : item
      )
    );
  };

  // EN isCart 전체 삭제
  const ENallCartZero = () => {
    setENAllMenuLists(ENallMenuLists.map((item) => ({ ...item, isCart: 0 })));
  };

  //  EN isCart
  const ENisCart = (itemId) => {
    setENAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? { ...item, isCart: item.isCart === 0 ? 1 : item.isCart }
          : item
      )
    );
  };

  // JP
  // JP 수량 +1
  const JPhandleIncrement = (itemId) => {
    setJPAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart + 1 } : item
      )
    );
  };

  // JP 수량 -1
  const JPhandleDecrease = (itemId) => {
    setJPAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: item.isCart - 1 } : item
      )
    );
  };

  // JP 삭제
  const JPisCartZero = (itemId) => {
    setJPAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, isCart: 0 } : item
      )
    );
  };

  // JP isCart 전체 삭제
  const JPallCartZero = () => {
    setJPAllMenuLists(JPallMenuLists.map((item) => ({ ...item, isCart: 0 })));
  };

  //  JP isCart
  const JPisCart = (itemId) => {
    setJPAllMenuLists((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? { ...item, isCart: item.isCart === 0 ? 1 : item.isCart }
          : item
      )
    );
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route
            path="/menu"
            element={
              <>
                {/* Header에 prop으로 '전체삭제' 함수를 사용하기 위해 전달 */}
                <Header
                  allCartZero={allCartZero}
                  setData={setData}
                  selectedCategory={selectedCategory}
                />
                <MenuCategory
                  categoryData={categoryData}
                  setSelectedCategory={setSelectedCategory}
                />
                <MenuList
                  isCart={isCart}
                  setData={setData}
                  cutletData={cutletData}
                  noodleData={noodleData}
                  sideData={sideData}
                  selectedCategory={selectedCategory}
                />
                <Cart
                  items={boughtItems}
                  handleIncrement={handleIncrement}
                  handleDecrease={handleDecrease}
                  isCartZero={isCartZero}
                  allCartZero={allCartZero}
                />
              </>
            }
          />
          <Route
            path="/ENmenu"
            element={
              <>
                <ENHeader allCartZero={ENallCartZero} />
                <ENMenuCategory
                  categoryData={ENcategoryData}
                  setSelectedCategory={setSelectedCategory}
                />
                <ENMenuList
                  isCart={ENisCart}
                  setData={ENsetData}
                  cutletData={ENcutletData}
                  noodleData={ENnoodleData}
                  sideData={ENsideData}
                  selectedCategory={selectedCategory}
                />
                <ENCart
                  items={ENboughtItems}
                  handleIncrement={ENhandleIncrement}
                  handleDecrease={ENhandleDecrease}
                  isCartZero={ENisCartZero}
                  allCartZero={ENallCartZero}
                />
              </>
            }
          />
          <Route
            path="/JPmenu"
            element={
              <>
                <JPHeader allCartZero={JPallCartZero} />
                <JPMenuCategory
                  categoryData={JPcategoryData}
                  setSelectedCategory={setSelectedCategory}
                />
                <JPMenuList
                  isCart={JPisCart}
                  setData={JPsetData}
                  cutletData={JPcutletData}
                  noodleData={JPnoodleData}
                  sideData={JPsideData}
                  selectedCategory={selectedCategory}
                />
                <JPCart
                  items={JPboughtItems}
                  handleIncrement={JPhandleIncrement}
                  handleDecrease={JPhandleDecrease}
                  isCartZero={JPisCartZero}
                  allCartZero={JPallCartZero}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
