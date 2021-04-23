import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../models/cours";
import {CoursService} from "../../services/cours/cours.service";
import {NzModalService} from "ng-zorro-antd";
import {Classe} from "../../models/classe";
import {ClasseService} from "../../services/classe/classe.service";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  @Input() cours : Cours;
  @Output() deletedCours:EventEmitter<Cours> = new EventEmitter<Cours>();
  classeCours:Classe;

  constructor(private coursService:CoursService,
              private modalService : NzModalService,private classeService:ClasseService) { }

  ngOnInit() {
    this.getClasseById();
  }

  getClasseById(){
    this.classeService.getClasseById(this.cours.scxIdClasse).subscribe(
      res =>{
        this.classeCours = res;
      },
      error => {
        alert("Impossible de recupérer la classe du cours")
      }
    )
  }

  refreshCoursAfterUpdate(updatedCours:Cours){
    this.cours.scxCoefficient = updatedCours.scxCoefficient;
    this.cours.scxNature = updatedCours.scxNature;
    this.cours.scxDescription = updatedCours.scxDescription;
    this.cours.scxLibelle = updatedCours.scxLibelle;
    this.cours.scxIdClasse = updatedCours.scxIdClasse;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera tous les projets pédagogiques du cours',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.coursService.deleteCours(this.cours.scxIdCours).subscribe(
        res =>{
          this.deletedCours.emit(this.cours);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
