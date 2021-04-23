import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classe} from "../../models/classe";

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private BASE_URL_CLASSE = "http://localhost:8083//saclex//classe";
  private CLASSE_BY_CYCLE = `${this.BASE_URL_CLASSE}\\byCycle\\`;
  private CLASSE_BY_ID = `${this.BASE_URL_CLASSE}\\byId\\`;
  private DELETE_CLASSE = `${this.BASE_URL_CLASSE}\\`;

  constructor(private http:HttpClient) { }

  getAllClassesByCycle(scxIdCycle:number):Observable<Classe[]>{
    return this.http.get<Classe[]>(this.CLASSE_BY_CYCLE + scxIdCycle);
  }

  saveClasse(classe:Classe):Observable<Classe>{
    return this.http.post<Classe>(this.BASE_URL_CLASSE,classe);
  }

  getClasseById(scxIdClasse:number):Observable<Classe>{
    return this.http.get<Classe>(this.CLASSE_BY_ID + scxIdClasse);
  }

  updateClasse(classe:Classe):Observable<Classe>{
    return this.http.put<Classe>(this.BASE_URL_CLASSE,classe);
  }

  deleteClasse(scxIdClasse:number):Observable<any>{
    return this.http.delete(this.DELETE_CLASSE + scxIdClasse);
  }
}
