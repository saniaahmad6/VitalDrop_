
import React from 'react';

import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from './routes/Login';
import Signup from "./routes/Signup";
import Admin from './routes/Admin';
import Search from './routes/Search';
import User from "./routes/User";
import CreateCenter from "./routes/CreateCenter"
import AdminUser from "./routes/AdminUser"
import UserInfo from './components/User/UserInfo';
import Donate from './components/Donate/Donate';
import Receive from './components/Receive/Receive';
import UpdateUser from './components/UpdateUser/UpdateUser'
import UpdateAdmin from './components/UpdateAdmin/UpdateAdmin'
import AdminUserInfo from './components/AdminUser/UserInfo'
import { MapPage } from './routes/Map';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/adminlogin" element={<Admin />} />
        <Route path="/adminlogin/adminsignup" element={<CreateCenter />} />
        <Route path="/login/user" element={<User />}>
          <Route path="/login/user/" element={<UserInfo />} />
          <Route path="/login/user/donate" element={<Donate />} />
          <Route path="/login/user/receive" element={<Receive />} />
          <Route path="/login/user/update" element={<UpdateUser/>} />
        </Route>
        
        <Route path="/adminlogin/adminuser" element={<AdminUser />} >
          <Route path="/adminlogin/adminuser/" element={<AdminUserInfo />} />
          <Route path="/adminlogin/adminuser/update" element={<UpdateAdmin />} />
        </Route>
        
        <Route path="/map/:centerId" element={<MapPage></MapPage>}/>
      </Routes>
    </div>
  );
}

export default App;