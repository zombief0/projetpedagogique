import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../../models/matiere";
import {MatiereService} from "../../../services/matiere/matiere.service";

@Component({
  selector: 'app-add-form-matiere',
  templateUrl: './add-form-matiere.component.html',
  styleUrls: ['./add-form-matiere.component.css']
})
export class AddFormMatiereComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  matiere:Matiere = {
    scxLibelle:'',
    scxIdMatiere:null,
  };

  @Output() newMatiere:EventEmitter<Matiere> = new EventEmitter<Matiere>();

  constructor(private fb: FormBuilder, private matiereService:MatiereService) {

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

    this.matiere.scxLibelle = this.validateForm.value["libelle"];
    this.matiereService.saveMatiere(this.matiere).subscribe(
      res =>{
        this.matiere.scxIdMatiere = res.scxIdMatiere;
        this.newMatiere.emit(this.matiere);
        this.matiere = {
          scxLibelle:'',
          scxIdMatiere:null,
        };
      },
      error1 => {
        alert("Impossible d'ajouter une matière");
        this.matiere = {
          scxLibelle:'',
          scxIdMatiere:null,
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
