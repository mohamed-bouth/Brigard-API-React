import { createContext, useContext, useState } from "react";

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [backEndDomain, setBackEndDomain] = useState("http://127.0.0.1:8000/api");

  return (
    <ApiContext.Provider value={{ backEndDomain }}>
      {children}
    </ApiContext.Provider>
  );
}