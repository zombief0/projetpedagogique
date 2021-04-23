import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Objectif} from "../../models/objectif";

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  private BASE_URL_OBJECTIF = "http://localhost:8083//saclex//objectif";
  private OBJECTIFS_BY_ACTIVITE = `${this.BASE_URL_OBJECTIF}\\byActivite\\`;
  private DELETE_OBJECTIF = `${this.BASE_URL_OBJECTIF}\\`;

  constructor(private http:HttpClient) { }

  public getAllObjectifsByActivite(scxIdActivite:number):Observable<Objectif[]>{
    return this.http.get<Objectif[]>(this.OBJECTIFS_BY_ACTIVITE + scxIdActivite);
  }

  public saveObjectif(objectif:Objectif):Observable<Objectif>{
    return this.http.post<Objectif>(this.BASE_URL_OBJECTIF,objectif);
  }

  public updateObjectif(objectif:Objectif):Observable<Objectif>{
    return this.http.put<Objectif>(this.BASE_URL_OBJECTIF,objectif);
  }

  public deleteObjectif(scxIdObjectif:number):Observable<any>{
    return this.http.delete(this.DELETE_OBJECTIF + scxIdObjectif);
  }
}
