import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { useState } from "react";
import { me } from "./API/auth.js";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("userId") || null);
  if(user){
    me(user).then((res) => {
      if (!res.data.status) {
        localStorage.removeItem("userId"); setUser(null);
      }
    }).catch((err) => {
      localStorage.removeItem("userId"); setUser(null); 
    }) 
  }
  return (
    <>
        {user ? (<ChatPage username={user} />) : (<LoginPage setUser={setUser} />)}
    </>
  )

}
