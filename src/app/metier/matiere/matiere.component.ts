import { Component, OnInit } from '@angular/core';
import {Matiere} from "../../models/matiere";
import {Cours} from "../../models/cours";
import {MatiereService} from "../../services/matiere/matiere.service";
import {CoursService} from "../../services/cours/cours.service";
import {NzModalService} from "ng-zorro-antd";
import {Cycle} from "../../models/cycle";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  matieres:Matiere [] = [];
  selectedMatiere:Matiere;
  cours:Cours[] = [];

  constructor(private matiereService:MatiereService,private coursService:CoursService,private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllMatieres();
  }

  getAllMatieres(){
    this.matiereService.getAllMatieres().subscribe(
      res =>{
        this.matieres = res;
      },
      error => {
        alert("Impossible de récupérer les matières du système");
      }
    )
  }

  selectMatiere(matiere:Matiere){
    this.selectedMatiere = matiere;
    this.coursService.getCoursByMatiere(this.selectedMatiere.scxIdMatiere).subscribe(
      res=>{
        this.cours = res
      },
      error => {
        alert("Impossible de récupérer les cours de la matière");
      }
    )
  }

  addMatiereAfterCreate(matiere:Matiere){
    this.matieres.push(matiere);
  }

  public refreshMatiereAfterUpdate(updatedMatiere:Matiere){
    this.matieres.find(x => x.scxIdMatiere == updatedMatiere.scxIdMatiere).scxLibelle = updatedMatiere.scxLibelle;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les cours de la matière sélectionnée',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.matiereService.deleteMatiere(this.selectedMatiere.scxIdMatiere).subscribe(
        res =>{
          let indexOfSelectedMatiere = this.matieres.indexOf(this.selectedMatiere);
          this.matieres.splice(indexOfSelectedMatiere,1);
          this.selectedMatiere = null;
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }

  addCoursAfterCreate(cours:Cours){
    this.cours.push(cours);
  }

  removeCoursAfterDelete(deletedCours:Cours){
    let indexOfCours = this.cours.indexOf(deletedCours);
    this.cours.splice(indexOfCours,1);
  }
}
