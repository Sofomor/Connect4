import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

// Compte à rebours, lignes, colonnes, matrice, joueur actif, intervalle du compteur

export class BoardComponent implements OnInit {
  countdownTime: number = 30; 
  readonly rows = 6; 
  readonly columns = 7; 
  grid: number[][] = [];
  currentPlayer = 1;
  countdownInterval: any;

  @Output() gameReset = new EventEmitter<void>(); // Reset du jeu

// Initialisation du plateau, début du compte à rebours

  ngOnInit() {
    this.initializeGrid();
    this.startCountdownForCurrentPlayer();
  }

// Compte à rebours pour le joueur actif

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

// Initialisation du plateau (0 jeton)

  initializeGrid() {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

// Récupération des class des cellules selon la valeur

  getCellClass(cellValue: number): string {
    if (cellValue === 1) {
      return 'cell-player1';
    }
    if (cellValue === 2) {
      return 'cell-player2';
    }
    return '';
  }

// Mouvements

  player1Moves = 0;
  player2Moves = 0;

// Clics sur les cellules

  cellClicked(rowIndex: number, columnIndex: number): void {
    if (this.winner) return;

// Limite des jetons à 21

    if (
      (this.currentPlayer === 1 && this.player1Moves >= 21) ||
      (this.currentPlayer === 2 && this.player2Moves >= 21)
    ) {
      alert("Match nul");
      return;
    }

// Stockage de la rangée-cible du jeton, valeur 0 le jeton tombe

    let finalRow;
    for (let r = this.rows - 1; r >= 0; r--) {
      if (this.grid[r][columnIndex] === 0) {
        finalRow = r;
        break;
      }
    }

// Incrémentation des coups si cellule = vide
  
    if (finalRow !== undefined) {
      if (this.currentPlayer === 1) {
        this.player1Moves++;
      } else if (this.currentPlayer === 2) {
        this.player2Moves++;
      }

// Animation chute des jetons

      this.animateDrop(finalRow, columnIndex);
    }
  }

// Vérifie si le joueur a gagné

  checkForWin(row: number, col: number): boolean {
    return this.checkDirection(row, col, 1, 0) || 
           this.checkDirection(row, col, 0, 1) || 
           this.checkDirection(row, col, 1, 1) || 
           this.checkDirection(row, col, 1, -1);
  }

// Vérifie dans chaque direction s'il y a 4 jetons de la même couleur alignés

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

// Vérifie le gagnant ou si match null

  winner: number | null = null;

// Animation du jeton qui tombe

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

// Restauration du jeu à l'état initial

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

// Alterne les joueurs

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.startCountdownForCurrentPlayer();
  }
}

