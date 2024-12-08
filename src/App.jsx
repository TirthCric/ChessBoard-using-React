import Board from "./components/Board"
import React from "react"
import ContextProvider from "./context/ContextProvider"

function App() {

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <ContextProvider>
        <Board />
      </ContextProvider>
    </div>
  )
}

export default App
