import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../../models/classe";
import {Salle} from "../../../models/salle";
import {Specialite} from "../../../models/specialite";
import {Serie} from "../../../models/serie";
import {SalleService} from "../../../services/salle/salle.service";
import {SpecialiteService} from "../../../services/specialite/specialite.service";
import {SerieService} from "../../../services/serie/serie.service";

@Component({
  selector: 'app-edit-form-salle',
  templateUrl: './edit-form-salle.component.html',
  styleUrls: ['./edit-form-salle.component.css']
})
export class EditFormSalleComponent implements OnChanges {
  isVisible = false;
  isConfirmLoading = false;
  validateForm: FormGroup;
  @Input() selectedSalle: Salle;
  salle: Salle = {
    scxLibelle: '',
    scxDescription: '',
    serie:{
      scxIdSerie:null,
      scxLibelle:null,
      scxDescription:null
    },
    specialite:{
      scxLibelle:null,
      scxIdSpecialite:null,
      scxDescription:null
    },
    scxIdClasse: null,
    scxIdSalle: null,
    scxIdAnneeAcademique:null
  };

  specialites: Specialite[] = [];
  series: Serie[] = [];

  @Output() updatedSalle: EventEmitter<Salle> = new EventEmitter<Salle>();

  constructor(private fb: FormBuilder, private salleService: SalleService,
              private specialiteService: SpecialiteService, private serieService: SerieService) {

  }

  ngOnChanges(): void {
    this.getAllSeries();
    this.getAllSpecialite();

    this.validateForm = this.fb.group({
      'libelle': [this.selectedSalle.scxLibelle, [Validators.required]],
      'description': [this.selectedSalle.scxDescription],
      'specialite': [this.selectedSalle.specialite],
      'serie': [this.selectedSalle.serie],
    });

  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    this.salle.scxLibelle = this.validateForm.value["libelle"];
    this.salle.scxDescription = this.validateForm.value["description"];
    this.salle.scxIdClasse = this.selectedSalle.scxIdClasse;
    this.salle.scxIdAnneeAcademique = this.selectedSalle.scxIdAnneeAcademique;
    if(this.validateForm.value["specialite"] != null) {
      this.salle.specialite = this.validateForm.value["specialite"];
    }else{
      this.salle.specialite = null;
    }
    if( this.validateForm.value["serie"] != null) {
      this.salle.serie = this.validateForm.value["serie"];
    }else{
      this.salle.serie = null;
    }
    /*this.salle.scxIdSpecialite = this.validateForm.value["specialite"].scxIdSpecialite;
    this.salle.scxIdSerie = this.validateForm.value["serie"].scxIdSerie;*/
    this.salle.scxIdSalle = this.selectedSalle.scxIdSalle;
    this.salleService.updateSalle(this.salle).subscribe(
      res => {
        this.updatedSalle.emit(this.salle);
      },
      error1 => {
        alert("Impossible de mettre à jour la salle");
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

  handleOk(): void {
    console.log(this.validateForm);
    console.log(this.validateForm.value);
  }

  getAllSpecialite() {
    this.specialiteService.getAllSpecialite().subscribe(
      res => {
        this.specialites = res;
      },
      error => {
        alert("Impossible de récupérer les spécialités");
      }
    )
  }

  getAllSeries() {
    this.serieService.getAllSerie().subscribe(
      res => {
        this.series = res;
      },
      error => {
        alert("Impossible de récupérer les séries");
      }
    )
  }

  /*
  compareSerie = (o1:any,o2:any) => (o1 && o2? o1.scxIdSerie === o1.scxIdSerie:o1 === o2);
  compareSpecialite = (o1:any,o2:any) => (o1 && o2? o1.scxIdSpecialite === o1.scxIdSpecialite:o1 === o2);*/
}
