import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";
import {SalleService} from "../../../services/salle/salle.service";
import {SpecialiteService} from "../../../services/specialite/specialite.service";
import {SerieService} from "../../../services/serie/serie.service";
import {Specialite} from "../../../models/specialite";
import {Serie} from "../../../models/serie";
import {AnneeAcademique} from "../../../models/annee-academique";
import {Salle} from "../../../models/salle";

@Component({
  selector: 'app-add-form-salle',
  templateUrl: './add-form-salle.component.html',
  styleUrls: ['./add-form-salle.component.css']
})
export class AddFormSalleComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  @Input() selectedClasse: Classe;
  @Input() selectedAnnee: AnneeAcademique;
  salle:Salle = {
    scxLibelle:'',
    scxDescription:'',
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
    scxIdClasse:null,
    scxIdSalle:null,
    scxIdAnneeAcademique:null
  };

  specialites:Specialite[] = [];
  series:Serie[] = [];
  serie:Serie = null;
  specialite:Specialite = null;

  @Output() newSalle:EventEmitter<Salle> = new EventEmitter<Salle>();

  constructor(private fb: FormBuilder, private salleService:SalleService,
              private specialiteService:SpecialiteService,private serieService:SerieService) {

  }

  ngOnInit() {
    this.getAllSeries();
    this.getAllSpecialite();
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'description':['',],
      'specialite':[this.specialite],
      'serie':[this.serie]
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

    this.salle.scxLibelle = this.validateForm.value["libelle"];
    this.salle.scxDescription = this.validateForm.value["description"];
    this.salle.scxIdClasse = this.selectedClasse.scxIdClasse;
    this.salle.scxIdAnneeAcademique = this.selectedAnnee.scxIdAnneeAcademique;
    if(this.validateForm.value["specialite"] != null) {
      this.salle.specialite = this.validateForm.value["specialite"];
    }
    if( this.validateForm.value["serie"] != null) {
      this.salle.serie = this.validateForm.value["serie"];
    }
    this.salleService.saveSalle(this.salle).subscribe(
      res =>{
        this.salle.scxIdSalle = res.scxIdSalle;
        this.newSalle.emit(this.salle);
        this.salle = {
          scxLibelle:'',
          scxDescription:'',
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
          scxIdClasse:null,
          scxIdSalle:null,
          scxIdAnneeAcademique:null
        };
      },
      error1 => {
        alert("Impossible d'ajouter une salle à la classe sélectionnée");
        this.salle = {
          scxLibelle:'',
          scxDescription:'',
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
          scxIdClasse:null,
          scxIdSalle:null,
          scxIdAnneeAcademique:null
        };
      }
    );


    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
    this.validateForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk():void{
    console.log(this.validateForm);
    console.log(this.validateForm.value);
  }

  getAllSpecialite(){
    this.specialiteService.getAllSpecialite().subscribe(
      res=> {
        this.specialites = res;
      },
      error => {
        alert("Impossible de récupérer les spécialités");
      }
    )
  }

  getAllSeries(){
    this.serieService.getAllSerie().subscribe(
      res =>{
        this.series = res;
      },
      error => {
        alert("Impossible de récupérer les séries");
      }
    )
  }

}
