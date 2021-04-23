import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnneeAcademique} from "../../../models/annee-academique";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjetPedagogique} from "../../../models/projet-pedagogique";
import {ProjetPedagogiqueService} from "../../../services/projetPedagogique/projet-pedagogique.service";
import {DatePipe} from "@angular/common";
import {SuiviProjetPedagogique} from "../../../models/suivi-projet-pedagogique";
import {SuiviProjetPedagogiqueService} from "../../../services/suiviProjetPedagogique/suivi-projet-pedagogique.service";
import {ClasseService} from "../../../services/classe/classe.service";
import {SalleService} from "../../../services/salle/salle.service";
import {Classe} from "../../../models/classe";
import {CycleService} from "../../../services/cycle/cycle.service";
import {Cycle} from "../../../models/cycle";
import {Salle} from "../../../models/salle";
import {Cours} from "../../../models/cours";
import {EnseignerService} from "../../../services/enseigner/enseigner.service";
import {Enseigner} from "../../../models/enseigner";

@Component({
  selector: 'app-add-form-suivi',
  templateUrl: './add-form-suivi.component.html',
  styleUrls: ['./add-form-suivi.component.css']
})
export class AddFormSuiviComponent implements OnInit {

  @Input() selectedCours:Cours;
  @Input() selectedAnnee:AnneeAcademique;
  @Input() selectedProjet:ProjetPedagogique;
  enseigners:Enseigner[] = [];
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  suivi:SuiviProjetPedagogique = {
    scxProgression:0,
    scxNomSalle:null,
    scxIdSalle:null,
    scxIdSuivi:null,
    scxIdProjetPedagogique:null,
  };

  @Output() newSuivi:EventEmitter<SuiviProjetPedagogique> = new EventEmitter<SuiviProjetPedagogique>();

  constructor(private fb: FormBuilder,
              private suiviService:SuiviProjetPedagogiqueService,
              private enseignerService:EnseignerService) {

  }

  ngOnInit() {
    this.getAllSallesByCoursAnnee();
    this.validateForm = this.fb.group({
      'salle': [null, [Validators.required]],
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

    this.suivi.scxIdSalle = this.validateForm.value["salle"].scxIdSalle;
    this.suivi.scxNomSalle = this.validateForm.value["salle"].scxLibelle;
    this.suivi.scxIdProjetPedagogique = this.selectedProjet.scxIdProjetPedagogique;
    this.suiviService.saveSuivi(this.suivi).subscribe(
      res => {
        this.suivi.scxIdSuivi = res.scxIdSuivi;
        this.newSuivi.emit(this.suivi);
        this.suivi = {
          scxProgression:0,
          scxNomSalle:null,
          scxIdSalle:null,
          scxIdSuivi:null,
          scxIdProjetPedagogique:null,
        };
      },
      error => {
        alert("Impossible de créer un suivi");
        this.suivi = {
          scxProgression:0,
          scxNomSalle:null,
          scxIdSalle:null,
          scxIdSuivi:null,
          scxIdProjetPedagogique:null,
        };
      },
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

  getAllSallesByCoursAnnee(){
    this.enseignerService.getAllEnseignerByAnneeCours(this.selectedAnnee.scxIdAnneeAcademique,this.selectedCours.scxIdCours).subscribe(
      res =>{
        this.enseigners = res;
      },
      error => {
        alert("Impossible de récupérer les salles du cours concerné");
      }
    );
  }

  compare = (salle1:any,salle2:any) => (salle1 && salle2? salle1.scxIdSalle == salle2.scxIdSalle:salle1 == salle2);

}
