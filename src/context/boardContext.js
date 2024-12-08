import {createContext, useContext} from "react";

export const boardContext = createContext()

export default function useBoardContext() {
    return useContext(boardContext)
}