import {Enseignant} from "./enseignant";
import {Cours} from "./cours";
import {Salle} from "./salle";


export interface Enseigner {
  enseignant:Enseignant;
  coursDTO:Cours;
  salleDTO:Salle;

}
