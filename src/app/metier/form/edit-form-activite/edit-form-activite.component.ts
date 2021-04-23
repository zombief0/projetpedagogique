import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Activite} from "../../../models/activite";
import {Chapitre} from "../../../models/chapitre";
import {ActiviteService} from "../../../services/activite/activite.service";

@Component({
  selector: 'app-edit-form-activite',
  templateUrl: './edit-form-activite.component.html',
  styleUrls: ['./edit-form-activite.component.css']
})
export class EditFormActiviteComponent implements OnChanges {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  activite:Activite = {
    scxLibelle:'',
    scxDescription:'',
    scxIdActivite:null,
    scxIdChapitre:null,
    scxNumero:null,
    scxStatut:'NON_TERMINE',
    scxType: null
  };

  @Input() selectedActivite:Activite;
  @Output() updatedActivite:EventEmitter<Activite> = new EventEmitter<Activite>();

  constructor(private fb: FormBuilder, private activiteService:ActiviteService) {

  }

  ngOnChanges() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedActivite.scxLibelle, [Validators.required]],
      'description':[this.selectedActivite.scxDescription],
      'numero':[this.selectedActivite.scxNumero,Validators.required],
      'type':[this.selectedActivite.scxType,Validators.required]
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

    this.activite.scxLibelle = this.validateForm.value["libelle"];
    this.activite.scxDescription = this.validateForm.value["description"];
    this.activite.scxNumero = this.validateForm.value["numero"];
    this.activite.scxType = this.validateForm.value["type"];
    this.activite.scxIdChapitre = this.selectedActivite.scxIdChapitre;
    this.activite.scxIdActivite = this.selectedActivite.scxIdActivite;
    this.activiteService.updateActivite(this.activite).subscribe(
      res =>{
        this.updatedActivite.emit(this.activite);
      },
      error1 => {
        alert("Impossible de mettre à jour la leçon");
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
