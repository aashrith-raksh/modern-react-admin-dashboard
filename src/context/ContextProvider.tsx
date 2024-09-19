import {
  ChangeEvent,
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type StateContextType = {
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;

  isClicked: InitialStateType;
  setIsClicked: React.Dispatch<React.SetStateAction<InitialStateType>>;

  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;

  setColor: (color: string) => void;

  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  setMode: (e: ChangeEvent<HTMLInputElement>) => void;

  themeSetting: boolean;
  setThemeSetting: React.Dispatch<React.SetStateAction<boolean>>;

  screenSize?: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleClick: (key: InitialStateKey) => void;
};

interface InitialStateType {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

const initialState: InitialStateType = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

type InitialStateKey = keyof typeof initialState;

export const StateContext = createContext<StateContextType>({
  activeMenu: true,
  setActiveMenu: () => {},
  isClicked: initialState,
  setIsClicked: () => {},
  screenSize: undefined,
  setScreenSize: () => {},
  currentColor: "",
  setCurrentColor: () => {},
  setColor: () => {},

  currentMode: "",
  setCurrentMode: () => {},

  setMode: () => {},

  themeSetting: false,
  setThemeSetting: () => {},

  handleClick: () => {},
});

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSetting, setThemeSetting] = useState(false);

  const handleClick = (key: InitialStateKey): void => {
    setIsClicked({ ...initialState, [key]: true });
  };

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSetting(false);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSetting(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const contextValue: StateContextType = {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    screenSize,
    setScreenSize,
    handleClick,
    currentColor,
    setCurrentColor,
    setColor,
    themeSetting,
    setThemeSetting,
    setMode,
    setCurrentMode,
    currentMode,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
