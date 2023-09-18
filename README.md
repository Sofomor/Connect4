# Connect4

Connect4 est un jeu de stratégie classique où deux joueurs déposent des jetons dans une grille, et le premier à aligner quatre jetons consécutifs horizontalement, verticalement ou en diagonale gagne la partie.

## Structure du projet

Le projet est organisé comme suit :
    * connect4/
        * src/
            * app/
                * components/
                * reset/ : Ce composant permet de réinitialiser la partie.
                * game-status/ : Enregistre l'état actuel du jeu
                * game/ : Composant principal du jeu.
                * cell/ : Représente une cellule individuelle sur le plateau.
                * board/ : Affiche le plateau de jeu.
                * services/
                * night-mode/ : Service pour activer/désactiver un mode sombre pour le jeu.
                * directives/
                * countdown/ : Directive pour afficher un compte à rebours.
                * styles/
                * app.component.scss : Style principal de l'application.
                * app.component.html : Structure principale de l'application.
                * app.component.ts : Logique principale de l'application.

  
## Installation
Pour installer et exécuter le jeu :
git clone https://github.com/sofomor/connect4.git cd connect4
npm install ng serve

Ouvrez un navigateur et accédez à http://localhost:4200/
