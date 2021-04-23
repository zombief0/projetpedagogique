import { Component, OnInit } from '@angular/core';
import {Enseignant} from "../../models/enseignant";
import {EnseignantService} from "../../services/enseignant/enseignant.service";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {

  enseignants:Enseignant[] = [];

  constructor(private enseignantService:EnseignantService,private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllEnseignants()
  }

  getAllEnseignants(){
    this.enseignantService.getAllEnseignant().subscribe(
      res=>{
        this.enseignants = res ;
      },
      error => {
        alert("Impossible d'obtenir la liste des enseignants");
      }
    )
  }

  addEnseignantAfterCreate(enseignant:Enseignant){
    this.enseignants.push(enseignant);
  }

  refreshEnseignantAfterUpdate(enseignant:Enseignant){
    let indexOfEns = this.enseignants.findIndex(x=> x.scxIdEnseignant == enseignant.scxIdEnseignant);
    this.enseignants[indexOfEns].scxDatePriseService = enseignant.scxDatePriseService;
    this.enseignants[indexOfEns].scxDiscipline = enseignant.scxDiscipline;
    this.enseignants[indexOfEns].scxSexe = enseignant.scxSexe;
    this.enseignants[indexOfEns].scxEmail = enseignant.scxEmail;
    this.enseignants[indexOfEns].scxTelephone = enseignant.scxTelephone;
    this.enseignants[indexOfEns].scxLieuNaissance = enseignant.scxLieuNaissance;
    this.enseignants[indexOfEns].scxDateNaissance = enseignant.scxDateNaissance;
    this.enseignants[indexOfEns].scxPrenom = enseignant.scxPrenom;
    this.enseignants[indexOfEns].scxNom = enseignant.scxNom;
  }

  showDeleteConfirm(enseignant:Enseignant): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: "la suppression effacera toutes les affectations de l'enseignant ",
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.enseignantService.deleteEnseignant(enseignant.scxIdEnseignant).subscribe(
        res =>{
          let indexOfEns = this.enseignants.indexOf(enseignant);
          this.enseignants.splice(indexOfEns,1);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
