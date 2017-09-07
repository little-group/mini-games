import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeComponent } from './snake/snake.component';
import { GamesService } from './games.service';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [SnakeComponent],
  providers: [GamesService]
})
export class GamesModule { }
