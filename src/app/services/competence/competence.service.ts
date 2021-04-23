import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competence} from "../../models/competence";

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private BASE_URL_COMPETENCE = "http://localhost:8083//saclex//competence";
  private COMPETENCE_BY_CHAPITRE = `${this.BASE_URL_COMPETENCE}\\byChapitre\\`;
  private DELETE_COMPETENCE = `${this.BASE_URL_COMPETENCE}\\`;

  constructor(private http:HttpClient) { }

  public getAllCompetenceByChapitre(scxIdChapitre:number):Observable<Competence[]>{
    return this.http.get<Competence[]>(this.COMPETENCE_BY_CHAPITRE + scxIdChapitre);
  }

  public saveCompetence(competence:Competence):Observable<Competence>{
    return this.http.post<Competence>(this.BASE_URL_COMPETENCE,competence);
  }

  public updateCompetence(competence:Competence):Observable<Competence>{
    return this.http.put<Competence>(this.BASE_URL_COMPETENCE,competence)
  }

  public deleteCompetence(scxIdCompetence):Observable<any>{
    return this.http.delete(this.DELETE_COMPETENCE + scxIdCompetence)
  }
}
