import { useAuth } from "@/context/AuthCotext"


const Home = () => {
  const {user} = useAuth()
  // console.log(user)
  return (
    <div className="bg-black text-white">
        Home
        <img className="h-80" src={user?.avatar} alt="" />
    </div>
  )
}

export default Home