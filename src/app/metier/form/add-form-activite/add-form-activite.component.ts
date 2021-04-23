import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chapitre} from "../../../models/chapitre";
import {Activite} from "../../../models/activite";
import {ActiviteService} from "../../../services/activite/activite.service";

@Component({
  selector: 'app-add-form-activite',
  templateUrl: './add-form-activite.component.html',
  styleUrls: ['./add-form-activite.component.css']
})
export class AddFormActiviteComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  activite:Activite = {
    scxLibelle:'',
    scxDescription:'',
    scxIdActivite:null,
    scxIdChapitre:null,
    scxNumero:null,
    scxStatut:'NON_TERMINE',
    scxType: null
  };

  @Input() selectedChapitre:Chapitre;
  @Output() newActivite:EventEmitter<Activite> = new EventEmitter<Activite>();

  constructor(private fb: FormBuilder, private activiteService:ActiviteService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'description':[''],
      'numero':[null,Validators.required],
      'type':[null,Validators.required]
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

    this.activite.scxLibelle = this.validateForm.value["libelle"];
    this.activite.scxDescription = this.validateForm.value["description"];
    this.activite.scxNumero = this.validateForm.value["numero"];
    this.activite.scxType = this.validateForm.value["type"];
    this.activite.scxIdChapitre = this.selectedChapitre.scxIdChapitre;
    this.activiteService.saveActivite(this.activite).subscribe(
      res =>{
        this.activite.scxIdActivite = res.scxIdActivite;
        this.newActivite.emit(this.activite);
        this.activite= {
          scxLibelle:'',
          scxDescription:'',
          scxIdActivite:null,
          scxIdChapitre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE',
          scxType: null
        };
      },
      error1 => {
        alert("Impossible d'ajouter une leçon");
        this.activite= {
          scxLibelle:'',
          scxDescription:'',
          scxIdActivite:null,
          scxIdChapitre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE',
          scxType: null
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
