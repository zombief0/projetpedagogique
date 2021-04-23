import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle/cycle.service";

@Component({
  selector: 'app-form-cycle',
  templateUrl: './form-cycle.component.html',
  styleUrls: ['./form-cycle.component.css']
})
export class FormCycleComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  cycle:Cycle = {
    scxLibelle:'',
    scxIdCycle:null
  };

  @Output() newCycle:EventEmitter<Cycle> = new EventEmitter<Cycle>();

  constructor(private fb: FormBuilder, private cycleService:CycleService) {

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

    this.cycle.scxLibelle = this.validateForm.value["libelle"];

    this.cycleService.saveCycle(this.cycle).subscribe(
      res =>{
        this.cycle.scxIdCycle = res.scxIdCycle;
        this.newCycle.emit(this.cycle);
      },
      error1 => {
        alert("Impossible d'ajouter un cycle");
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
