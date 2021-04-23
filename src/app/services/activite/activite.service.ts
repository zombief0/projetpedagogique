import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activite} from "../../models/activite";

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  private BASE_URL_ACTIVITE = "http://localhost:8083//saclex//activite";
  private ACTIVITE_BY_CHAPITRE = `${this.BASE_URL_ACTIVITE}\\byChapitre\\`;
  private DELETE_ACTIVITE = `${this.BASE_URL_ACTIVITE}\\`;

  constructor( private http:HttpClient) { }

  public getAllActiviteByChapitre(scxIdChapitre:number):Observable<Activite[]>{
    return this.http.get<Activite[]>(this.ACTIVITE_BY_CHAPITRE + scxIdChapitre);
  }

  public saveActivite(activite:Activite): Observable<Activite>{
    return this.http.post<Activite>(this.BASE_URL_ACTIVITE,activite);
  }

  public updateActivite(activite:Activite): Observable<Activite>{
    return this.http.put<Activite>(this.BASE_URL_ACTIVITE,activite);
  }

  public deleteActivite(scxIdActivite:number):Observable<any>{
    return this.http.delete(this.DELETE_ACTIVITE + scxIdActivite);
  }
}
