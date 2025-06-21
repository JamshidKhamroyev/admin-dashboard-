import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/home"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import { useSelector } from "react-redux"
import Login from "./components/login"

const App = () => {
  const { mode } = useSelector(state => state.mode)
  const isUser = localStorage.getItem("token") || undefined

  return (
    <>
      {isUser ? (
        <div className={`w-[100vw] relative min-h-screen duration-500 flex justify-start gap-3 items-start ${mode && "dark_mode"}`}>
          <div className="md:pl-2 w-full">
            <BrowserRouter >
              <Routes>
                <Route path="/" element={<Home />}/>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  )
}

export default App