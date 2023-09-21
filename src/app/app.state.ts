import { State, Action, StateContext, Selector } from '@ngxs/store';

// Actions
export class PlayMove {
    static readonly type = '[Connect4] Play Move';
    constructor(public column: number) {}
}

// R = rouge, Y = jaune, NULL = vide
export interface Connect4StateModel {
    board: string[][]; 
    currentPlayer: string;
}

// État initial
const defaultState: Connect4StateModel = {
    board: Array(6).fill(null).map(() => Array(7).fill(null)),
    currentPlayer: 'R'
};

@State<Connect4StateModel>({
    name: 'connect4',
    defaults: defaultState
})

// Joueur actuel + récupération de l'état actuel
export class AppState {
    @Selector()
    static board(state: Connect4StateModel) {
        return state.board;
    }

    @Selector()
    static currentPlayer(state: Connect4StateModel) {
        return state.currentPlayer;
    }

    @Action(PlayMove)
    play(ctx: StateContext<Connect4StateModel>, action: PlayMove) {
        const state = ctx.getState();
    }
}
