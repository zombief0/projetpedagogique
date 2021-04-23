import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnneeAcademique} from "../../models/annee-academique";

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {
  private BASE_URL_ANNEE = "http://localhost:8083//saclex//annee";
  private ALL_ANNEE = `${this.BASE_URL_ANNEE}\\all`;
  private DELETE_ANNEE = `${this.BASE_URL_ANNEE}\\`;

  constructor(private http:HttpClient) { }

  public getAllAnnee():Observable<AnneeAcademique[]>{
    return this.http.get<AnneeAcademique[]>(this.ALL_ANNEE);
  }

  public saveAnnee(annee:AnneeAcademique): Observable<AnneeAcademique>{
    return this.http.post<AnneeAcademique>(this.BASE_URL_ANNEE,annee);
  }

  public updateAnnee(annee:AnneeAcademique): Observable<AnneeAcademique>{
    return this.http.put<AnneeAcademique>(this.BASE_URL_ANNEE,annee)
  }

  public deleteAnnee(scxIdAnnee:number):Observable<any>{
    return this.http.delete(this.DELETE_ANNEE + scxIdAnnee);
  }
}
