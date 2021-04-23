import { Component, OnInit } from '@angular/core';
import {AnneeAcademique} from "../../models/annee-academique";
import {AnneeAcademiqueService} from "../../services/anneeAcademique/annee-academique.service";
import {NzModalService, UploadXHRArgs} from "ng-zorro-antd";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-annee-academique',
  templateUrl: './annee-academique.component.html',
  styleUrls: ['./annee-academique.component.css']
})
export class AnneeAcademiqueComponent implements OnInit {
  annees:AnneeAcademique [] = [];

  constructor(private anneeService:AnneeAcademiqueService,
              private modalService: NzModalService,private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllAnnees();
  }

  /**
   * Fonction qui permet de récupérer les années du système
   */
  getAllAnnees(){
    this.anneeService.getAllAnnee().subscribe(
      res =>{
        this.annees = res;
      },
      error => {
        alert("Impossible de récupérer les années");
      },
    )
  }


  /**
   * ajout de l'année nouvellement crée à la liste d'années
   * @param annee
   */
  addAnneeAfterCreate(annee:AnneeAcademique){
    for(let i = this.annees.length; i >=0; i--){
      this.annees[i] = this.annees[i-1];
    }

    this.annees[0] = annee;
  }

  /**
   * Mettre l'année modifiée à jour
   * @param annee
   */
  refreshAnneeAfterUpdate(annee:AnneeAcademique){
    let indexOfAnnee = this.annees.findIndex(x => x.scxIdAnneeAcademique == annee.scxIdAnneeAcademique);
    this.annees[indexOfAnnee].scxDateFin = annee.scxDateFin;
    this.annees[indexOfAnnee].scxDateDebut = annee.scxDateDebut;
  }

  /**
   * Fonction qui appelle le pop up permettant la suppression
   * @param annee
   */
  showDeleteConfirm(annee:AnneeAcademique): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les modules du trimestre',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.anneeService.deleteAnnee(annee.scxIdAnneeAcademique).subscribe(
        res =>{
          //On retire l'année que l'on vient de supprimer de la liste d'année
          let indexOfAnnee = this.annees.indexOf(annee);
          this.annees.splice(indexOfAnnee,1);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
