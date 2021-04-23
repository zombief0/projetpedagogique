import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Trimestre} from "../../../models/trimestre";
import {SuiviProjetPedagogique} from "../../../models/suivi-projet-pedagogique";
import {TrimestreService} from "../../../services/trimestre/trimestre.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-form-trimestre',
  templateUrl: './edit-form-trimestre.component.html',
  styleUrls: ['./edit-form-trimestre.component.css']
})
export class EditFormTrimestreComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  periode:Date[] = [];
  trimestre:Trimestre = {
    scxDateFin: null,
    scxDateDebut:null,
    scxNumero:null,
    scxProgression:0,
    scxStatut: "NON_TERMINE",
    scxIdTrimestre:null,
    scxIdSuiviProjetPedagogique:null
  };

  @Input() selectedTrimestre:Trimestre;
  @Output() updatedTrimestre:EventEmitter<Trimestre> = new EventEmitter<Trimestre>();

  constructor(private fb: FormBuilder,
              private trimestreService:TrimestreService,
              private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.periode.push(this.selectedTrimestre.scxDateDebut);
    this.periode.push(this.selectedTrimestre.scxDateFin);
    this.validateForm = this.fb.group({
      'numero': [this.selectedTrimestre.scxNumero, [Validators.required]],
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


    this.trimestre.scxNumero = this.validateForm.value["numero"];
    let periode:Date [];
    periode = this.validateForm.value["periode"];
    this.trimestre.scxDateDebut = periode[0];
    this.trimestre.scxDateFin = periode[1];
    this.datePipe.transform(this.trimestre.scxDateDebut,'yyyy-MM-dd');
    this.datePipe.transform(this.trimestre.scxDateFin,'yyyy-MM-dd');
    this.trimestre.scxIdSuiviProjetPedagogique = this.selectedTrimestre.scxIdSuiviProjetPedagogique;
    this.trimestre.scxIdTrimestre = this.selectedTrimestre.scxIdTrimestre;
    this.trimestreService.updateTrimestre(this.trimestre).subscribe(
      res =>{
        this.updatedTrimestre.emit(this.trimestre);
      },
      error1 => {
        alert("Impossible de mettre à jour le trimestre");
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
