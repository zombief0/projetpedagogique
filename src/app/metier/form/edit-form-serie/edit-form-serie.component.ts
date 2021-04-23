import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Serie} from "../../../models/serie";
import {SerieService} from "../../../services/serie/serie.service";

@Component({
  selector: 'app-edit-form-serie',
  templateUrl: './edit-form-serie.component.html',
  styleUrls: ['./edit-form-serie.component.css']
})
export class EditFormSerieComponent implements OnChanges {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  serie:Serie = {
    scxLibelle:'',
    scxDescription:'',
    scxIdSerie:null,
  };

  @Output() updatedSerie:EventEmitter<Serie> = new EventEmitter<Serie>();
  @Input() selectedSerie : Serie;

  constructor(private fb: FormBuilder, private serieService:SerieService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedSerie.scxLibelle, [Validators.required]],
      'description':[this.selectedSerie.scxDescription]
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
    this.serie.scxIdSerie = this.selectedSerie.scxIdSerie;
    this.serieService.updateSerie(this.serie).subscribe(
      res =>{
        this.updatedSerie.emit(this.serie);
      },
      error1 => {
        alert("Impossible de mettre à jour la série");
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
      'libelle': [this.selectedSerie.scxLibelle, [Validators.required]],
      'description':[this.selectedSerie.scxDescription]
    });
  }

}
