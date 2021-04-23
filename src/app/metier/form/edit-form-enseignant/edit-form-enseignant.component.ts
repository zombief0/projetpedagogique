import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Enseignant} from "../../../models/enseignant";
import {EnseignantService} from "../../../services/enseignant/enseignant.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-form-enseignant',
  templateUrl: './edit-form-enseignant.component.html',
  styleUrls: ['./edit-form-enseignant.component.css']
})
export class EditFormEnseignantComponent implements OnChanges {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  enseignant:Enseignant = {
    scxDatePriseService: null,
    scxDateNaissance:null,
    scxLieuNaissance:null,
    scxDiscipline:null,
    scxTelephone:null,
    scxEmail:null,
    scxSexe:null,
    scxPrenom:null,
    scxNom:null,
    scxIdEnseignant:null
  };

  @Input() selectedEnseignant:Enseignant;
  @Output() updatedEnseignant:EventEmitter<Enseignant> = new EventEmitter<Enseignant>();

  constructor(private fb: FormBuilder,
              private enseignantService:EnseignantService,private datePipe:DatePipe) {

  }

  ngOnChanges() {
    this.validateForm = this.fb.group({
      'nom': [this.selectedEnseignant.scxNom, [Validators.required]],
      'prenom':[this.selectedEnseignant.scxPrenom,[Validators.required]],
      'dateNaissance':[this.selectedEnseignant.scxDateNaissance],
      'lieuNaissance':[this.selectedEnseignant.scxLieuNaissance],
      'telephone':[this.selectedEnseignant.scxTelephone,[Validators.required]],
      'email':[this.selectedEnseignant.scxEmail],
      'sexe':[this.selectedEnseignant.scxSexe,[Validators.required]],
      'discipline':[this.selectedEnseignant.scxDiscipline,[Validators.required]],
      'datePriseDeService':[this.selectedEnseignant.scxDatePriseService,[Validators.required]]
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

    this.enseignant.scxNom = this.validateForm.value["nom"];
    this.enseignant.scxPrenom = this.validateForm.value["prenom"];
    this.enseignant.scxSexe = this.validateForm.value["sexe"];
    this.enseignant.scxEmail = this.validateForm.value["email"];
    this.enseignant.scxTelephone = this.validateForm.value["telephone"];
    this.enseignant.scxDiscipline = this.validateForm.value["discipline"];
    this.enseignant.scxLieuNaissance = this.validateForm.value["lieuNaissance"];
    this.enseignant.scxDateNaissance = this.validateForm.value["dateNaissance"];
    this.datePipe.transform(this.enseignant.scxDateNaissance,'yyyy-MM-dd');
    this.enseignant.scxDatePriseService = this.validateForm.value["datePriseDeService"];
    this.datePipe.transform(this.enseignant.scxDatePriseService,'yyyy-MM-dd');
    this.enseignant.scxIdEnseignant = this.selectedEnseignant.scxIdEnseignant;
    this.enseignantService.updateEnseignant(this.enseignant).subscribe(
      res =>{
        this.updatedEnseignant.emit(this.enseignant);
      },
      error1 => {
        alert("Impossible de mettre à jour un enseignant");
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

  handleOk():void{
    console.log(this.validateForm);
    console.log(this.validateForm.value);
  }

}
