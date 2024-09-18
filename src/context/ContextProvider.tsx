import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

type StateContextType = {
  activeMenu: boolean;
  isClicked: InitialStateType;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClicked: React.Dispatch<React.SetStateAction<InitialStateType>>;
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
  screenSize:undefined,
  setScreenSize: () => {},
  handleClick: () => {},
});

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  const handleClick = (key: InitialStateKey): void => {
    setIsClicked({ ...initialState, [key]: true });
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
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
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
