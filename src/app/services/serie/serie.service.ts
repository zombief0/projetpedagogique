import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Serie} from "../../models/serie";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private BASE_URL_SERIE = "http://localhost:8083//saclex//serie";
  private ALL_SERIE = `${this.BASE_URL_SERIE}\\all`;
  private SERIE_BY_ID = `${this.BASE_URL_SERIE}\\byId\\`;
  private DELETE_SERIE =  `${this.BASE_URL_SERIE}\\`;

  constructor(private http:HttpClient) { }

  public getAllSerie():Observable<Serie[]>{
    return this.http.get<Serie[]>(this.ALL_SERIE);
  }

  public getSerieById(scxIdSerie:number):Observable<Serie>{
    return this.http.get<Serie>(this.SERIE_BY_ID + scxIdSerie);
  }

  public saveSerie(serie:Serie): Observable<Serie>{
    return this.http.post<Serie>(this.BASE_URL_SERIE,serie);
  }

  public updateSerie(serie:Serie) : Observable<Serie>{
    return this.http.put<Serie>(this.BASE_URL_SERIE,serie);
  }

  public deleteSerie(scxIdSerie:number):Observable<any>{
    return this.http.delete(this.DELETE_SERIE + scxIdSerie);
  }
}
