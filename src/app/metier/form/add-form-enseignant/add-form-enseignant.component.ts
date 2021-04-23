import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../../models/classe";
import {AnneeAcademique} from "../../../models/annee-academique";
import {Specialite} from "../../../models/specialite";
import {Serie} from "../../../models/serie";
import {SalleService} from "../../../services/salle/salle.service";
import {SpecialiteService} from "../../../services/specialite/specialite.service";
import {SerieService} from "../../../services/serie/serie.service";
import {Enseignant} from "../../../models/enseignant";
import {EnseignantService} from "../../../services/enseignant/enseignant.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-form-enseignant',
  templateUrl: './add-form-enseignant.component.html',
  styleUrls: ['./add-form-enseignant.component.css']
})
export class AddFormEnseignantComponent implements OnInit {

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


  @Output() newEnseignant:EventEmitter<Enseignant> = new EventEmitter<Enseignant>();

  constructor(private fb: FormBuilder,
              private enseignantService:EnseignantService,private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'nom': ['', [Validators.required]],
      'prenom':['',[Validators.required]],
      'dateNaissance':[null],
      'lieuNaissance':[null],
      'telephone':[null,[Validators.required]],
      'email':[null],
      'sexe':[null,[Validators.required]],
      'discipline':['',[Validators.required]],
      'datePriseDeService':[null,[Validators.required]]
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
    this.enseignantService.saveEnseignant(this.enseignant).subscribe(
      res =>{
        this.enseignant.scxIdEnseignant = res.scxIdEnseignant;
        this.newEnseignant.emit(this.enseignant);
        this.enseignant = {
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
      },
      error1 => {
        alert("Impossible d'ajouter un enseignant");
        this.enseignant = {
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

  handleOk():void{
    console.log(this.validateForm);
    console.log(this.validateForm.value);
  }

}
