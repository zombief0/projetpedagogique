import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialite} from "../../models/specialite";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private BASE_URL_SPECIALITE = "http://localhost:8083//saclex//specialite";
  private ALL_SPECIALITE = `${this.BASE_URL_SPECIALITE}\\all`;
  private SPECIALITE_BY_ID = `${this.BASE_URL_SPECIALITE}\\byId\\`;
  private DELETE_SPECIALITE = `${this.BASE_URL_SPECIALITE}\\`;
  constructor(private http:HttpClient) { }

  public getAllSpecialite():Observable<Specialite[]>{
    return this.http.get<Specialite[]>(this.ALL_SPECIALITE);
  }

  public getSpecialiteById(scxIdSpecialite:number):Observable<Specialite>{
    return this.http.get<Specialite>(this.SPECIALITE_BY_ID + scxIdSpecialite);
  }

  public saveSpecialite(specialite:Specialite):Observable<Specialite>{
    return this.http.post<Specialite>(this.BASE_URL_SPECIALITE,specialite);
  }

  public updateSpecialite(specialite:Specialite):Observable<Specialite>{
    return this.http.put<Specialite>(this.BASE_URL_SPECIALITE,specialite)
  }

  public deleteSpecialite(scxIdSpecialite:number):Observable<any>{
    return this.http.delete(this.DELETE_SPECIALITE+scxIdSpecialite);
  }
}
