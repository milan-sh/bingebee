import { Button } from "./components/ui/button"
import { Award } from "lucide-react"

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Button variant="default">Heelo</Button>
      <Award size={44} scale={2}/>
    </div>
  )
}

export default App