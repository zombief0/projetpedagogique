import { Component, OnInit } from '@angular/core';
import {Specialite} from "../../models/specialite";
import {SpecialiteService} from "../../services/specialite/specialite.service";
import {NzModalService} from "ng-zorro-antd";
import {Serie} from "../../models/serie";
import {SerieService} from "../../services/serie/serie.service";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  series: Serie[] = [];
  effect = 'scrollx';
  selectedSerie: Serie;

  constructor(private serieService: SerieService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.getAllSerie();
  }

  getAllSerie() {
    this.serieService.getAllSerie().subscribe(
      res => {
        this.series = res;
      },
      error => {
        alert("Impossible de récupérer les séries");
      }
    )
  }

  selectSerie(serie: Serie) {
    this.selectedSerie = serie;
  }

  addSerieAfterCreate(serie: Serie) {
    this.series.push(serie);
  }

  refreshSerieAfterUpdate(serie:Serie){
    this.selectedSerie.scxLibelle = serie.scxLibelle;
    this.selectedSerie.scxDescription = serie.scxDescription;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer la série'+this.selectedSerie.scxLibelle +'?',
      nzContent: '',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.serieService.deleteSerie(this.selectedSerie.scxIdSerie).subscribe(
        res => {
          let indexOfSelectedSerie = this.series.indexOf(this.selectedSerie);
          this.series.splice(indexOfSelectedSerie, 1);
          this.selectedSerie = null;
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
