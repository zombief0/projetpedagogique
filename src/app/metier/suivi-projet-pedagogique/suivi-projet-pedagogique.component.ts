import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SuiviProjetPedagogique} from "../../models/suivi-projet-pedagogique";
import {SalleService} from "../../services/salle/salle.service";
import {Salle} from "../../models/salle";
import {TrimestreService} from "../../services/trimestre/trimestre.service";
import {Trimestre} from "../../models/trimestre";
import {SuiviProjetPedagogiqueService} from "../../services/suiviProjetPedagogique/suivi-projet-pedagogique.service";
import {error} from "util";
import {ProjetPedagogique} from "../../models/projet-pedagogique";
import {Cours} from "../../models/cours";
import {Enseigner} from "../../models/enseigner";
import {EnseignerService} from "../../services/enseigner/enseigner.service";
import {AnneeAcademique} from "../../models/annee-academique";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-suivi-projet-pedagogique',
  templateUrl: './suivi-projet-pedagogique.component.html',
  styleUrls: ['./suivi-projet-pedagogique.component.css']
})
export class SuiviProjetPedagogiqueComponent implements OnInit {

  @Input() suivi: SuiviProjetPedagogique;
  @Input() cours:Cours;
  @Input() annee:AnneeAcademique;
  @Input() selectedProjet:ProjetPedagogique;
  trimestres: Trimestre[] = [];
  enseigner:Enseigner;
  salle:Salle;
  size= 'large';

  @Output() deletedSuivi:EventEmitter<SuiviProjetPedagogique> = new EventEmitter<SuiviProjetPedagogique>();

  constructor(private trimestreService:TrimestreService,
              private suiviService:SuiviProjetPedagogiqueService,
              private enseignerService:EnseignerService,
              private salleService:SalleService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllTrimestreBySuivi();
    this.getEnseignantBySuiviCours();
  }

  getAllTrimestreBySuivi(){
    this.trimestreService.getAllTrimestreBySuivi(this.suivi.scxIdSuivi).subscribe(
      res =>{
        this.trimestres = res;
      },
      error => {
        alert("Impossible de récupérer les trimestres");
      }
    );

    this.salleService.getSalleById(this.suivi.scxIdSalle).subscribe(
      res =>{
        this.salle = res;
      },
      error1 => {
        alert("Impossible de récupérer la salle du suivi");
      }
    );
  }

  getEnseignantBySuiviCours(){
    this.enseignerService.getEnseignerBySalleCours(this.cours.scxIdCours,this.suivi.scxIdSalle).subscribe(
      res=>{
        this.enseigner = res;
      },
      error1 => {
        alert("Impossible de récupérer l'enseignant du suivi");
      }
    )
  }

  calculerProgression(trimestre:Trimestre){
    this.trimestres.find(x => x.scxIdTrimestre == trimestre.scxIdTrimestre).scxProgression = trimestre.scxProgression;

    let progression:number = 0;
    for (let tri of this.trimestres){
      progression = progression + tri.scxProgression;
    }

    this.suivi.scxProgression = progression/this.trimestres.length;
    this.suiviService.updateSuivi(this.suivi).subscribe(
      res =>{},
      error1 => {
        alert("Impossible de mettre à jour la progression du suivi");
      }
    )
  }

  addTrimestreAfterCreate(trimestre:Trimestre){
    this.trimestres.push(trimestre);
  }

  removeTrimestreAfterDelete(trimestre:Trimestre){
    let indexOfTrimestre = this.trimestres.indexOf(trimestre);
    this.trimestres.splice(indexOfTrimestre,1);
  }

  refreshSuiviAfterUpdate(updatedSuivi:SuiviProjetPedagogique){
    this.salleService.getSalleById(updatedSuivi.scxIdSalle).subscribe(
      res=>{
        this.suivi.scxIdSalle = res.scxIdSalle;
        this.suivi.scxNomSalle = res.scxLibelle;
      },
      error1 => {
        alert("Impossible de mettre à jour la salle");
      }
    )
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les trimestres du suivi',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.suiviService.deleteSuivi(this.suivi.scxIdSuivi).subscribe(
        res =>{
          this.deletedSuivi.emit(this.suivi);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
