import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cours} from "../../models/cours";

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private BASE_URL_COURS = "http://localhost:8083//saclex//cours";
  private COURS_BY_MATIERE = `${this.BASE_URL_COURS}\\byMatiere\\`;
  private DELETE_COURS = `${this.BASE_URL_COURS}\\`;

  constructor(private http:HttpClient) { }

  public getCoursByMatiere(scxIdMatiere:number):Observable<Cours []>{
    return this.http.get<Cours[]>(this.COURS_BY_MATIERE + scxIdMatiere);
  }

  public saveCours(cours:Cours):Observable<Cours>{
    return this.http.post<Cours>(this.BASE_URL_COURS,cours);
  }

  public updateCours(cours:Cours):Observable<Cours>{
    return this.http.put<Cours>(this.BASE_URL_COURS,cours);
  }

  public deleteCours(scxIdCours:number):Observable<any>{
    return this.http.delete(this.DELETE_COURS + scxIdCours);
  }
}
