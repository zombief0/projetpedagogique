import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Activite} from "../../models/activite";
import {Objectif} from "../../models/objectif";
import {ObjectifService} from "../../services/objectif/objectif.service";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  @Input() selectedActivite: Activite;
  objectifs:Objectif[] = [];

  constructor(private objectifService:ObjectifService) {

  }

  ngOnInit() {
    this.getAllObjectifsByActivite()
  }

  getAllObjectifsByActivite(){
    this.objectifService.getAllObjectifsByActivite(this.selectedActivite.scxIdActivite).subscribe(
      res => {
        this.objectifs = res;
      },
      error => {
        alert("Impossible de récupérer les objectifs de l'activité");
      }
    )
  }

  addObjectifAfterCreate(objectif:Objectif){
    this.objectifs.push(objectif);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleFermer(): void {
    this.isVisible = false;
  }



}
