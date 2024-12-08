
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

export const bishopMoves = (boardState, move) => {
    const startPos = move[0];
    const piece = boardState[startPos[0]][startPos[1]];
    if (!piece) return [];

    const isWhite = piece?.color === 'white';
    const [currentRow, currentCol] = startPos;
    const posibleMoves = [];

    const addMoveIfValid = (row, col) => {
        const pos = [row, col];
        if (!isWithinBound(pos)) return false; // Out of bounds

        if (isNull(boardState, pos)) {
            posibleMoves.push(pos);
            return true; // Continue checking along this direction
        } else if (isWhitePiece(boardState, pos) !== isWhite) {
            posibleMoves.push(pos); // Add capture move
            return false; // Stop further moves in this direction
        } else {
            return false; // Friendly piece blocks the path
        }


    };

    // Directions: Top-right, Bottom-right, Bottom-left, Top-left
    const directions = [
        [-1, 1], [1, 1], [1, -1], [-1, -1]
    ];

    for (const [rowDir, colDir] of directions) {
        for (let step = 1; step < 8; step++) {
            const nextRow = currentRow + rowDir * step;
            const nextCol = currentCol + colDir * step;
            if (!addMoveIfValid(nextRow, nextCol)) break; // Stop in this direction
        }
    }

    return posibleMoves;
};


