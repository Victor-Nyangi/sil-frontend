import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Landing, Album, Photo, User } from "./views";
import { Footer, Header } from "./components"
const App = () => {
  const payload = JSON.parse(localStorage.getItem('payload'))
  const navigate = useNavigate()


  useEffect(() => {

    if (!payload) {
      navigate('/')
    }
  }, [payload, navigate])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        {
          payload?.token ?
            <>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/user/:user_id" element={<User />} />
              <Route path="/album/:album_id" element={<Album />} />
              <Route path="/photo/:photo_id" element={<Photo />} />
            </> :
            <>
              <Route path="*" element={<Landing />} />
            </>
        }

        <Route path="*" element={<Landing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
