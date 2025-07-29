import { Outlet } from "react-router"
import { Navbar, Footer } from "./components"

const App = () => {
  return (
    <>
      <Navbar/>
      <main className="w-full min-h-[80vh] bg-black">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App