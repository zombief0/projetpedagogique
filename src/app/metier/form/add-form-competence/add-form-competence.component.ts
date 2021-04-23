import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";
import {Chapitre} from "../../../models/chapitre";
import {Competence} from "../../../models/competence";
import {CompetenceService} from "../../../services/competence/competence.service";

@Component({
  selector: 'app-add-form-competence',
  templateUrl: './add-form-competence.component.html',
  styleUrls: ['./add-form-competence.component.css']
})
export class AddFormCompetenceComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedChapitre: Chapitre;
  competence:Competence = {
    scxLibelle:'',
    scxIdCompetence:null,
    scxIdChapitre:null,
  };

  @Output() newCompetence:EventEmitter<Competence> = new EventEmitter<Competence>();

  constructor(private fb: FormBuilder,
              private competenceService:CompetenceService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.competence.scxLibelle = this.validateForm.value["libelle"];
    this.competence.scxIdChapitre = this.selectedChapitre.scxIdChapitre;
    this.competenceService.saveCompetence(this.competence).subscribe(
      res =>{
        this.competence.scxIdCompetence = res.scxIdCompetence;
        this.newCompetence.emit(this.competence);
        this.competence = {
          scxLibelle:'',
          scxIdCompetence:null,
          scxIdChapitre:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter une competence au chapitre sélectionné");
        this.competence = {
          scxLibelle:'',
          scxIdCompetence:null,
          scxIdChapitre:null,
        };
      }
    );

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
    this.validateForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
