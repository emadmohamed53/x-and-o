<template>
  <div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold mb-6">Tic-Tac-Toe</h1>
    <div class="grid grid-cols-3 gap-2 w-64">
      <button
        v-for="(cell, index) in data.board"
        :key="index"
        class="w-20 h-20 flex items-center justify-center text-3xl font-bold border rounded-lg"
        :class="{
          'bg-blue-500': cell === 'X',
          'bg-red-500': cell === 'O',
        }"
        @click="makeMove(index)"
        :disabled="cell || data.winner"
      >
        {{ cell }}
      </button>
    </div>
    <div v-if="data.winner" class="mt-4 text-xl font-semibold">
      <p>
        {{
          data.winner === "Draw"
            ? "Draw!"
            : data.winner === "X"
            ? "Player Wins!!"
            : "Computer Wins!!"
        }}
      </p>
      <button @click="resetGame" class="mt-2 btn btn-primary">
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const data = ref({
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
});

const makeMove = (index) => {
  if (data.value.board[index] || data.value.winner) return;

  data.value.board[index] = data.value.currentPlayer;

  if (checkWinner()) {
    data.value.winner = data.value.currentPlayer;
  } else if (data.value.board.every((cell) => cell !== null)) {
    data.value.winner = "Draw";
  } else {
    data.value.currentPlayer = "O";
    computerMove();
  }
};

const isWinningMove = (player, move) => {
  data.value.board[move] = player;
  const hasWon = checkWinner() === player;
  data.value.board[move] = null;
  return hasWon;
};

const computerMove = () => {
  const computer = "O";
  const opponent = "X";

  for (let i = 0; i < data.value.board.length; i++) {
    if (data.value.board[i] === null) {
      if (isWinningMove(computer, i)) {
        data.value.board[i] = computer;
        data.value.currentPlayer = "X";
        if (checkWinner()) data.value.winner = "O";
        return;
      }
    }
  }

  for (let i = 0; i < data.value.board.length; i++) {
    if (data.value.board[i] === null) {
      if (isWinningMove(opponent, i)) {
        data.value.board[i] = computer;
        data.value.currentPlayer = "X";
        if (checkWinner()) data.value.winner = "O";
        return;
      }
    }
  }

  const emptyIndices = data.value.board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (emptyIndices.length > 0) {
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    data.value.board[randomIndex] = computer;

    if (checkWinner()) {
      data.value.winner = "O";
    } else {
      data.value.currentPlayer = "X";
    }
  }
};

const checkWinner = () => {
  for (const [a, b, c] of winningCombinations) {
    if (
      data.value.board[a] &&
      data.value.board[a] === data.value.board[b] &&
      data.value.board[a] === data.value.board[c]
    ) {
      return data.value.board[a];
    }
  }
  return null;
};

const resetGame = () => {
  data.value.board = Array(9).fill(null);
  data.value.currentPlayer = "X";
  data.value.winner = null;
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
