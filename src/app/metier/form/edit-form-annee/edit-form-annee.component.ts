import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnneeAcademique} from "../../../models/annee-academique";
import {SuiviProjetPedagogique} from "../../../models/suivi-projet-pedagogique";
import {AnneeAcademiqueService} from "../../../services/anneeAcademique/annee-academique.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-form-annee',
  templateUrl: './edit-form-annee.component.html',
  styleUrls: ['./edit-form-annee.component.css']
})
export class EditFormAnneeComponent implements OnChanges {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  periode:Date[] = [];
  annee:AnneeAcademique = {
    scxDateFin: null,
    scxDateDebut:null,
    scxIdAnneeAcademique: null
  };

  @Input() selectedAnnee:AnneeAcademique;
  @Output() updatedAnnee:EventEmitter<AnneeAcademique> = new EventEmitter<AnneeAcademique>();

  constructor(private fb: FormBuilder,
              private anneeService:AnneeAcademiqueService,
              private datePipe:DatePipe) {

  }

  ngOnChanges() {
    this.periode.push(this.selectedAnnee.scxDateDebut);
    this.periode.push(this.selectedAnnee.scxDateFin);
    this.validateForm = this.fb.group({
      'periode':[this.periode,Validators.required]
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
    this.annee.scxIdAnneeAcademique = this.selectedAnnee.scxIdAnneeAcademique;
    this.anneeService.updateAnnee(this.annee).subscribe(
      res =>{
        this.updatedAnnee.emit(this.annee);
      },
      error1 => {
        alert("Impossible de mettre à jour l'année");
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
}
