import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    board: [],
    count: 0,
    turn: 1,
    putablePlace: [],
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    initBoard(state) {
      const LEN = 8;
      const board = [];
      for (let i = 0; i < LEN; i += 1) {
        const arr = new Array(LEN).fill(0);
        board.push(arr);
      }
      const half = LEN / 2;
      board[half - 1][half - 1] = -1;
      board[half][half] = -1;
      board[half - 1][half] = 1;
      board[half][half - 1] = 1;
      state.board = board;
      state.turn = 1;
    },
    getBoard(state) {
      return state.board;
    },
    getRow(state) {
      return state.board.length;
    },
    putPiece(state, opt) {
      state.board[opt.y][opt.x] = opt.turn;
    },
    changeTurn(state) {
      state.turn *= -1;
    },
    getPutablePlace(state) {
      const board = state.board;
      const turn = state.turn;
      const len = board.length;
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
      state.putablePlace = putableCoordinates;
    },
    reversePiece(state, opts) {
      const x = opts.x;
      const y = opts.y;
      const len = state.board.length;
      const turn = opts.turn;
      const board = state.board;
      const reversePieces = [];
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
      DIRECTIONS.forEach((elm) => {
        const dirX = elm[0];
        const dirY = elm[1];
        const pathPieces = [];

        for (let proceed = 1; proceed < len; proceed += 1) {
          const toX = x + (dirX * proceed);
          const toY = y + (dirY * proceed);
          let nextPiece = 0;

          if (toX < 0 || toX > 7 || toY < 0 || toY > 7) {
            nextPiece = 0;
          } else {
            nextPiece = board[toY][toX];
          }
          if (proceed === 1) {
            if (nextPiece !== turn * -1) {
              break;
            }
            pathPieces.push([toX, toY]);
          } else if (nextPiece === turn) {
            if (reversePieces.length === 0) {
              reversePieces.push(pathPieces);
            } else {
              reversePieces.concat(pathPieces);
            }
          } else if (nextPiece === turn * -1) {
            pathPieces.push([toX, toY]);
          } else {
            break;
          }
        }
      });
      reversePieces.forEach((rows) => {
        rows.forEach((elm) => {
          const revX = elm[0];
          const revY = elm[1];
          state.board[revY][revX] = turn;
        });
      });
    },
  },
});
export default store;
