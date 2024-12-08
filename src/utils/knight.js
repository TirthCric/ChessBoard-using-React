
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

export const knightMoves = (boardState, move) => {
    const startPos = move[0]
    const piece = boardState[startPos[0]][startPos[1]]
    if(!piece) return [];

    const isWhite = piece?.color === 'white';
    const direction = isWhite ? -1 : 1;
    const [currentRow, currentCol] = startPos
    const posibleMoves = []

    const addMoveIfValid = (row, col) => {
        const pos = [row, col]
        if(isWithinBound(pos) && isNull(boardState,pos))
            posibleMoves.push(pos)
        else if(isWithinBound(pos) && isWhitePiece(boardState, pos) !== isWhite)
            posibleMoves.push(pos)
    }

    // upper side moves
    addMoveIfValid(currentRow + direction, currentCol - 2)
    addMoveIfValid(currentRow + direction, currentCol + 2)

    // lower side moves
    addMoveIfValid(currentRow - direction, currentCol - 2)
    addMoveIfValid(currentRow - direction, currentCol + 2)

    // front moves
    addMoveIfValid(currentRow + 2 * direction, currentCol - 1)
    addMoveIfValid(currentRow + 2 * direction, currentCol + 1)
    
    // back moves
    addMoveIfValid(currentRow - 2 * direction, currentCol - 1)
    addMoveIfValid(currentRow - 2 * direction, currentCol + 1)

    return posibleMoves
} 

