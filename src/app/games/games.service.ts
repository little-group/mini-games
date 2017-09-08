import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Game} from "./game";

import { environment } from '../../environments/environment';

@Injectable()
export class GamesService {

  private _api_endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this._api_endpoint = environment.GAMES_API_URL;
  }

  get(): Observable<Game[]>  {
    return this.http.get(`${this._api_endpoint}/assets/db/games.json`).map((games: Game[]) => {
      return games;
    });
  }
}
