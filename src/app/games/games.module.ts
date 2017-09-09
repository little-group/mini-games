import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeComponent } from './snake/snake.component';
import { GamesService } from './games.service';
import {HttpClientModule} from "@angular/common/http";
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  declarations: [SnakeComponent, MinesweeperComponent],
  providers: [GamesService]
})
export class GamesModule { }
