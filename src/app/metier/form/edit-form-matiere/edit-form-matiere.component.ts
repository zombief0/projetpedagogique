import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle/cycle.service";
import {Matiere} from "../../../models/matiere";
import {MatiereService} from "../../../services/matiere/matiere.service";

@Component({
  selector: 'app-edit-form-matiere',
  templateUrl: './edit-form-matiere.component.html',
  styleUrls: ['./edit-form-matiere.component.css']
})
export class EditFormMatiereComponent implements OnChanges {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  matiere:Matiere = {
    scxLibelle:'',
    scxIdMatiere:null
  };

  @Output() updatedMatiere:EventEmitter<Matiere> = new EventEmitter<Matiere>();
  @Input() selectedMatiere: Matiere;
  constructor(private fb: FormBuilder, private matiereService:MatiereService) {

  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      'libelle': [this.selectedMatiere.scxLibelle, [Validators.required]],
    });

  }

  ngOnChanges(){
    this.validateForm = this.fb.group({
      'libelle': [this.selectedMatiere.scxLibelle, [Validators.required]],
    });

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    this.matiere.scxLibelle = this.validateForm.value["libelle"];
    this.matiere.scxIdMatiere = this.selectedMatiere.scxIdMatiere;
    this.matiereService.updateMatiere(this.matiere).subscribe(
      res =>{
        this.updatedMatiere.emit(this.matiere);
      },
      error1 => {
        alert("Impossible de mettre à jour la matière");
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
