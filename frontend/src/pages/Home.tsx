import home from "@/assets/home.png"
import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div className="bg-black text-white flex flex-col items-center py-8">
        <img className="rounded-lg md:w-auto w-96" src={home} alt="home" />
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl md:text-6xl font-bold">Welcome to <span className="text-accent underline decoration-primary ">BingeBee</span></h1>
            <p className="text-gray-400 w-72 md:w-auto md:mt-4 md:text-lg text-center">Your one-stop solution for all your binge-watching needs.</p>
            <Button className="mt-6 bg-card hover:bg-foreground hover:text-white hover:border hover:border-white text-black font-semibold md:text-lg px-6 py-2 rounded-lg cursor-pointer">
              Get Started
            </Button>
        </div>
    </div>
  )
}

export default Home