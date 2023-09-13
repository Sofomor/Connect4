import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly rows = 6;
  readonly columns = 7;
  grid: number[][] = []; // 0 pour vide, 1 pour joueur 1, 2 pour joueur 2
  currentPlayer = 1;  // Commence avec le joueur 1

  ngOnInit() {
    this.initializeGrid();
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
      alert('match nul');
      return; // Le joueur a atteint le nombre maximum de jetons, ne faites rien
    }
    // Trouver l'emplacement disponible le plus bas dans la colonne
    let finalRow;
    for (let r = this.rows - 1; r >= 0; r--) {
      if (this.grid[r][columnIndex] === 0) {
        finalRow = r;
        break;
      }
    }
  
    if (finalRow !== undefined) {
      // Incrémentez le nombre de coups du joueur actuel
      if (this.currentPlayer === 1) {
        this.player1Moves++;
      } else if (this.currentPlayer === 2) {
        this.player2Moves++;
      }
  
      // Effectuez l'animation de la chute du jeton
      this.animateDrop(finalRow, columnIndex);
    }
  }
  
  // alignement

  checkForWin(row: number, col: number): boolean {
    return this.checkDirection(row, col, 1, 0) ||   // Vérifie horizontalement
           this.checkDirection(row, col, 0, 1) ||   // Vérifie verticalement
           this.checkDirection(row, col, 1, 1) ||   // Vérifie en diagonale vers le bas
           this.checkDirection(row, col, 1, -1);    // Vérifie en diagonale vers le haut
}

checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
  let count = 0;
  const player = this.grid[row][col];
  for (let i = 0; i < 4; i++) {
      const r = row + rowDir * i;
      const c = col + colDir * i;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.grid[r][c] === player) {
          count++;
      } else {
          break;
      }
  }
  return count === 4;
}


winner: number | null = null;


  animateDrop(finalRow: number, columnIndex: number): void {
    let currentRow = 0;
    let isBouncing = false; // indique si le jeton est en train de rebondir
    const bounceHeight = 1; // hauteur du rebond

    const dropInterval = setInterval(() => {
        // Effacer la position actuelle du jeton pour l'animation
        this.grid[currentRow][columnIndex] = 0;

        if (currentRow < finalRow && !isBouncing) {
            currentRow++;
        } else if (currentRow === finalRow && !isBouncing) {
            // Si le jeton est supposé tomber sur la rangée supérieure, évitez le rebond.
            if (finalRow === 0) {
                this.grid[currentRow][columnIndex] = this.currentPlayer;
                clearInterval(dropInterval);
                this.togglePlayer();
                return;
            }

            // Commencer le rebond
            isBouncing = true;
            currentRow -= bounceHeight;
        } else if (isBouncing) {
            // Terminer le rebond
            currentRow++;
            if (currentRow === finalRow) {
                clearInterval(dropInterval);
            }
        } else {
            clearInterval(dropInterval); // arrête l'animation si elle n'est pas terminée pour une raison quelconque
        }

        // Mettre à jour la nouvelle position du jeton
        this.grid[currentRow][columnIndex] = this.currentPlayer;
    }, 50);

    setTimeout(() => {
      if (this.checkForWin(finalRow, columnIndex)) {
        this.winner = this.currentPlayer;
        return;
    }
      this.togglePlayer();
  }, (finalRow + 2 * bounceHeight) * 50);}

togglePlayer() {
  this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
}
}