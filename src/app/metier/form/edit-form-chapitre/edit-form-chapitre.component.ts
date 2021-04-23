import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chapitre} from "../../../models/chapitre";
import {Module} from "../../../models/module";
import {ChapitreService} from "../../../services/chapitre/chapitre.service";

@Component({
  selector: 'app-edit-form-chapitre',
  templateUrl: './edit-form-chapitre.component.html',
  styleUrls: ['./edit-form-chapitre.component.css']
})
export class EditFormChapitreComponent implements OnInit {

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

  @Input() selectedChapitre:Chapitre;
  @Output() updatedChapitre:EventEmitter<Chapitre> = new EventEmitter<Chapitre>();

  constructor(private fb: FormBuilder, private chapitreService:ChapitreService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      'libelle': [this.selectedChapitre.scxLibelle, [Validators.required]],
      'description':[this.selectedChapitre.scxDescription],
      'numero':[this.selectedChapitre.scxNumero,Validators.required]
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
    this.chapitre.scxProgression = this.selectedChapitre.scxProgression;
    this.chapitre.scxIdModule = this.selectedChapitre.scxIdModule;
    this.chapitre.scxIdChapitre = this.selectedChapitre.scxIdChapitre;
    this.chapitreService.updateChapitre(this.chapitre).subscribe(
      res =>{
        this.updatedChapitre.emit(this.chapitre);
      },
      error1 => {
        alert("Impossible de mettre à jour le chapitre");
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
