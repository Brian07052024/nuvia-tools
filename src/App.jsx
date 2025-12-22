import AsideRight from "./components/sections/AsideRight"
import AsideLeft from "./components/sections/AsideLeft"
import Center from "./components/sections/Center"
import { ColorProvider } from "./contexts/ColorContext"

function App() {


  return (
    <ColorProvider>
      <div className="h-lvh w-full bg-gray-200 ">
        <div className="grid grid-cols-10 gap-4 h-full w-full p-4">
          <AsideLeft />
          <Center />
          <AsideRight />
        </div>
      </div>
    </ColorProvider>
  )
}

export default App
