import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Salle} from "../../models/salle";

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private BASE_URL_SALLE = "http://localhost:8083//saclex//salle";
  private SALLE_BY_CLASSE= `${this.BASE_URL_SALLE}\\byClasse\\`;
  private SALLE_BY_CLASSE_ANNEE = `${this.BASE_URL_SALLE}\\byAnneeClasse\\`;
  private SALLE_BY_ID = `${this.BASE_URL_SALLE}\\byId\\`;
  private DELETE_SALLE = `${this.BASE_URL_SALLE}\\`;

  constructor(private http:HttpClient) { }

  public getAllSallesByClasse(scxIdClasse:number):Observable<Salle[]>{
    return this.http.get<Salle[]>(this.SALLE_BY_CLASSE + scxIdClasse);
  }

  public getSalleById(scxIdSalle:number):Observable<Salle>{
    return this.http.get<Salle>(this.SALLE_BY_ID + scxIdSalle);
  }

  public getSallesByAnneeClasse(scxIdClasse:number,scxIdAnnee:number):Observable<Salle[]>{
    return this.http.get<Salle[]>(this.SALLE_BY_CLASSE_ANNEE + scxIdClasse + "/"+scxIdAnnee);
  }

  public saveSalle(salle:Salle):Observable<Salle>{
    return this.http.post<Salle>(this.BASE_URL_SALLE,salle);
  }

  public updateSalle(salle:Salle):Observable<Salle>{
    return this.http.put<Salle>(this.BASE_URL_SALLE,salle);
  }

  public deleteSalle(scxIdSalle:number):Observable<any>{
    return this.http.delete(this.DELETE_SALLE + scxIdSalle);
  }
}
