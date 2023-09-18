import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  countdownTime: number = 30;
  readonly rows = 6;
  readonly columns = 7;
  grid: number[][] = [];
  currentPlayer = 1;
  countdownInterval: any;

  @Output() gameReset = new EventEmitter<void>();

  ngOnInit() {
    this.initializeGrid();
    this.startCountdownForCurrentPlayer();
  }

  startCountdownForCurrentPlayer() {
    this.countdownTime = 30;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdownTime--;
      if (this.countdownTime <= 0) {
        this.togglePlayer();
        this.startCountdownForCurrentPlayer();
      }
    }, 1000);
  }

  initializeGrid() {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  getCellClass(cellValue: number): string {
    if (cellValue === 1) {
      return 'cell-player1';
    }
    if (cellValue === 2) {
      return 'cell-player2';
    }
    return '';
  }

  player1Moves = 0;
  player2Moves = 0;

  cellClicked(rowIndex: number, columnIndex: number): void {
    if (this.winner) return;
    if (
      (this.currentPlayer === 1 && this.player1Moves >= 21) ||
      (this.currentPlayer === 2 && this.player2Moves >= 21)
    ) {
      alert("Match nul");
      return;
    }

    let finalRow;
    for (let r = this.rows - 1; r >= 0; r--) {
      if (this.grid[r][columnIndex] === 0) {
        finalRow = r;
        break;
      }
    }
  
    if (finalRow !== undefined) {
      if (this.currentPlayer === 1) {
        this.player1Moves++;
      } else if (this.currentPlayer === 2) {
        this.player2Moves++;
      }

      this.animateDrop(finalRow, columnIndex);
    }
  }

  checkForWin(row: number, col: number): boolean {
    return this.checkDirection(row, col, 1, 0) || 
           this.checkDirection(row, col, 0, 1) || 
           this.checkDirection(row, col, 1, 1) || 
           this.checkDirection(row, col, 1, -1);
  }

  checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
    const player = this.grid[row][col];
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const r = row + rowDir * i;
      const c = col + colDir * i;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  winner: number | null = null;

  animateDrop(finalRow: number, columnIndex: number): void {
    let currentRow = 0;
    let isBouncing = false;
    const bounceHeight = 1;

    const dropInterval = setInterval(() => {
      this.grid[currentRow][columnIndex] = 0;

      if (currentRow < finalRow && !isBouncing) {
        currentRow++;
      } else if (currentRow === finalRow && !isBouncing) {
        if (finalRow === 0) {
          this.grid[currentRow][columnIndex] = this.currentPlayer;
          clearInterval(dropInterval);
          return;
        }

        isBouncing = true;
        currentRow -= bounceHeight;
      } else if (isBouncing) {
        currentRow++;
        if (currentRow === finalRow) {
          clearInterval(dropInterval);
        }
      } else {
        clearInterval(dropInterval);
      }

      this.grid[currentRow][columnIndex] = this.currentPlayer;
    }, 50);

    setTimeout(() => {
      if (this.checkForWin(finalRow, columnIndex)) {
        this.winner = this.currentPlayer;
        return;
      }
      this.togglePlayer();
    }, (finalRow + 2 * bounceHeight) * 50);
  }

  futureDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  resetGame(): void {
    this.initializeGrid();
    this.currentPlayer = 1;
    this.player1Moves = 0;
    this.player2Moves = 0;
    this.winner = null;
    this.countdownTime = 30;
    this.startCountdownForCurrentPlayer();
    this.gameReset.emit();
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.startCountdownForCurrentPlayer();
  }
}

