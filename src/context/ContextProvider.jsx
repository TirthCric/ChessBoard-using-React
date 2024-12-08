import React, { useEffect, useState } from 'react'
import { boardContext } from './boardContext'

// Helper function to create a piece object
const createPiece = (type, color) => ({ type, color,isMoved: false });

// Function to generate initial board setup dynamically
const initialBoardSetup = () => {
    const board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null)); // Create an empty 8x8 board

    // Set up pawns
    for (let i = 0; i < 8; i++) {
        board[1][i] = createPiece("pawn", "black"); // Black pawns
        board[6][i] = createPiece("pawn", "white"); // White pawns
    }

    // Set up major pieces
    const pieceOrder = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
    pieceOrder.forEach((type, i) => {
        board[0][i] = createPiece(type, "black"); // Black major pieces
        board[7][i] = createPiece(type, "white"); // White major pieces
    });

    return board;
};

function ContextProvider({ children }) {
    const [boardState, setBoardState] = useState(initialBoardSetup) // manages board state
    const [moveTracker , setMoveTracker] = useState([]) // stores all moves 
    const [move, setMove] = useState([]) // stores start and end moves 
    const [tileColor,setTileColor] = useState([]) // stores first clicked element to update color of that element 

    // console.log("movetracker",moveTracker);
    // console.log("move",move);
    
    
    return (

        <boardContext.Provider value={{boardState, setBoardState , move , setMove, tileColor, setTileColor, moveTracker, setMoveTracker}}>
            {children}
        </boardContext.Provider>
    )
}

export default ContextProvider