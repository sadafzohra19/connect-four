import { Injectable } from '@angular/core';
import { Grid, Player, State } from '../interfaces/grid';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _state: State;

  constructor() {
    this._state = {
      grid: {
        grid: [][6]
      },
      player: false
    }
  }


  public setState(g: Grid, p: boolean) {
    this._state = {
      grid: g,
      player: p
    }
    localStorage.setItem('state', JSON.stringify(this._state))

  }

  public getState() {
    let a = localStorage.getItem('state');
    return JSON.parse(a as string);
  }

  public setPrevState(g: Grid, p: boolean) {
    this._state = {
      grid: g,
      player: p
    }
    localStorage.setItem('prevstate', JSON.stringify(this._state))

  }

  public getPrevState() {
    let a = localStorage.getItem('prevstate');
    return JSON.parse(a as string);
  }

/**
 * Reset to Original state or initialize the board
 * By default player is false - player 1 active
 */
  public resetState() {
    let init_grid: any = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    let _grid = {
      grid: init_grid
    }

    this._state = {
      grid: _grid,
      player: false
    }
    this.setState(init_grid, false)
  }
}
