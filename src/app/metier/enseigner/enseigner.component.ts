import { Component, OnInit } from '@angular/core';
import {Enseigner} from "../../models/enseigner";
import {EnseignerService} from "../../services/enseigner/enseigner.service";
import {AnneeAcademiqueService} from "../../services/anneeAcademique/annee-academique.service";
import {AnneeAcademique} from "../../models/annee-academique";
import {Matiere} from "../../models/matiere";
import {NzModalService} from "ng-zorro-antd";
import {Enseignant} from "../../models/enseignant";

@Component({
  selector: 'app-enseigner',
  templateUrl: './enseigner.component.html',
  styleUrls: ['./enseigner.component.css']
})
export class EnseignerComponent implements OnInit {
  enseigners:Enseigner[] = [];
  annees:AnneeAcademique[] = [];
  selectedAnnee:AnneeAcademique;

  constructor(private enseignerService:EnseignerService,
              private anneeService:AnneeAcademiqueService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllAnnees();
  }

  getAllAnnees(){
    this.anneeService.getAllAnnee().subscribe(
      res =>{
        this.annees = res;
      },
      error => {
        alert("Impossible de récupérer les années")
      }
    )
  }

  selectAnnee(annee: AnneeAcademique) {
    this.selectedAnnee = annee;
    this.enseignerService.getAllEnseignerByAnnee(this.selectedAnnee.scxIdAnneeAcademique).subscribe(
      res =>{
        this.enseigners = res;
      },
      error => {
        alert("Impossible de récupérer les affectations de l'année");
      }
    )
  }

  addEnseignerAfterCreate(enseigner:Enseigner){
    this.enseigners.push(enseigner);
  }

  showDeleteConfirm(enseigner:Enseigner): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: "",
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.enseignerService.deleteEnseigner(enseigner.enseignant.scxIdEnseignant,
        enseigner.coursDTO.scxIdCours,enseigner.salleDTO.scxIdSalle).subscribe(
        res =>{
          let indexOfEnseigner = this.enseigners.indexOf(enseigner);
          this.enseigners.splice(indexOfEnseigner,1);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
