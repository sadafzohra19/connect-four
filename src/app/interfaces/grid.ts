export interface Grid {
    grid?: Number[][],
}

export interface Player{
    playerId?: Number,
    playerText?: String,
    active?: Boolean
}

export interface State{
    player: boolean,
    grid?: Grid
}
