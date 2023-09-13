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

    setTimeout(() => this.togglePlayer(), (finalRow + 2*bounceHeight) * 50); // on prend en compte le temps total de l'animation pour changer de joueur
}

togglePlayer() {
  this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
}
}