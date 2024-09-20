import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar, Footer, ThemeSettings } from "../components";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";

const RootLayout = () => {
  const {
    activeMenu,
    themeSetting,
    setThemeSetting,
    currentMode,
    currentColor,
    setCurrentColor,
    setCurrentMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    const messageBar = Array.from(document.querySelectorAll("div")).find(
      (el) =>
        el.innerText.includes(
          "This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included."
        ) 
    );
    if (messageBar) {
        messageBar.remove();
    }

    const popup = document.querySelector('div[style*="position: fixed"]');
    if (popup) {
      popup.remove();
    }
}, []);



  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">

        {/* SETTINGS ICON - RIGHT BOTTOM */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent
            content="Settings"
            // position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSetting(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>


        {/* SIDEBAR  */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}


        <div
        id="navbar-container"
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg  min-h-screen  w-full md:ml-72  "
              : "dark:bg-main-dark-bg  bg-main-bg  min-h-screen  w-full flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSetting && <ThemeSettings />}

            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
