import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../../models/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private  BASE_URL_MODULE = "http://localhost:8083//saclex//module";
  private MODULES_BY_TRIMESTRE = `${this.BASE_URL_MODULE}\\byTrimestre\\`;
  private DELETE_MODULE = `${this.BASE_URL_MODULE}\\`;

  constructor(private http:HttpClient) { }

  public getAllModuleByTrimestre(scxIdTrimestre:number): Observable<Module[]>{
    return this.http.get<Module[]>(this.MODULES_BY_TRIMESTRE + scxIdTrimestre);
  }

  public saveModule(module:Module):Observable<Module>{
    return this.http.post<Module>(this.BASE_URL_MODULE,module);
  }

  public updateModule(module:Module):Observable<Module>{
    return this.http.put<Module>(this.BASE_URL_MODULE,module);
  }

  public deleteModule(scxIdModule):Observable<any>{
    return this.http.delete(this.DELETE_MODULE + scxIdModule);
  }
}
