export function checkWin(board, lastRow, lastCol) {
    const player = board[lastRow][lastCol];
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    return directions.some(([dx, dy]) => {
        let count = 1;

        for (let i = 1; i < 4; i++) {
            const r =lastRow + i * dx;
            const c = lastCol + i * dy;
            if (r < 0 || r >= 6 || c < 0 || c >= 7) break;
            if (board[r][c] !== player) break;
            count++;
        }

        for (let i = 1; i < 4; i++) {
            const r = lastRow - i * dx;
            const c = lastCol - i * dy;
            if (r < 0 || r >= 6 || c < 0 || c >= 7) break;
            if (board[r][c] !== player) break;
            count++;
        }

        return count >= 4;
    })
}

export function checkDraw(board) {
    return board[0].every(cell => cell !== null);
}
