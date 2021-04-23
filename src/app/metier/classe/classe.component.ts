import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classe} from "../../models/classe";
import {ClasseService} from "../../services/classe/classe.service";
import {Salle} from "../../models/salle";
import {SalleService} from "../../services/salle/salle.service";
import {Serie} from "../../models/serie";
import {SpecialiteService} from "../../services/specialite/specialite.service";
import {NzModalService} from "ng-zorro-antd";
import {AnneeAcademique} from "../../models/annee-academique";
import {AnneeAcademiqueService} from "../../services/anneeAcademique/annee-academique.service";

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  @Input() classe:Classe; // variable classe venant du composant parent cycle
  @Output() deletedClasse:EventEmitter<Classe> = new EventEmitter<Classe>(); // variable renvoyé au niveau de composant parent
  selectedClasse:Classe;
  selectedAnnee:AnneeAcademique;
  salles:Salle[] = [];
  series: Serie[] = [];
  annees:AnneeAcademique[] = [];

  constructor(private salleService:SalleService,
              private specialiteService:SpecialiteService,
              private modalService: NzModalService,
              private classeService:ClasseService,
              private anneeService: AnneeAcademiqueService) { }

  ngOnInit() {
    this.getAllAnnee();
  }

  /**
   * Fonction qui permet de récupérer la liste des salles en fonction de l'année et de la classe
   * @param classe
   * @param annee
   */
  selectAnnee(classe: Classe,annee:AnneeAcademique) {
    this.selectedClasse = classe;
    this.selectedAnnee = annee;
    this.salleService.getSallesByAnneeClasse(classe.scxIdClasse,this.selectedAnnee.scxIdAnneeAcademique).subscribe(
      res =>{
        this.salles = res;
      },
      error => {
        alert("une erreur est survenue. Impossible de récupérer les salles");
      }
    )
  }

  /**
   * Fonction qui permet de récuperer la liste des années
   */
  getAllAnnee(){
    this.anneeService.getAllAnnee().subscribe(
      res =>{
        this.annees = res;
      },
      error => {
        alert("Impossible de récupérer les années");
      }
    )
  }

  /**
   *Fonction qui permet d'actualiser l'élément classe après une mise à jour
   * @param classe
   */
  refreshClasseAfterUpdate(classe:Classe){
    this.classe.scxLibelle = classe.scxLibelle;
  }

  /**
   * fonction qui permet d'ajouter la salle créée à la liste des salles
   * @param salle
   */
  addSalleAfterCreate(salle:Salle){
    this.salles.push(salle);
  }

  /**
   * fonction qui permet d'afficher le modal de suppression d'une classe
   */
  showDeleteConfirm() {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'La suppression effacera toutes les salles de la classe concernée',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.classeService.deleteClasse(this.selectedClasse.scxIdClasse).subscribe(
        res =>{
          this.deletedClasse.emit(this.selectedClasse);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }

  /**
   * fonction qui permet de retirer la salle de la liste des salles après suppression
   * @param deletedSalle
   */
  removeSalleAfterDelete(deletedSalle:Salle){
    let indexOfSalle = this.salles.indexOf(deletedSalle);
    this.salles.splice(indexOfSalle,1);
  }
}
