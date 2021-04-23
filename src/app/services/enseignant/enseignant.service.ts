import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enseignant} from "../../models/enseignant";

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private BASE_URL_ENSEIGNANT = "http://localhost:8083//saclex//enseignant";
  private ALL_ENSEIGNANT_URL = `${this.BASE_URL_ENSEIGNANT}\\all`;
  private DELETE_ENSEIGNANT_URL = `${this.BASE_URL_ENSEIGNANT}\\`;

  constructor(private http:HttpClient) { }

  public getAllEnseignant():Observable<Enseignant[]>{
    return this.http.get<Enseignant[]>(this.ALL_ENSEIGNANT_URL);
  }

  public saveEnseignant(enseignant:Enseignant):Observable<Enseignant>{
    return this.http.post<Enseignant>(this.BASE_URL_ENSEIGNANT,enseignant);
  }

  public updateEnseignant(enseignant:Enseignant):Observable<Enseignant>{
    return this.http.put<Enseignant>(this.BASE_URL_ENSEIGNANT,enseignant);
  }

  public deleteEnseignant(scxIdEnseignant:number):Observable<any>{
    return this.http.delete(this.DELETE_ENSEIGNANT_URL + scxIdEnseignant);
  }
}
