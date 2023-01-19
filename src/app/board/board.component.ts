import { Component, ElementRef, OnInit } from '@angular/core';
import { Grid, Player, State } from '../interfaces/grid';
import { BoardService } from '../service/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public state: State = {
    player: false
  };
  public player1: boolean = false; //false is for player 1, true for player 2
  public winning = "";
  public gameOver = false;
  public myGrid: any;



  constructor(private boardService: BoardService) {
    // Initialize Grid
    this.myGrid = {
      grid: [][6]
    }
  }

  ngOnInit(): void {
    this.setBoard();
  }


  /**
   * Set Board according to the last saved state
   * 
   */
  public setBoard() {
    this.state = this.boardService.getState();
    this.myGrid = this.state.grid;

    if (this.state.player) {
      this.player1 = true;
    } else {
      this.player1 = false;
    }
  }


  /**
   * @desc Select cell according to click
   * @param row 
   * @param column 
   * @param e 
   * @returns 
   */
  public selectColumn(row: any, column: any, e: any) {

    // set previous state to undo move
    this.boardService.setPrevState(this.myGrid, this.player1)

    if (!this.gameOver) {

      // Add item in the bottom of column
      for (let n = 5; n >= 0; n--) {
        if (this.myGrid[n][column] == 0) {
          this.player1 = !this.player1;
          if (this.myGrid[n][column] == 0) {
            if (this.player1) {
              this.myGrid[n][column] = 1;
            } else {
              this.myGrid[n][column] = 2;
            }
          }
          this.ifWin();

          // set state to save game after refresh page
          this.boardService.setState(this.myGrid, this.player1)
          return;
        }
      }
    } else {
      let state = this.boardService.getState();
    }



  }


  // Update cell style according to player turn
  public updateClass(val: any): string {
    if (val == 1) {
      return "player1";
    } if (val == 2) {
      return "player2";
    } else {
      return "none";
    }
  }


  /**
   * @desc Check if any player win. Run after every move made
   * @returns 
   */
  ifWin() {
    // horizontal
    let grid = this.myGrid;
    for (let r = 0; r < this.myGrid.length; r++) {
      for (let c = 0; c < this.myGrid[0].length - 3; c++) {
        if (grid[r][c] != ' ') {
          if (grid[r][c] == grid[r][c + 1] && grid[r][c + 1] == grid[r][c + 2] && grid[r][c + 2] == grid[r][c + 3]) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // vertical
    for (let c = 0; c < this.myGrid[0].length; c++) {
      for (let r = 0; r < this.myGrid.length - 3; r++) {
        if (grid[r][c] != ' ') {
          if (grid[r][c] == grid[r + 1][c] && grid[r + 1][c] == grid[r + 2][c] && grid[r + 2][c] == grid[r + 3][c]) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // anti diagonal
    for (let r = 0; r < this.myGrid.length - 3; r++) {
      for (let c = 0; c < this.myGrid[0].length - 3; c++) {
        if (grid[r][c] != ' ') {
          if (grid[r][c] == grid[r + 1][c + 1] && grid[r + 1][c + 1] == grid[r + 2][c + 2] && grid[r + 2][c + 2] == grid[r + 3][c + 3]) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // diagonal
    for (let r = 3; r < this.myGrid.length; r++) {
      for (let c = 0; c < this.myGrid[0].length - 3; c++) {
        if (grid[r][c] != ' ') {
          if (grid[r][c] == grid[r - 1][c + 1] && grid[r - 1][c + 1] == grid[r - 2][c + 2] && grid[r - 2][c + 2] == grid[r - 3][c + 3]) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

  }

  /**
   * @desc Set winner if four items completed in a row
   * @param r 
   * @param c 
   */
  setWinner(r: any, c: any) {
    if (this.player1) {
      this.winning = "PLAYER 1 WINS"
      console.log("PLAYER 1 WINS")
    } else {
      this.winning = "PLAYER 2 WINS"

    }
    this.gameOver = true;
  }

  /**
   * Reset the board
   */
  resetGame() {
    this.boardService.resetState();
    this.state = this.boardService.getState();
    this.myGrid = this.state.grid;

    if (this.state.player) {
      this.player1 = true;
    } else {
      this.player1 = false;
    }
    this.gameOver = false;
  }

  /**
   * Undo move and restore to previous state
   */
  undoMove() {

    this.state = this.boardService.getPrevState();
    this.myGrid = this.state.grid;

    if (this.state.player) {
      this.player1 = true;
    } else {
      this.player1 = false;
    }
  }

}
