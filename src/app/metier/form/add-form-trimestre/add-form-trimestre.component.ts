import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Serie} from "../../../models/serie";
import {SerieService} from "../../../services/serie/serie.service";
import {Trimestre} from "../../../models/trimestre";
import {TrimestreService} from "../../../services/trimestre/trimestre.service";
import {SuiviProjetPedagogique} from "../../../models/suivi-projet-pedagogique";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-form-trimestre',
  templateUrl: './add-form-trimestre.component.html',
  styleUrls: ['./add-form-trimestre.component.css']
})
export class AddFormTrimestreComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  trimestre:Trimestre = {
    scxDateFin: null,
    scxDateDebut:null,
    scxNumero:null,
    scxProgression:0,
    scxStatut: "NON_TERMINE",
    scxIdTrimestre:null,
    scxIdSuiviProjetPedagogique:null
  };

  @Input() selectedSuivi:SuiviProjetPedagogique;
  @Output() newTrimestre:EventEmitter<Trimestre> = new EventEmitter<Trimestre>();

  constructor(private fb: FormBuilder,
              private trimestreService:TrimestreService,
              private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'numero': [null, [Validators.required]],
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


    this.trimestre.scxNumero = this.validateForm.value["numero"];
    let periode:Date [];
    periode = this.validateForm.value["periode"];
    this.trimestre.scxDateDebut = periode[0];
    this.trimestre.scxDateFin = periode[1];
    this.datePipe.transform(this.trimestre.scxDateDebut,'yyyy-MM-dd');
    this.datePipe.transform(this.trimestre.scxDateFin,'yyyy-MM-dd');
    this.trimestre.scxIdSuiviProjetPedagogique = this.selectedSuivi.scxIdSuivi;
    this.trimestreService.saveTrimestre(this.trimestre).subscribe(
      res =>{
        this.trimestre.scxIdTrimestre = res.scxIdTrimestre;
        this.newTrimestre.emit(this.trimestre);
        this.trimestre = {
          scxDateFin: null,
          scxDateDebut:null,
          scxNumero:null,
          scxProgression:0,
          scxStatut: "NON_TERMINE",
          scxIdTrimestre:null,
          scxIdSuiviProjetPedagogique:null
        };
      },
      error1 => {
        alert("Impossible d'ajouter un trimestre");
        this.trimestre = {
          scxDateFin: null,
          scxDateDebut:null,
          scxNumero:null,
          scxProgression:0,
          scxStatut: "NON_TERMINE",
          scxIdTrimestre:null,
          scxIdSuiviProjetPedagogique:null
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
