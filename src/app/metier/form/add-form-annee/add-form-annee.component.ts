import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AnneeAcademique} from "../../../models/annee-academique";
import {AnneeAcademiqueService} from "../../../services/anneeAcademique/annee-academique.service";

@Component({
  selector: 'app-add-form-annee',
  templateUrl: './add-form-annee.component.html',
  styleUrls: ['./add-form-annee.component.css']
})
export class AddFormAnneeComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  annee:AnneeAcademique = {
    scxDateFin: null,
    scxDateDebut:null,
    scxIdAnneeAcademique: null
  };

  @Output() newAnnee:EventEmitter<AnneeAcademique> = new EventEmitter<AnneeAcademique>();

  constructor(private fb: FormBuilder,
              private anneeService:AnneeAcademiqueService,
              private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'periode':[null,Validators.required]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk():void{
    console.log(this.validateForm);
    console.log(this.validateForm.value["periode"]);
    let periode:Date [];
    periode = this.validateForm.value["periode"];
    console.log(periode);
  }

  handleOkAndSubmit(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let periode:Date [];
    periode = this.validateForm.value["periode"];
    this.annee.scxDateDebut = periode[0];
    this.annee.scxDateFin = periode[1];
    this.datePipe.transform(this.annee.scxDateDebut,'yyyy-MM-dd');
    this.datePipe.transform(this.annee.scxDateFin,'yyyy-MM-dd');
    this.anneeService.saveAnnee(this.annee).subscribe(
      res =>{
        this.annee.scxIdAnneeAcademique = res.scxIdAnneeAcademique;
        this.newAnnee.emit(this.annee);
        this.annee = {
          scxDateFin: null,
          scxDateDebut:null,
          scxIdAnneeAcademique: null
        };
      },
      error1 => {
        alert("Impossible d'ajouter une année");
        this.annee = {
          scxDateFin: null,
          scxDateDebut:null,
          scxIdAnneeAcademique: null
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
