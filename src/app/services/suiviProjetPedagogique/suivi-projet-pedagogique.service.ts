import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SuiviProjetPedagogique} from "../../models/suivi-projet-pedagogique";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SuiviProjetPedagogiqueService {
  private BASE_URL_SUIVI = "http://localhost:8083//saclex//suivi";
  private SUIVI_BY_PROJET = `${this.BASE_URL_SUIVI}\\byProjet\\`;
  private SUIVI_BY_SALLE =  `${this.BASE_URL_SUIVI}\\bySalle\\`;
  private DELETE_SUIVI =  `${this.BASE_URL_SUIVI}\\`;

  constructor(private http:HttpClient) { }

  public getAllSuiviByProjet(scxIdProjet:number):Observable<SuiviProjetPedagogique[]>{
    return this.http.get<SuiviProjetPedagogique[]>(this.SUIVI_BY_PROJET + scxIdProjet);
  }

  public getAllSuiviBySalle(scxIdSalle:number):Observable<SuiviProjetPedagogique[]>{
    return this.http.get<SuiviProjetPedagogique[]>(this.SUIVI_BY_SALLE + scxIdSalle);
  }

  public saveSuivi(suivi:SuiviProjetPedagogique):Observable<SuiviProjetPedagogique>{
    return this.http.post<SuiviProjetPedagogique>(this.BASE_URL_SUIVI,suivi);
  }

  public updateSuivi(suivi:SuiviProjetPedagogique):Observable<SuiviProjetPedagogique>{
    return this.http.put<SuiviProjetPedagogique>(this.BASE_URL_SUIVI,suivi);
  }

  public deleteSuivi(scxIdSuivi:number):Observable<any>{
    return this.http.delete(this.DELETE_SUIVI + scxIdSuivi);
  }
}
