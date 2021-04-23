import {Specialite} from "./specialite";
import {Serie} from "./serie";

export interface Salle {
  scxIdSalle:number;
  scxLibelle:string;
  scxDescription:string;
  scxIdClasse:number;
  specialite:Specialite;
  serie:Serie;
  scxIdAnneeAcademique:number
}
