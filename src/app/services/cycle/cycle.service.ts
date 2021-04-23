import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cycle} from "../../models/cycle";

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  public BASE_URL_CYCLE = "http://localhost:8083//saclex//cycle";
  private ALL_CYCLES = `${this.BASE_URL_CYCLE}\\all`;
  private DELETE_CYCLE = `${this.BASE_URL_CYCLE}\\`;

  constructor(private http:HttpClient) { }

  getAllCycle():Observable<Cycle[]>{
      return this.http.get<Cycle[]>(this.ALL_CYCLES);
  }

  saveCycle(cycle:Cycle):Observable<Cycle>{
    return this.http.post<Cycle>(this.BASE_URL_CYCLE,cycle);
  }

  updateCycle(cycle:Cycle):Observable<Cycle>{
    return this.http.put<Cycle>(this.BASE_URL_CYCLE,cycle);
  }

  deleteCycle(scxIdCycle: number):Observable<any>{
    return this.http.delete(this.DELETE_CYCLE + scxIdCycle);
  }
}
