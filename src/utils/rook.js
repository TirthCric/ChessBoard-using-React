
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

export const rookMoves = (boardState, move) => {
    const startPos = move[0];
    const piece = boardState[startPos[0]][startPos[1]];
    if (!piece) return [];

    const isWhite = piece?.color === 'white'
    const [currentRow, currentCol] = startPos;
    const posibleMoves = [];

    const addMoveIfValid = (row, col) => {
        const pos = [row, col];
        if (!isWithinBound(pos)) return false; // Stop if out of bounds

        if (isNull(boardState, pos)) {
            posibleMoves.push(pos); // Valid empty square
            return true; // Continue in this direction
        } else if (isWhitePiece(boardState, pos) !== isWhite ) {
            posibleMoves.push(pos); // Valid capture
            return false
        }
        return false; // Stop further moves in this direction
    };

    const directions = [
        [0, 1],  // Right
        [0, -1], // Left
        [1, 0],  // Down
        [-1, 0], // Up
    ];

    for (const [dx, dy] of directions) {
        for (let step = 1; step < 8; step++) {
            const row = currentRow + step * dx;
            const col = currentCol + step * dy;
            if (!addMoveIfValid(row, col)) break; // Stop in this direction if blocked
        }
    }

    return posibleMoves;
};



