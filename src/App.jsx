import AsideRight from "./components/sections/AsideRight"
import AsideLeft from "./components/sections/AsideLeft"
import Center from "./components/sections/Center"
import { ColorProvider } from "./contexts/ColorContext"
import { ToastProvider } from "./contexts/ToastContext"
import Header from "./components/layout/Header"
import { useEffect, useState } from "react"
import Spinner from "./components/layout/Spinner"
import Footer from "./components/layout/Footer"

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      {isLoading ? (
        <Spinner />
      ) : (
        <ColorProvider>
          <div className="h-lvh w-full bg-gray-200 flex flex-col overflow-hidden">
            {/* <Header /> */}
            <div className="grid grid-cols-10 gap-4 flex-1 w-full p-4 overflow-hidden relative">
              <AsideLeft />
              <Center />
              <AsideRight />
              <Footer />
            </div>
          </div>
        </ColorProvider>
      )}
    </ToastProvider>
  );
}

export default App
