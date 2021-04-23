import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Module} from "../../../models/module";
import {Trimestre} from "../../../models/trimestre";
import {ModuleService} from "../../../services/module/module.service";
import {Chapitre} from "../../../models/chapitre";
import {ChapitreService} from "../../../services/chapitre/chapitre.service";

@Component({
  selector: 'app-add-form-chapitre',
  templateUrl: './add-form-chapitre.component.html',
  styleUrls: ['./add-form-chapitre.component.css']
})
export class AddFormChapitreComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  chapitre:Chapitre = {
    scxLibelle:'',
    scxDescription:'',
    scxIdModule:null,
    scxProgression:0,
    scxIdChapitre:null,
    scxNumero:null,
    scxStatut:'NON_TERMINE'
  };

  @Input() selectedModule:Module;
  @Output() newChapitre:EventEmitter<Chapitre> = new EventEmitter<Chapitre>();

  constructor(private fb: FormBuilder, private chapitreService:ChapitreService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'description':[''],
      'numero':[null,Validators.required]
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

    this.chapitre.scxLibelle = this.validateForm.value["libelle"];
    this.chapitre.scxDescription = this.validateForm.value["description"];
    this.chapitre.scxNumero = this.validateForm.value["numero"];
    this.chapitre.scxIdModule = this.selectedModule.scxIdModule;
    this.chapitreService.saveChapitre(this.chapitre).subscribe(
      res =>{
        this.chapitre.scxIdChapitre = res.scxIdChapitre;
        this.newChapitre.emit(this.chapitre);
        this.chapitre = {
          scxLibelle:'',
          scxDescription:'',
          scxIdModule:null,
          scxProgression:0,
          scxIdChapitre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE'
        };
      },
      error1 => {
        alert("Impossible d'ajouter un chapitre");
        this.chapitre = {
          scxLibelle:'',
          scxDescription:'',
          scxIdModule:null,
          scxProgression:0,
          scxIdChapitre:null,
          scxNumero:null,
          scxStatut:'NON_TERMINE'
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
