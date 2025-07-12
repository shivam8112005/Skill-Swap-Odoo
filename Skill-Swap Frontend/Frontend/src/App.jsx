import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import ActiveRequests from './Pages/ActiveRequests'
import Chat from './Pages/Chat'
import PostRequests from './Pages/PostRequests'
import Profile from './Pages/Profile'
import ViewRequests from './Pages/ViewRequests'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Pages/Layout'
import LoginSignup from './Pages/LoginSignup'
import SummarizeQuiz from './Pages/SummarizeQuiz'
// import Auth from './Pages/Auth'
// import ChatRoom from './components/ChatRoom';
// import { Routes, Route } from 'react-router-dom';
// import ChatPage from './components/ChatPage';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null);
  return (
    <>
      <BrowserRouter>
        {/* <Routes>
        <Route 
          path="/"
          element={
            user ? <Navigate to="/home" /> : <Auth onAuth={setUser} />
          }
        />
        <Route 
          path="/home"
          element={
            user ? <Home user={user} /> : <Navigate to="/" />
          }
        />
      </Routes> */}

        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path='/active-requests' element={<ActiveRequests />} />
            <Route path='/send-request' element={<PostRequests />} />
            <Route path='/view-requests' element={<ViewRequests />} />
            <Route path='/login-signup' element={<LoginSignup />} />
            <Route path='/text-quiz' element={<SummarizeQuiz />} />
          </Route>
          {/* <Route path='/' element={<Home/>}></Route>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/> */}

        </Routes>
      </BrowserRouter>
      {/* <Home/> */}
    </>
  )
}

export default App

