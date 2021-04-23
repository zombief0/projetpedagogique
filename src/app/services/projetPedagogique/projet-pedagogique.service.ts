import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjetPedagogique} from "../../models/projet-pedagogique";

@Injectable({
  providedIn: 'root'
})
export class ProjetPedagogiqueService {

  private BASE_URL_PROJET = "http://localhost:8083//saclex//projet";
  private PROJET_BY_ANNEE_COURS = `${this.BASE_URL_PROJET}\\byAnneeCours\\`;
  private DELETE_PROJET = `${this.BASE_URL_PROJET}\\`;

  constructor(private http:HttpClient) { }

  public getAllProjetByAnneeCours(scxIdAnnee:number,scxIdCours:number):Observable<ProjetPedagogique[]>{
    return this.http.get<ProjetPedagogique[]>(this.PROJET_BY_ANNEE_COURS + scxIdCours + "/" + scxIdAnnee);
  }

  public saveProjet(projet:ProjetPedagogique):Observable<ProjetPedagogique>{
    return this.http.post<ProjetPedagogique>(this.BASE_URL_PROJET,projet);
  }

  public updateProjet(projet:ProjetPedagogique):Observable<ProjetPedagogique>{
    return this.http.put<ProjetPedagogique>(this.BASE_URL_PROJET,projet);
  }

  public deleteProjet(scxIdProjet:number):Observable<any>{
    return this.http.delete(this.DELETE_PROJET + scxIdProjet);
  }
}
