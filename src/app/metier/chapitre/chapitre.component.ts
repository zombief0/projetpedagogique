import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chapitre} from "../../models/chapitre";
import {Activite} from "../../models/activite";
import {ChapitreService} from "../../services/chapitre/chapitre.service";
import {ActiviteService} from "../../services/activite/activite.service";
import {ProjetPedagogique} from "../../models/projet-pedagogique";
import {NzModalService} from "ng-zorro-antd";
import {Competence} from "../../models/competence";
import {CompetenceService} from "../../services/competence/competence.service";
import {ObjectifService} from "../../services/objectif/objectif.service";
import {Objectif} from "../../models/objectif";

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {
  @Input() chapitre:Chapitre; //l'élément chapitre qui vient du composant parent Module
  @Input() selectedProjet:ProjetPedagogique; // le projet pédagogique sélectionné au niveau du composant projet pedagogique
  @Output() updatedChapitre : EventEmitter<Chapitre> = new EventEmitter<Chapitre>(); // élément chapitre renvoyé au niveau du composant module après une mise à jour de l'élément
  @Output() deletedChapitre : EventEmitter<Chapitre> = new EventEmitter<Chapitre>(); // élément chapitre renvoyé au niveau du composant module après la suppression de l'élément
  activites:Activite[] = []; //Variable qui recevoir toutes les activités (Leçons) d'un chapitre
  objectifs:Objectif[] = [];

  constructor(private chapitreService:ChapitreService,
              private activiteService: ActiviteService,
              private competenceService:CompetenceService,
              private objectifService:ObjectifService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllActivitesByChapitre();
  }

  /**
   * Fonction qui permet d'obtenir la liste d'activités d'un chapitre
   */
  getAllActivitesByChapitre(){
    this.activiteService.getAllActiviteByChapitre(this.chapitre.scxIdChapitre).subscribe(
      res => {
        this.activites = res;
      },
      error => {
        alert("Impossible de récupérer les leçons");
      }
    )
  }


  /**
   * Fonction qui permet de mettre à jour le statut d'une activité et par extension, de calculer la progression du chapitre
   * @param activite
   */
  updateActivite(activite: Activite) {
    this.activiteService.updateActivite(activite).subscribe(
      res=>{
        let progression:number = 0 ;
        for(let act of this.activites){
          if(act.scxStatut == "TERMINE"){
            progression = progression + 1;
          }

          this.chapitre.scxProgression = (progression*100)/this.activites.length;
          this.chapitreService.updateChapitre(this.chapitre).subscribe(
            res =>{
              this.updatedChapitre.emit(this.chapitre);
            },
            error => {
              alert("Impossible d'actualiser la progression du module");
            },
          )
        }
      },
      error => {
        alert("Impossible d'actualiser la progression du chapitre");
      }
    );
  }

  /**
   * Fonction qui permet de mettre à jour l'objet chapitre au niveau du GUI après modification
   * @param chapitre
   */
  refreshChapitreAfterUpdate(chapitre:Chapitre){
    this.chapitre.scxProgression = chapitre.scxProgression;
    this.chapitre.scxLibelle = chapitre.scxLibelle;
    this.chapitre.scxNumero = chapitre.scxNumero;
    this.chapitre.scxDescription = chapitre.scxDescription;
  }

  /**
   * Fonction qui permet d'ajouter l'activité créée à la liste d'activité
   * @param activite
   */
  addActiviteAfterCreate(activite:Activite){
    this.activites.push(activite);
  }

  /**
   * Fonction qui permet de mettre à jour un élément activité après modifications
   * @param activite
   */
  refreshActiviteAfterUpdate(activite:Activite){
    let indexOfActivite = this.activites.findIndex(x => x.scxIdActivite == activite.scxIdActivite);
    this.activites[indexOfActivite].scxType = activite.scxType;
    this.activites[indexOfActivite].scxNumero = activite.scxNumero;
    this.activites[indexOfActivite].scxLibelle = activite.scxLibelle;
    this.activites[indexOfActivite].scxDescription = activite.scxDescription;
  }

  addObjectifAfterCreate(objectif:Objectif){
    this.objectifs.push(objectif);
  }

  /**
   * Fonction qui permet d'afficher le modal de la suppression d'un chapitre
   */
  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera toutes les leçons du chapitre',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.chapitreService.deleteChapitre(this.chapitre.scxIdChapitre).subscribe(
        res =>{
          this.deletedChapitre.emit(this.chapitre);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }

  /**
   * Fonction qui permet d'afficher le modal de suppression de l'activité
   * @param activite
   */
  showDeleteConfirmActivite(activite:Activite) {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les objectifs de la leçon',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.activiteService.deleteActivite(activite.scxIdActivite).subscribe(
        res =>{
          let indexOfActivite = this.activites.indexOf(activite);
          this.activites.splice(indexOfActivite,1);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
