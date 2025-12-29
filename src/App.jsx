import AsideRight from "./components/sections/AsideRight"
import AsideLeft from "./components/sections/AsideLeft"
import Center from "./components/sections/Center"
import { ColorProvider } from "./contexts/ColorContext"
import { ToastProvider } from "./contexts/ToastContext"
import { useEffect, useState } from "react"
import Spinner from "./components/layout/Spinner"
import Footer from "./components/layout/Footer"
import InstallPrompt from "./components/common/InstallPrompt"

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Balance perfecto: suficiente para dar esencia sin afectar performance

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Verificar si ya está instalado como PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    // Mostrar el prompt siempre que sea móvil y no esté instalado
    if (isMobile && !isStandalone) {
      setShowInstallPrompt(true);
    }
  }, []);

  const handleDismissPrompt = () => {
    setShowInstallPrompt(false);
  };

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

          {/* Prompt de instalación para móviles */}
          {showInstallPrompt && <InstallPrompt onDismiss={handleDismissPrompt} />}
        </ColorProvider>
      )}
    </ToastProvider>
  );
}

export default App


