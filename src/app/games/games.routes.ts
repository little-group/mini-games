import { Routes } from '@angular/router';
import {MinesweeperComponent} from "./minesweeper/minesweeper.component";

export const GamesRoutes: Routes = [
  {path: 'minesweeper', component: MinesweeperComponent}
];
