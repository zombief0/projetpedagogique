import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnneeAcademique} from "../../models/annee-academique";
import {Matiere} from "../../models/matiere";
import {Cours} from "../../models/cours";
import {ProjetPedagogique} from "../../models/projet-pedagogique";
import {SuiviProjetPedagogique} from "../../models/suivi-projet-pedagogique";
import {AnneeAcademiqueService} from "../../services/anneeAcademique/annee-academique.service";
import {MatiereService} from "../../services/matiere/matiere.service";
import {CoursService} from "../../services/cours/cours.service";
import {ProjetPedagogiqueService} from "../../services/projetPedagogique/projet-pedagogique.service";
import {SuiviProjetPedagogiqueService} from "../../services/suiviProjetPedagogique/suivi-projet-pedagogique.service";
import {SalleService} from "../../services/salle/salle.service";
import {NzModalService} from "ng-zorro-antd";
import {Salle} from "../../models/salle";

@Component({
  selector: 'app-projet-pedagogique',
  templateUrl: './projet-pedagogique.component.html',
  styleUrls: ['./projet-pedagogique.component.css']
})
export class ProjetPedagogiqueComponent implements OnInit {

  annees:AnneeAcademique [] = [];
  matieres:Matiere[] = [];
  cours: Cours[] = [];
  projets: ProjetPedagogique[] = [];
  suivis: SuiviProjetPedagogique [] = [];
  selectedAnnee:AnneeAcademique;
  selectedMatiere:Matiere;
  selectedCours:Cours;
  selectedProjet:ProjetPedagogique;
  salle:Salle;
  isVisible = false;
  isConfirmLoading = false;

  constructor(private anneeService:AnneeAcademiqueService,
              private matiereService:MatiereService,
              private coursService:CoursService,
              private projetService:ProjetPedagogiqueService,
              private suiviService:SuiviProjetPedagogiqueService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAllAnnee();
    this.getAllMatiere();
  }

  getAllAnnee(){
    this.anneeService.getAllAnnee().subscribe(
      res=>{
        this.annees = res;
      },
      error => {
        alert("Impossible de récupérer les années");
      }
    )
  }

  selectAnnee(annee:AnneeAcademique){
    this.selectedAnnee = annee;
    this.selectedProjet = null;

    if(this.selectedCours != null){
      this.projetService.getAllProjetByAnneeCours(this.selectedAnnee.scxIdAnneeAcademique,this.selectedCours.scxIdCours).subscribe(
        res =>{
          this.projets = res;
        },
        error => {
          alert("Impossible de récupérer les projets");
        }
      )
    }
  }

  getAllMatiere(){
    this.matiereService.getAllMatieres().subscribe(
      res=>{
        this.matieres = res;
      },
      error => {
        alert("Impossible de récupérer les matières");
      },
    )
  }

  selectMatiere(matiere:Matiere){
    this.selectedMatiere = matiere;
    this.selectedProjet = null;
    this.selectedCours = null;
    this.coursService.getCoursByMatiere(matiere.scxIdMatiere).subscribe(
      res =>{
        this.cours = res;
      },
      error => {
        alert("Impossible de récupérer les cours");
      }
    )
  }

  selectCours(cours:Cours){
    this.selectedCours = cours;
    this.selectedProjet = null;
    if(this.selectedAnnee != null){
      this.projetService.getAllProjetByAnneeCours(this.selectedAnnee.scxIdAnneeAcademique,this.selectedCours.scxIdCours).subscribe(
        res =>{
          this.projets = res;
        },
        error => {
          alert("Impossible de récupérer les projets");
        }
      )
    }
  }

  selectProjet(projet:ProjetPedagogique){
    this.selectedProjet = projet;

    this.suiviService.getAllSuiviByProjet(this.selectedProjet.scxIdProjetPedagogique).subscribe(
      res =>{
        this.suivis = res;
      },
      error => {
        alert("Impossible de récupérer les suivis");
      }
    )
  }

  showModalChangerStatut(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  changerStatut() {
    this.projetService.updateProjet(this.selectedProjet).subscribe(
      res =>{

      },
      error => {
        alert("Impossible de changer le statut")
      }
    );

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
  }

  addProjetAfterCreate(projet:ProjetPedagogique){
    this.projets.push(projet)
  }

  refreshProjetAfterUpdate(projet:ProjetPedagogique){
    this.projets.find(x=> x.scxIdProjetPedagogique == projet.scxIdProjetPedagogique).scxDescription = projet.scxDescription;
    this.projets.find(x=> x.scxIdProjetPedagogique == projet.scxIdProjetPedagogique).dateModification = projet.dateModification;
  }

  showDeleteConfirm() {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'La suppression effacera tous les suivies du projet concerné',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.projetService.deleteProjet(this.selectedProjet.scxIdProjetPedagogique).subscribe(
        res =>{
          let indexOfProjet = this.projets.indexOf(this.selectedProjet);
          this.projets.splice(indexOfProjet,1);
          this.selectedProjet = null;
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }

  addSuiviAfterCreate(suivi:SuiviProjetPedagogique){
    this.suivis.push(suivi);
  }

  removeSuiviAfterDelete(suivi:SuiviProjetPedagogique){
    let indexOfSuivi = this.suivis.indexOf(suivi);
    this.suivis.splice(indexOfSuivi,1);
  }
}
