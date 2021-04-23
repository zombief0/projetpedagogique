import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enseigner} from "../../models/enseigner";

@Injectable({
  providedIn: 'root'
})
export class EnseignerService {
  private BASE_URL_ENSEIGNER = "http://localhost:8083//saclex//enseigner";
  private ALL_ENSEIGNER = `${this.BASE_URL_ENSEIGNER}\\all`;
  private ALL_ENSEIGNER_BY_ANNEE = `${this.BASE_URL_ENSEIGNER}\\byAnnee\\`;
  private DELETE_ENSEIGNER = `${this.BASE_URL_ENSEIGNER}\\`;
  private ALL_ENSEIGNER_BY_ANNEE_COURS = `${this.BASE_URL_ENSEIGNER}\\byCoursAnnee\\`;
  private ENSEIGNER_BY_SALLE_COURS = `${this.BASE_URL_ENSEIGNER}\\byCoursSalle\\`;


  constructor(private http: HttpClient) {
  }

  public getAllEnseigner(): Observable<Enseigner[]> {
    return this.http.get<Enseigner[]>(this.ALL_ENSEIGNER);
  }

  public getAllEnseignerByAnnee(scxIdAnnee: number): Observable<Enseigner[]> {
    return this.http.get<Enseigner[]>(this.ALL_ENSEIGNER_BY_ANNEE + scxIdAnnee);
  }

  public saveEnseigner(enseigner: Enseigner): Observable<Enseigner> {
    return this.http.post<Enseigner>(this.BASE_URL_ENSEIGNER, enseigner);
  }

  public deleteEnseigner(scxIdEnseignant: number, scxIdCours: number, scxIdSalle: number): Observable<any> {
    return this.http.delete(this.DELETE_ENSEIGNER + scxIdCours + '/' + scxIdSalle + '/' + scxIdEnseignant);
  }

  public getAllEnseignerByAnneeCours(scxIdAnnee:number,scxIdCours:number):Observable<Enseigner[]>{
    return this.http.get<Enseigner[]>(this.ALL_ENSEIGNER_BY_ANNEE_COURS + scxIdAnnee + '/' + scxIdCours);
  }

  public getEnseignerBySalleCours(scxIdCours:number, scxIdSalle:number):Observable<Enseigner>{
    return this.http.get<Enseigner>(this.ENSEIGNER_BY_SALLE_COURS + scxIdSalle + '/' + scxIdCours);
  }
}
