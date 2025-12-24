import AsideRight from "./components/sections/AsideRight"
import AsideLeft from "./components/sections/AsideLeft"
import Center from "./components/sections/Center"
import { ColorProvider } from "./contexts/ColorContext"
import Header from "./components/layout/Header"

function App() {


  return (
    <ColorProvider>
      <div className="h-lvh w-full bg-gray-200 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <div className="grid grid-cols-10 gap-4 flex-1 w-full p-4 overflow-hidden">
          <AsideLeft />
          <Center />
          <AsideRight />
        </div>
      </div>
    </ColorProvider>
  )
}

export default App
