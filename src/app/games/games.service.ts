import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Game} from "./game";

@Injectable()
export class GamesService {

  constructor(
    private http: HttpClient
  ) {

  }

  get(): Observable<Game[]>  {
    return this.http.get('assets/db/games.json').map((games: Game[]) => {
      return games;
    });
  }
}
