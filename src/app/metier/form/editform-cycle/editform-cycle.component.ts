import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle/cycle.service";

@Component({
  selector: 'app-editform-cycle',
  templateUrl: './editform-cycle.component.html',
  styleUrls: ['./editform-cycle.component.css']
})
export class EditformCycleComponent implements OnChanges{

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  cycle:Cycle = {
    scxLibelle:'',
    scxIdCycle:null
  };

  @Output() updatedCycle:EventEmitter<Cycle> = new EventEmitter<Cycle>();
  @Input() selectedCycle: Cycle;
  constructor(private fb: FormBuilder, private cycleService:CycleService) {

  }

  ngOnInit() {

      this.validateForm = this.fb.group({
        'libelle': [this.selectedCycle.scxLibelle, [Validators.required]],
      });

  }

  ngOnChanges(){
    this.validateForm = this.fb.group({
      'libelle': [this.selectedCycle.scxLibelle, [Validators.required]],
    });

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOkAndSubmit(): void {

    this.cycle.scxLibelle = this.validateForm.value["libelle"];
    this.cycle.scxIdCycle = this.selectedCycle.scxIdCycle;
    this.cycleService.updateCycle(this.cycle).subscribe(
      res =>{
        this.updatedCycle.emit(this.cycle);
      },
      error1 => {
        alert("Impossible de mettre à jour le cycle");
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

  handleOk(): void {
    console.log(this.selectedCycle);
  }



}
