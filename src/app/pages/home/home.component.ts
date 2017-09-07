import { Component, OnInit } from '@angular/core';
import {GamesService} from "../../games/games.service";
import {Game} from "../../games/game";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public games: Game[];

  constructor(
    private gameService: GamesService
  ) {

  }

  ngOnInit() {
    this.gameService.get().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

}
