import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Pages
import Openvidu from "./pages/Openvidu";
import Nav from "./component/common/Nav";
import MobileNav from "./component/common/MobileNav";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Broadcasts from "./pages/Broadcasts";
import MyPage from "./pages/MyPage";
import Interests from "./pages/Interests";
import NotFound from "./pages/NotFound";
import WriteItem from "./component/common/WriteItem";
import Notice from "./pages/Notice";
import SignIn from "./component/account/SignIn";
import Alarm from "./pages/Alarm";
import Admin from "./pages/Admin";
import SignUp from "./component/account/SignUp";
import FilterDetail from "./component/common/FilterDetail";
import OauthRedirect from "./component/account/OauthRedirect";


function App() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <BrowserRouter>
      {innerWidth > 700 ? <Nav /> : <MobileNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/filterdetail" element={<FilterDetail />}/>
        <Route path="/items/*" element={<Items />} />
        <Route path="/broadcasts/*" element={<Broadcasts />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/writeitems" element={<WriteItem />} />
        <Route path="/interests/*" element={<Interests />} />
        <Route path="/notices/*" element={<Notice />} />
        <Route path="/alarm/*" element={<Alarm />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/oauth2/redirect/" element={<OauthRedirect />} />
        <Route path="/live/:postId" element={<Openvidu />} />
        {/*일치하지 않는 모든 page는 NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;