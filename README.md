# Connect4

Connect4 is a classic strategy game where two players drop tokens into a grid. The first player to align four consecutive tokens horizontally, vertically, or diagonally wins the game.

This project is built upon the Angular CLI version 16.2.1.

## Project Structure

The project is organized as follows :

### Components
 * reset/ : This component allows for resetting the game
 * game-status/ : Records the current state of the game
 * game/ : The main game component
 * cell/ : Represents an individual cell on the board
 * board/ : Displays the game board
 
### Services
 * night-mode/ : Service to toggle a dark mode for the game
  
### Directives
 * countdown/ : Directive to display a countdown timer

### Main Application Files
 * app.component.scss : The main styling for the application.
 * app.component.html : The main structure of the application.
 * app.component.ts : The main logic of the application.

## Installation Prerequisites

Homebrew :
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Node.js :
```
brew install node
```
Ngxs store : 
```
npm install @ngxs/store --save
```
  
## Installation
```
git clone https://github.com/sofomor/connect4.git
cd connect4
npm install
```

## Launching the Game
```
ng serve
```

Open a browser and navigate to http://localhost:4200/

## Contributions (components, services, directives)
```
ng generate component nomDuComponent
ng generate directive nomDeLaDirective
ng generate service nomDuservice
```

## Screenshot

![Lightmode](https://github.com/Sofomor/Connect4/assets/93552754/b8cb62a9-a0e3-4ab8-a4a4-335ac4fb50e5)
![Darkmode](https://github.com/Sofomor/Connect4/assets/93552754/9945a457-3837-413f-a025-b781b3c2e20f)


----------------------------------------------------------


### - French Version -

# Puissance 4

Puissance 4 est un jeu de stratégie classique où deux joueurs déposent des jetons dans une grille, et le premier à aligner quatre jetons consécutifs horizontalement, verticalement ou en diagonale gagne la partie.

Ce projet est basé sur [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Structure du projet

Le projet est organisé comme suit :

### Composants
 * reset/ : Ce composant permet de réinitialiser la partie.
 * game-status/ : Enregistre l'état actuel du jeu
 * game/ : Composant principal du jeu.
 * cell/ : Représente une cellule individuelle sur le plateau.
 * board/ : Affiche le plateau de jeu.
 
### Services
 * night-mode/ : Service pour activer/désactiver un mode sombre pour le jeu.
  
### Directives
 * countdown/ : Directive pour afficher un compte à rebours.

### Fichiers principaux de l'application
 * app.component.scss : Style principal de l'application.
 * app.component.html : Structure principale de l'application.
 * app.component.ts : Logique principale de l'application.

## Prérequis pour l'installation

Homebrew :
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Node.js :
```
brew install node
```
Ngxs store : 
```
npm install @ngxs/store --save
```
  
## Installation
```
git clone https://github.com/sofomor/connect4.git
cd connect4
npm install
```

## Lancer le jeu
```
ng serve
```

Ouvrez un navigateur et accédez à http://localhost:4200/

## Contributions (composants, services, directives)
```
ng generate component nomDuComponent
ng generate directive nomDeLaDirective
ng generate service nomDuservice
```
