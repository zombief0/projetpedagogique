import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chapitre} from "../../../models/chapitre";
import {Competence} from "../../../models/competence";
import {CompetenceService} from "../../../services/competence/competence.service";
import {Activite} from "../../../models/activite";
import {Objectif} from "../../../models/objectif";
import {ObjectifService} from "../../../services/objectif/objectif.service";

@Component({
  selector: 'app-add-form-objectif',
  templateUrl: './add-form-objectif.component.html',
  styleUrls: ['./add-form-objectif.component.css']
})
export class AddFormObjectifComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedActivite: Activite;
  objectif:Objectif = {
    scxLibelle:'',
    scxIdObjectif:null,
    scxIdActivite:null,
  };

  @Output() newObjectif:EventEmitter<Objectif> = new EventEmitter<Objectif>();

  constructor(private fb: FormBuilder,
              private objectifService:ObjectifService) {

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

    this.objectif.scxLibelle = this.validateForm.value["libelle"];
    this.objectif.scxIdActivite = this.selectedActivite.scxIdActivite;
    this.objectifService.saveObjectif(this.objectif).subscribe(
      res =>{
        this.objectif.scxIdObjectif = res.scxIdObjectif;
        this.newObjectif.emit(this.objectif);
        this.objectif = {
          scxLibelle:'',
          scxIdObjectif:null,
          scxIdActivite:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter un objectif à la leçon");
        this.objectif = {
          scxLibelle:'',
          scxIdObjectif:null,
          scxIdActivite:null,
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
