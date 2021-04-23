import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../../models/specialite";
import {SpecialiteService} from "../../../services/specialite/specialite.service";

@Component({
  selector: 'app-add-specialite-form',
  templateUrl: './add-specialite-form.component.html',
  styleUrls: ['./add-specialite-form.component.css']
})
export class AddSpecialiteFormComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  specialite:Specialite = {
    scxLibelle:'',
    scxDescription:'',
    scxIdSpecialite:null,
  };

  @Output() newSpecialite:EventEmitter<Specialite> = new EventEmitter<Specialite>();

  constructor(private fb: FormBuilder, private specialiteService:SpecialiteService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'description':['']
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
    this.specialiteService.saveSpecialite(this.specialite).subscribe(
      res =>{
        this.specialite.scxIdSpecialite = res.scxIdSpecialite;
        this.newSpecialite.emit(this.specialite);
        this.specialite = {
          scxLibelle:'',
          scxDescription:'',
          scxIdSpecialite:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter une spécialité");
        this.specialite = {
          scxLibelle:'',
          scxDescription:'',
          scxIdSpecialite:null,
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
