import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../../models/specialite";
import {SpecialiteService} from "../../../services/specialite/specialite.service";
import {Serie} from "../../../models/serie";
import {SerieService} from "../../../services/serie/serie.service";

@Component({
  selector: 'app-add-form-serie',
  templateUrl: './add-form-serie.component.html',
  styleUrls: ['./add-form-serie.component.css']
})
export class AddFormSerieComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  serie:Serie = {
    scxLibelle:'',
    scxDescription:'',
    scxIdSerie:null,
  };

  @Output() newSerie:EventEmitter<Serie> = new EventEmitter<Serie>();

  constructor(private fb: FormBuilder, private serieService:SerieService) {

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

    this.serie.scxLibelle = this.validateForm.value["libelle"];
    this.serie.scxDescription = this.validateForm.value["description"];
    this.serieService.saveSerie(this.serie).subscribe(
      res =>{
        this.serie.scxIdSerie = res.scxIdSerie;
        this.newSerie.emit(this.serie);
        this.serie = {
          scxLibelle:'',
          scxDescription:'',
          scxIdSerie:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter une série");
        this.serie = {
          scxLibelle:'',
          scxDescription:'',
          scxIdSerie:null,
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
