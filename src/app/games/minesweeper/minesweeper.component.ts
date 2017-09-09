import { Component, OnInit, OnDestroy } from '@angular/core';
import {Cube} from "./cube";

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})

export class MinesweeperComponent implements OnInit, OnDestroy {

  public timer: number;
  public x_count: number;
  public y_count: number;
  public mines_count: number;
  public game_over: boolean;
  public cubes: Cube[];
  public timer_id: any;
  public win: boolean;
  public score: number;

  constructor() {
    this.x_count = 9;
    this.y_count = 9;
    this.timer = 0;
    this.mines_count = 9;
    this.cubes = [];
    this.game_over = false;
    this.win = false;
    this.score = 0;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer_id);
  }

  init() {
    this.cubes = [];
    this.timer = 0;
    this.score = 0;
    this.game_over = false;
    this.win = false;
    this.generate(this.x_count, this.y_count, this.mines_count);

    this.timer_id = setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  generate(x: number, y: number, mines: number) {

    for (let i = 0; i < mines; i++) {
      let num = this.getRandom(x, y);

      while (this.cubes[num]) {
        num = this.getRandom(x, y);
      }

      this.cubes[num] = {
        has_mine: true,
        resolved: false,
        marked: false,
        number: 0
      };
    }

    this.cubes = this.fillNumbers(this.cubes, x, y);
  }

  fillNumbers(cubes: Cube[], x: number, y: number): Cube[] {
    for (let i = 0; i < x * y; i++) {
      if (!cubes[i]) {
        cubes[i] = {
          has_mine: false,
          resolved: false,
          marked: false,
          number: this.getNumber(cubes, i, x, y)
        }
      }
    }

    return cubes;
  }

  getNumber(cubes: Cube[], i:number, x: number, y: number): number {
    let count: number = 0;
    const total: number = x * y;

    let n = i - x - 1;

    if (n % x !== x-1 && this.hasMine(cubes, n, total)) count++;

    n++;

    if (this.hasMine(cubes, n, total)) count++;

    n++;

    if (n % x !== 0 && this.hasMine(cubes, n, total)) count++;

    n += x;

    if (n % x !== 0 && this.hasMine(cubes, n, total)) count++;

    n -= 2;

    if (n % x !== x-1 && this.hasMine(cubes, n, total)) count++;

    n += x;

    if (n % x !== x-1 && this.hasMine(cubes, n, total)) count++;

    n++;

    if (this.hasMine(cubes, n, total)) count++;

    n++;

    if (n % x !== 0 && this.hasMine(cubes, n, total)) count++;

    return count === 0 ? 9 : count;
  }

  hasMine(cubes: Cube[], n: number, t: number) {
    return n >= 0 && n < t && cubes[n] && cubes[n]['number'] === 0 ;
  }

  getRandom(x: number, y: number):number {
    return Math.floor(Math.random() * x * y);
  }

  onClick(cube: Cube, i:number) {
    if (cube.has_mine) {
      this.cubes.forEach((c) => {
        c.resolved = true;
      });
      this.game_over = true;
      clearInterval(this.timer_id);
    } else {
      this.score++;
      this.checkFreeSpace(i);
    }
  }

  makeFreeSpace(i:number) {
    const x = this.x_count;

    let n = i - x;

    this.checkFreeSpace(n);

    n = i + 1;

    this.checkFreeSpace(n);

    n = i - 1;

    this.checkFreeSpace(n);

    n = i + x;

    this.checkFreeSpace(n);
  }

  checkFreeSpace(n:number) {
    if (n >= 0 && this.cubes[n] && !this.cubes[n].resolved && this.cubes[n].number > 0) {
      this.cubes[n].resolved = true;

      if (this.cubes[n].number === 9) {
        this.makeFreeSpace(n);
      }
    }

    this.checkForWin();
  }

  noContextMenu() {
    return false;
  }

  mark(cube: Cube) {
    cube.marked = !cube.marked;
    cube.resolved = cube.marked && cube.has_mine;
    this.checkForWin();
    return false;
  }

  checkForWin(){
    this.win = this.cubes.every((cube: Cube) => {
      return cube.resolved;
    });
  }
}
