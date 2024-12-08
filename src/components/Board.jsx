import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import useBoardContext from '../context/boardContext'
import { pawnMoves } from '../utils/pawn'
import { knightMoves } from '../utils/knight'
import { bishopMoves } from '../utils/bishop'
import { rookMoves } from '../utils/rook'
import { queenMoves } from '../utils/queen'
import PromotionModal from './PromotionModal'


function Board() {

    const { boardState, setBoardState, move, setMove } = useBoardContext()

    // This is for pawn promotion
    const [promotionState, setPromotionState] = useState(null)

    const handlePromotion = (newPiece) => {
        const { startPos, endPos, color } = promotionState;

        const updatedBoard = [...boardState];
        updatedBoard[endPos[0]][endPos[1]] = { type: newPiece, color, isMoved: true }; // Replace with promoted piece
        updatedBoard[startPos[0]][startPos[1]] = null; // Clear the original pawn

        setBoardState(updatedBoard);
        setPromotionState(null); // Clear promotion state
    };

    const checkForPromotion = (piece, endPos) => {
        const [endRow] = endPos;
        return piece.type === "pawn" && (endRow === 0 || endRow === 7);
    };

    // this is calculates moves for piece
    const getPossibleMoves = (piece, boardState, move) => {
        switch (piece.type) {
            case "pawn": return pawnMoves(boardState, move);
            case "knight": return knightMoves(boardState, move);
            case "bishop": return bishopMoves(boardState, move);
            case "rook": return rookMoves(boardState, move);
            case "queen": return queenMoves(boardState, move);
            default: return [];
        }
    };


    useEffect(() => {
        if (move.length)
            console.log(boardState);
    }, [move])

    // const updateState = () => {

    // }

    // checking for clicked square is null or not
    const isNull = (piece) =>  piece === null
    

    const isValidMove = (MovesArray, move) => {
        const [row, col] = move;
        return MovesArray.some(([r, c]) => row === r && col === c);
    };


    // Changes board (update board state) 
    const changeBoard = (prevState) => {

        if (!move || move.length !== 2) return prevState; // Early exit for invalid move

        const [startPos, endPos] = move
        const piece = prevState[startPos[0]]?.[startPos[1]]

        if (!piece || isNull(piece)) return prevState // Early exit for invalid piece

        const newState = structuredClone(prevState)
        const possibleMoves = getPossibleMoves(piece, boardState, move)

        if (isValidMove(possibleMoves, endPos)) {
            if (checkForPromotion(piece, endPos)) {
                setTimeout(() => {
                    setPromotionState({
                        startPos,
                        endPos,
                        color: piece.color,
                        position: {
                            top: endPos[0] * 89 + 40,
                            left: endPos[1] * 89 + 40,
                        },
                    });
                }, 0);
                setMove([])
                return prevState; // Prevent immediate update
            }
            
            newState[startPos[0]][startPos[1]] = null;
            newState[endPos[0]][endPos[1]] = { ...piece, isMoved: true };
        }


        setMove([])
        // console.log("this is new state", newState);

        return newState
    }

    // This update the board when board pieces moves 
    useEffect(() => {
        if (move.length === 2)
            setBoardState(prevState => changeBoard(prevState))
    }, [move])

    // console.log(boardState);

    return (
        <div>
            {promotionState && (
                <PromotionModal
                    color={promotionState.color}
                    position={promotionState.position}
                    onPromote={handlePromotion}
                />
            )}

            <div className='grid grid-cols-[repeat(8,1fr)] h-[712px] w-[712px] items-center justify-center border-2 border-black'>
                {/* creating board  (8x8 2D array ) */}
                {boardState.map((row, rowIndex) =>
                    row.map((tile, colIndex) => (
                        // used Tile component for each square to manage render pieces and clicking event on each square 
                        <Tile
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            piece={tile}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Board