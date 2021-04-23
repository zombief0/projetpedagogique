import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../../models/specialite";
import {SpecialiteService} from "../../../services/specialite/specialite.service";

@Component({
  selector: 'app-edit-form-specialite',
  templateUrl: './edit-form-specialite.component.html',
  styleUrls: ['./edit-form-specialite.component.css']
})
export class EditFormSpecialiteComponent implements OnChanges {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  specialite:Specialite = {
    scxLibelle:'',
    scxDescription:'',
    scxIdSpecialite:null,
  };

  @Output() updatedSpecialite:EventEmitter<Specialite> = new EventEmitter<Specialite>();
  @Input() selectedSpecialite : Specialite;

  constructor(private fb: FormBuilder, private specialiteService:SpecialiteService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedSpecialite.scxLibelle, [Validators.required]],
      'description':[this.selectedSpecialite.scxDescription]
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

    this.specialite.scxLibelle = this.validateForm.value["libelle"];
    this.specialite.scxDescription = this.validateForm.value["description"];
    this.specialite.scxIdSpecialite = this.selectedSpecialite.scxIdSpecialite;
    this.specialiteService.updateSpecialite(this.specialite).subscribe(
      res =>{
        this.updatedSpecialite.emit(this.specialite);
      },
      error1 => {
        alert("Impossible de mettre à jour la spécialité");
      }
    );


    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnChanges(): void {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedSpecialite.scxLibelle, [Validators.required]],
      'description':[this.selectedSpecialite.scxDescription]
    });
  }


}
