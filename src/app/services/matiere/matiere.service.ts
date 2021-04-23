import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Matiere} from "../../models/matiere";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private BASE_URL_MATIERE = "http://localhost:8083//saclex//matiere";
  private ALL_MATIERE_URL = `${this.BASE_URL_MATIERE}\\all`;
  private DELETE_MATIERE = `${this.BASE_URL_MATIERE}\\`;

  constructor(private http:HttpClient) { }

  public getAllMatieres(): Observable<Matiere[]>{
    return this.http.get<Matiere[]>(this.ALL_MATIERE_URL);
  }

  public saveMatiere(matiere:Matiere):Observable<Matiere>{
    return this.http.post<Matiere>(this.BASE_URL_MATIERE,matiere);
  }

  public updateMatiere(matiere:Matiere):Observable<Matiere>{
    return this.http.put<Matiere>(this.BASE_URL_MATIERE,matiere)
  }

  public deleteMatiere(scxIdMatiere:number): Observable<any>{
    return this.http.delete(this.DELETE_MATIERE + scxIdMatiere);
  }
}
