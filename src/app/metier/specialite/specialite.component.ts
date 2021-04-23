import { Component, OnInit } from '@angular/core';
import {SpecialiteService} from "../../services/specialite/specialite.service";
import {Specialite} from "../../models/specialite";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {
  specialites: Specialite[] = [];
  effect = 'scrollx';
  selectedSpecialite: Specialite;

  constructor(private specialiteService: SpecialiteService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.getAllSpecialite();
  }

  getAllSpecialite() {
    this.specialiteService.getAllSpecialite().subscribe(
      res => {
        this.specialites = res;
      },
      error => {
        alert("Impossible de récupérer les spécialités");
      }
    )
  }

  selectSpecialite(specialite: Specialite) {
    this.selectedSpecialite = specialite;
  }

  addSpecialiteAfterCreate(specialite: Specialite) {
    this.specialites.push(specialite);
  }

  refreshSpecialiteAfterUpdate(specialite:Specialite){
    this.selectedSpecialite.scxLibelle = specialite.scxLibelle;
    this.selectedSpecialite.scxDescription = specialite.scxDescription;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment supprimer la spécialité'+this.selectedSpecialite.scxLibelle +'?',
      nzContent: '',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.specialiteService.deleteSpecialite(this.selectedSpecialite.scxIdSpecialite).subscribe(
        res => {
          let indexOfSelectedSpecialite = this.specialites.indexOf(this.selectedSpecialite);
          this.specialites.splice(indexOfSelectedSpecialite, 1);
          this.selectedSpecialite = null;
        },
        error => {
          alert("Une erreur est survenue Impossible de supprimer");
        }
      ),
      nzCancelText: 'Non'
    });
  }
}
