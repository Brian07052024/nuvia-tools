import AsideRight from "./components/sections/AsideRight"
import AsideLeft from "./components/sections/AsideLeft"
import Center from "./components/sections/Center"
import { ColorProvider } from "./contexts/ColorContext"
import { ToastProvider } from "./contexts/ToastContext"
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
           
            <div className="lg:grid lg:grid-cols-10 lg:gap-2 lg:flex-1 w-full h-full p-2 overflow-hidden relative">

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


