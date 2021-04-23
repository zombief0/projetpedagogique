import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {Classe} from "../../../models/classe";
import {ClasseService} from "../../../services/classe/classe.service";
import {ProjetPedagogique} from "../../../models/projet-pedagogique";
import {AnneeAcademique} from "../../../models/annee-academique";
import {ProjetPedagogiqueService} from "../../../services/projetPedagogique/projet-pedagogique.service";
import {DatePipe} from "@angular/common";
import {Cours} from "../../../models/cours";

@Component({
  selector: 'app-add-form-projet',
  templateUrl: './add-form-projet.component.html',
  styleUrls: ['./add-form-projet.component.css']
})
export class AddFormProjetComponent implements OnInit {

  @Input() selectedCours:Cours;
  @Input() selectedAnnee:AnneeAcademique;
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
    dateModification: null,
  };

  @Output() newProjet:EventEmitter<ProjetPedagogique> = new EventEmitter<ProjetPedagogique>();

  constructor(private fb: FormBuilder, private projetService:ProjetPedagogiqueService,
              private datePipe:DatePipe) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
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
    this.projet.scxIdCours = this.selectedCours.scxIdCours;
    this.projet.scxIdAnneeAcademique = this.selectedAnnee.scxIdAnneeAcademique;
    this.projet.scxStatut = "ATTENTE";
    this.projet.dateCreation = new Date();
    this.projet.dateModification = new Date();
    this.datePipe.transform(this.projet.dateCreation,'yyyy-MM-dd');
    this.datePipe.transform(this.projet.dateModification,'yyyy-MM-dd');
    this.projetService.saveProjet(this.projet).subscribe(
      res =>{
        this.projet.scxIdProjetPedagogique = res.scxIdProjetPedagogique;
        this.newProjet.emit(this.projet);
        this.projet =  {
          scxDescription:'',
          scxIdProjetPedagogique:null,
          scxIdAnneeAcademique:null,
          scxIdCours: null,
          scxStatut: null,
          dateCreation: null,
          dateModification: null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter un projet pédagogique");
        this.projet =  {
          scxDescription:'',
          scxIdProjetPedagogique:null,
          scxIdAnneeAcademique:null,
          scxIdCours: null,
          scxStatut: null,
          dateCreation: null,
          dateModification: null,
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
