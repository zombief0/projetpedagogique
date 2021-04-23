import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Cours} from "../../../models/cours";
import {AnneeAcademique} from "../../../models/annee-academique";
import {ProjetPedagogique} from "../../../models/projet-pedagogique";
import {Enseigner} from "../../../models/enseigner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SuiviProjetPedagogique} from "../../../models/suivi-projet-pedagogique";
import {SuiviProjetPedagogiqueService} from "../../../services/suiviProjetPedagogique/suivi-projet-pedagogique.service";
import {EnseignerService} from "../../../services/enseigner/enseigner.service";
import {SalleService} from "../../../services/salle/salle.service";
import {Salle} from "../../../models/salle";

@Component({
  selector: 'app-edit-form-suivi',
  templateUrl: './edit-form-suivi.component.html',
  styleUrls: ['./edit-form-suivi.component.css']
})
export class EditFormSuiviComponent implements OnChanges {

  @Input() selectedCours:Cours;
  @Input() selectedAnnee:AnneeAcademique;
  @Input() selectedSuivi:SuiviProjetPedagogique;
  @Input() salle:Salle;
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

  @Output() updateSuivi:EventEmitter<SuiviProjetPedagogique> = new EventEmitter<SuiviProjetPedagogique>();

  constructor(private fb: FormBuilder,
              private suiviService:SuiviProjetPedagogiqueService,
              private enseignerService:EnseignerService,private salleService:SalleService) {

  }

  ngOnChanges() {
    this.getAllSallesByCoursAnnee();
    this.validateForm = this.fb.group({
      'salle': [this.salle, [Validators.required]],
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
    this.suivi.scxIdProjetPedagogique = this.selectedSuivi.scxIdProjetPedagogique;
    this.suivi.scxIdSuivi = this.selectedSuivi.scxIdSuivi;
    this.suiviService.updateSuivi(this.suivi).subscribe(
      res => {
        this.updateSuivi.emit(this.suivi);
      },
      error => {
        alert("Impossible de mettre à jour le suivi");
      },
    );

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1500);
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
