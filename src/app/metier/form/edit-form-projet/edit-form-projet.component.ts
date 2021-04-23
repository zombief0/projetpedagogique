import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../models/cours";
import {AnneeAcademique} from "../../../models/annee-academique";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjetPedagogique} from "../../../models/projet-pedagogique";
import {ProjetPedagogiqueService} from "../../../services/projetPedagogique/projet-pedagogique.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-form-projet',
  templateUrl: './edit-form-projet.component.html',
  styleUrls: ['./edit-form-projet.component.css']
})
export class EditFormProjetComponent implements OnInit {

  @Input() selectedProjet:ProjetPedagogique;
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  projet:ProjetPedagogique = {
    scxDescription:'',
    scxIdProjetPedagogique:null,
    scxIdAnneeAcademique:null,
    scxIdCours: null,
    scxStatut: null,
    dateCreation: null,
    dateModification: new Date(),
  };

  @Output() updateProjet:EventEmitter<ProjetPedagogique> = new EventEmitter<ProjetPedagogique>();

  constructor(private fb: FormBuilder, private projetService:ProjetPedagogiqueService,
              private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedProjet.scxDescription, [Validators.required]],
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

    this.projet.scxDescription = this.validateForm.value["libelle"];
    this.projet.scxIdCours = this.selectedProjet.scxIdCours;
    this.projet.scxIdAnneeAcademique = this.selectedProjet.scxIdAnneeAcademique;
    this.projet.scxIdProjetPedagogique = this.selectedProjet.scxIdProjetPedagogique;
    this.projet.scxStatut = this.selectedProjet.scxStatut;
    this.projet.dateCreation = this.selectedProjet.dateCreation;
    this.datePipe.transform(this.projet.dateCreation,'yyyy-MM-dd');
    this.datePipe.transform(this.projet.dateModification,'yyyy-MM-dd');
    this.projetService.updateProjet(this.projet).subscribe(
      res =>{
        this.updateProjet.emit(this.projet);
      },
      error1 => {
        alert("Impossible de mettre à jour le projet pédagogique");
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
