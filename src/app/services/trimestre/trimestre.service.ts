import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trimestre} from "../../models/trimestre";

@Injectable({
  providedIn: 'root'
})
export class TrimestreService {
  private BASE_URL_TRIMESTRE = "http://localhost:8083//saclex//trimestre";
  private TRIMESTRES_BY_SUIVI = `${this.BASE_URL_TRIMESTRE}\\bySuivi\\`;
  private DELETE_TRIMESTRE = `${this.BASE_URL_TRIMESTRE}\\`;

  constructor(private http:HttpClient) { }

  public getAllTrimestreBySuivi(scxIdSuivi:number):Observable<Trimestre[]>{
    return this.http.get<Trimestre[]>(this.TRIMESTRES_BY_SUIVI + scxIdSuivi);
  }

  public saveTrimestre(trimestre:Trimestre):Observable<Trimestre>{
    return this.http.post<Trimestre>(this.BASE_URL_TRIMESTRE,trimestre)
  }

  public updateTrimestre(trimestre:Trimestre):Observable<Trimestre>{
    return this.http.put<Trimestre>(this.BASE_URL_TRIMESTRE,trimestre)
  }

  public deleteTrimestre(scxIdTrimestre:number):Observable<any>{
    return this.http.delete(this.DELETE_TRIMESTRE + scxIdTrimestre);
  }
}
