import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chapitre} from "../../models/chapitre";

@Injectable({
  providedIn: 'root'
})
export class ChapitreService {
  private BASE_URL_CHAPITRE = "http://localhost:8083//saclex//chapitre";
  private CHAPITRE_BY_MODULE = `${this.BASE_URL_CHAPITRE}\\byModule\\`;
  private DELETE_CHAPITRE = `${this.BASE_URL_CHAPITRE}\\`;

  constructor(private http:HttpClient) { }

  public getAllChapitreByModule(scxIdModule:number):Observable<Chapitre[]>{
    return this.http.get<Chapitre[]>(this.CHAPITRE_BY_MODULE + scxIdModule);
  }

  public saveChapitre(chapitre:Chapitre):Observable<Chapitre>{
    return this.http.post<Chapitre>(this.BASE_URL_CHAPITRE,chapitre);
  }

  public updateChapitre(chapitre:Chapitre):Observable<Chapitre>{
    return this.http.put<Chapitre>(this.BASE_URL_CHAPITRE,chapitre);
  }

  public deleteChapitre(scxIdChapitre:number):Observable<any>{
    return this.http.delete(this.DELETE_CHAPITRE + scxIdChapitre);
  }
}
