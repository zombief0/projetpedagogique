import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Salle} from "../../models/salle";
import {Specialite} from "../../models/specialite";
import {SpecialiteService} from "../../services/specialite/specialite.service";
import {Serie} from "../../models/serie";
import {SerieService} from "../../services/serie/serie.service";
import {NzModalService} from "ng-zorro-antd";
import {SalleService} from "../../services/salle/salle.service";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  @Input() salle:Salle;
  @Output() deletedSalle:EventEmitter<Salle> = new EventEmitter<Salle>();
  selectedSalle:Salle;
  constructor(private specialiteService:SpecialiteService,
              private serieService:SerieService,
              private modalService: NzModalService,private salleService:SalleService) { }

  ngOnInit() {
  }


  selectSalle(salle: Salle) {
    this.selectedSalle = salle;
  }

  refreshSalleAfterUpdate(updatedSalle:Salle){
    this.salle.scxLibelle = updatedSalle.scxLibelle;
    this.salle.scxDescription = updatedSalle.scxDescription;
    this.salle.specialite = updatedSalle.specialite;
    this.salle.serie = updatedSalle.serie;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer?',
      nzContent: 'la suppression effacera toutes les classes du cycle sélectionner',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.salleService.deleteSalle(this.selectedSalle.scxIdSalle).subscribe(
        res =>{
          this.deletedSalle.emit(this.selectedSalle);
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
