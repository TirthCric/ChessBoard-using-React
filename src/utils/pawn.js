

// const { setBoardState } = useBoardContext()

// const isPawnMove = (boardState, move) => {
//     const startPos = move[0]
//     const endPos = move[1]
//     const isMoved = boardState[startPos[0]][startPos[1]].isMoved
//     const isWhite = boardState[startPos[0]][startPos[1]].color === 'white' ? true : false

//     if (isPawn(boardState, startPos)) {

//         if (isWhite) {

//             if (!isMoved) {

//                 if (endPos[1] === startPos[1] && endPos[0] >= (startPos[0] - 2)) {
//                     if (endPos[0] > startPos[0])
//                         return false

//                     if (boardState[endPos[0]][endPos[1]] !== null)
//                         return false

//                     return true
//                 }


//             } else {

//                 if (endPos[1] === startPos[1] && endPos[0] === (startPos[0] - 1)) {
//                     if (endPos[0] > startPos[0])
//                         return false

//                     if (boardState[endPos[0]][endPos[1]] !== null)
//                         return false

//                     return true
//                 }

//             }


//         } else {

//             if (!isMoved) {

//                 if (endPos[1] === startPos[1] && endPos[0] <= (startPos[0] + 2)) {
//                     if (endPos[0] < startPos[0])
//                         return false

//                     if (boardState[endPos[0]][endPos[1]] !== null)
//                         return false

//                     return true
//                 }


//             } else {

//                 if (endPos[1] === startPos[1] && endPos[0] === (startPos[0] + 1)) {
//                     if (endPos[0] < startPos[0])
//                         return false

//                     if (boardState[endPos[0]][endPos[1]] !== null)
//                         return false

//                     return true
//                 }
                
//             }
            
//         }
        
        
        
//     }
    
// }

// export default isPawnMove

// export const isPawn = (boardState, move) => {
//     return boardState[move[0]][move[1]].type === 'pawn' ? true : false
    
// }

export const pawnMoves = (boardState, move) => {
    const startPos = move[0]
    const piece = boardState[startPos[0]][startPos[1]]
    if (!piece) return [];

    const isWhite = piece?.color === 'white';
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1
    const [currentRow, currentCol] = startPos
    const posibleMoves = []

    const addMoveIfValid = (row, col) => {
        const pos = [row, col]
        if (isWithinBound(pos) && isNull(boardState, pos))
            posibleMoves.push(pos)
    }

    const addCaptureIfValid = (row, col) => {
        const pos = [row, col]
        if (isWithinBound(pos) && !isNull(boardState, pos) && isWhitePiece(boardState, pos) !== isWhite)
            posibleMoves.push(pos)
    }

    addMoveIfValid(currentRow + direction, currentCol)
    if(currentRow === startRow) addMoveIfValid(currentRow + 2 * direction, currentCol)
    addCaptureIfValid(currentRow + direction, currentCol - 1)
    addCaptureIfValid(currentRow + direction, currentCol + 1)


    return posibleMoves
}

const isWithinBound = (position) => {
    const [row, col] = position
    return row >= 0 && row < 8 && col >= 0 && col < 8
}

const isWhitePiece = (boardState, position) => {
    // console.log(boardState[position[0]][position[1]]);
    if (!isWithinBound(position)) return false
    return boardState[position[0]][position[1]]?.color === "white"

}

const isNull = (boardState, position) => {
    if (!isWithinBound(position)) return false
    return boardState[position[0]][position[1]] === null
}



