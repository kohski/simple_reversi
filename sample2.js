board = [
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, -1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, -1, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ]
]

turn = 1
LEN = 8

// expected return = [[3,2],[2,3],[5,4],[5,4]]
ans =getPutablePlace(board, turn, LEN)
ans

function getPutablePlace(board, turn, len){

  const putableCoordinates = [];

  board.forEach((row, x) => {
    // eslint-disable-next-line consistent-return
    row.forEach((cell, y) => {
      const DIRECTIONS = [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
      ];

      if (cell !== 0) {
        return putableCoordinates;
      }

      DIRECTIONS.forEach((direction) => {
        const dirX = direction[0];
        const dirY = direction[1];
        let nextPiece = 0;
        for (let proceed = 1; proceed < len; proceed += 1) {
          const toX = x + (dirX * proceed);
          const toY = y + (dirY * proceed);

          if (toX < 0 || toX > 7 || toY < 0 || toY > 7) {
            nextPiece = 0;
          } else {
            nextPiece = board[toY][toX];
          }

          if (proceed === 1) {
            if (nextPiece !== turn * -1) {
              return;
            }
          } else if (nextPiece === turn) {
            putableCoordinates.push([x, y]);
          }
        }
      });
    });
  });
  return putableCoordinates;
}