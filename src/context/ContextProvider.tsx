import { createContext, FC, ReactNode, useContext, useState } from "react";

type StateContextType = {
  activeMenu: boolean;
  initialState: InitialStateType;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
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


export const StateContext = createContext<StateContextType>({
  activeMenu:true,
  initialState:initialState,
  setActiveMenu:() => {}

});


export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);

  const contextValue: StateContextType = {
    activeMenu,
    setActiveMenu,
    initialState,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
