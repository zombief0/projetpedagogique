import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Activite} from "../../models/activite";
import {Objectif} from "../../models/objectif";
import {ObjectifService} from "../../services/objectif/objectif.service";
import {Chapitre} from "../../models/chapitre";
import {Competence} from "../../models/competence";
import {CompetenceService} from "../../services/competence/competence.service";

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedChapitre: Chapitre;
  competences:Competence[] = [];

  constructor(private competenceService:CompetenceService) {

  }

  ngOnInit() {
    this.getAllCompetenceByChapitre();
  }

  getAllCompetenceByChapitre(){
    this.competenceService.getAllCompetenceByChapitre(this.selectedChapitre.scxIdChapitre).subscribe(
      res =>{
        this.competences = res;
      },
      error => {
        alert("Impossible de récupérer les compétences du chapitre")
      }
    )
  }

  addCompetenceAfterCreate(competence:Competence){
    this.competences.push(competence);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleFermer(): void {
    this.isVisible = false;
  }

}
