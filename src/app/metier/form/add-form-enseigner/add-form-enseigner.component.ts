import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Enseignant} from "../../../models/enseignant";
import {EnseignantService} from "../../../services/enseignant/enseignant.service";
import {DatePipe} from "@angular/common";
import {Enseigner} from "../../../models/enseigner";
import {CoursService} from "../../../services/cours/cours.service";
import {SalleService} from "../../../services/salle/salle.service";
import {EnseignerService} from "../../../services/enseigner/enseigner.service";
import {MatiereService} from "../../../services/matiere/matiere.service";
import {CycleService} from "../../../services/cycle/cycle.service";
import {ClasseService} from "../../../services/classe/classe.service";
import {AnneeAcademique} from "../../../models/annee-academique";
import {Matiere} from "../../../models/matiere";
import {Cycle} from "../../../models/cycle";
import {Classe} from "../../../models/classe";
import {Salle} from "../../../models/salle";
import {Cours} from "../../../models/cours";

@Component({
  selector: 'app-add-form-enseigner',
  templateUrl: './add-form-enseigner.component.html',
  styleUrls: ['./add-form-enseigner.component.css']
})
export class AddFormEnseignerComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  validateForm:FormGroup;
  enseignants : Enseignant[] = [];
  salles: Salle[] = [];
  cycles:Cycle [] = [];
  classes:Classe [] = [];
  courss:Cours[] = [];
  matieres:Matiere [] = [];
  selectedMatiere:Matiere;
  selectedCycle:Cycle;
  selectedCours:Cours;
  selectedClasse:Classe;
  enseigner:Enseigner = {
    enseignant : {
      scxDatePriseService: null,
      scxDateNaissance: null,
      scxLieuNaissance: null,
      scxDiscipline: null,
      scxTelephone: null,
      scxEmail: null,
      scxSexe: null,
      scxPrenom: null,
      scxNom: null,
      scxIdEnseignant: null
    },
    salleDTO:{
      scxLibelle:'',
      scxDescription:'',
      serie:{
        scxIdSerie:null,
        scxLibelle:null,
        scxDescription:null
      },
      specialite:{
        scxLibelle:null,
        scxIdSpecialite:null,
        scxDescription:null
      },
      scxIdClasse:null,
      scxIdSalle:null,
      scxIdAnneeAcademique:null
    },
    coursDTO:{
      scxLibelle:'',
      scxIdClasse:null,
      scxIdMatiere:null,
      scxIdCours:null,
      scxNature: '',
      scxDescription: '',
      scxCoefficient: null
    }
  };

  @Input() selectedAnnee:AnneeAcademique;
  @Output() newEnseigner:EventEmitter<Enseigner> = new EventEmitter<Enseigner>();

  constructor(private fb: FormBuilder,
              private enseignantService:EnseignantService,
              private coursService:CoursService,
              private salleService:SalleService,
              private enseignerService:EnseignerService,
              private matiereService:MatiereService,
              private cycleService:CycleService,
              private ClasseService:ClasseService) {

  }

  ngOnInit() {
    this.getAllEnseignant();
    this.getAllMatieres();
    this.getAllCycles();
    this.validateForm = this.fb.group({
      'enseignant': [null, [Validators.required]],
      'cours':[null,[Validators.required]],
      'salle':[null,[Validators.required]],
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

    this.enseigner.enseignant = this.validateForm.value["enseignant"];
    this.enseigner.coursDTO = this.validateForm.value["cours"];
    this.enseigner.salleDTO = this.validateForm.value["salle"];

    this.enseignerService.saveEnseigner(this.enseigner).subscribe(
      res =>{
        this.newEnseigner.emit(this.enseigner);
        this.enseigner = {
          enseignant : {
            scxDatePriseService: null,
            scxDateNaissance: null,
            scxLieuNaissance: null,
            scxDiscipline: null,
            scxTelephone: null,
            scxEmail: null,
            scxSexe: null,
            scxPrenom: null,
            scxNom: null,
            scxIdEnseignant: null
          },
          salleDTO:{
            scxLibelle:'',
            scxDescription:'',
            serie:{
              scxIdSerie:null,
              scxLibelle:null,
              scxDescription:null
            },
            specialite:{
              scxLibelle:null,
              scxIdSpecialite:null,
              scxDescription:null
            },
            scxIdClasse:null,
            scxIdSalle:null,
            scxIdAnneeAcademique:null
          },
          coursDTO:{
            scxLibelle:'',
            scxIdMatiere:null,
            scxIdCours:null,
            scxIdClasse:null,
            scxNature: '',
            scxDescription: '',
            scxCoefficient: null
          }
        };
      },
      error1 => {
        alert("Impossible d'ajouter une affectation");
        this.enseigner = {
          enseignant : {
            scxDatePriseService: null,
            scxDateNaissance: null,
            scxLieuNaissance: null,
            scxDiscipline: null,
            scxTelephone: null,
            scxEmail: null,
            scxSexe: null,
            scxPrenom: null,
            scxNom: null,
            scxIdEnseignant: null
          },
          salleDTO:{
            scxLibelle:'',
            scxDescription:'',
            serie:{
              scxIdSerie:null,
              scxLibelle:null,
              scxDescription:null
            },
            specialite:{
              scxLibelle:null,
              scxIdSpecialite:null,
              scxDescription:null
            },
            scxIdClasse:null,
            scxIdSalle:null,
            scxIdAnneeAcademique:null
          },
          coursDTO:{
            scxLibelle:'',
            scxIdMatiere:null,
            scxIdCours:null,
            scxIdClasse:null,
            scxNature: '',
            scxDescription: '',
            scxCoefficient: null
          }
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

  handleOk():void{
    console.log(this.validateForm);
    console.log(this.validateForm.value);
  }

  getAllEnseignant(){
    this.enseignantService.getAllEnseignant().subscribe(
      res=>{
        this.enseignants = res;
      },
      error => {
        alert("Impossible de récupérer la liste des enseignants")
      },
    )
  }

  getAllMatieres(){
    this.matiereService.getAllMatieres().subscribe(
      res =>{
        this.matieres = res;
      },
      error => {
        alert("Impossible de récupérer les matières");
      }
    )
  }

  getAllCycles(){
    this.cycleService.getAllCycle().subscribe(
      res =>{
        this.cycles = res;
      },
      error => {
        alert("Impossible de récupérer les cycles");
      },
    )
  }

  compare = (e1:any,e2:any) => (e1 && e2? e1.scxIdEnseignant == e2.scxIdEnseignant:e1 == e2);
  compareCours = (c1:any,c2:any) => (c1 && c2? c1.scxIdCours == c2.scxIdCours:c1 == c2);
  compareSalle = (salle1:any,salle2:any) => (salle1 && salle2? salle1.scxIdSalle == salle2.scxIdSalle:salle1 == salle2);

  selectMatiere(matiere: Matiere) {
    this.selectedMatiere = matiere;
    this.coursService.getCoursByMatiere(matiere.scxIdMatiere).subscribe(
      res =>{
        this.courss = res;
      },
      error => {
        alert("Impossible de récupérer les cours")
      }
    )
  }

  selectCours(cours:Cours){
    this.selectedCours = cours;
    if(this.selectedCours != null) {
      this.ClasseService.getClasseById(cours.scxIdClasse).subscribe(
        res => {
          this.selectedClasse = res;
          this.salleService.getSallesByAnneeClasse(this.selectedCours.scxIdClasse, this.selectedAnnee.scxIdAnneeAcademique).subscribe(
            res => {
              this.salles = res;
            },
            error => {
              alert("Impossible de récupérer les salles de la classe");
            }
          )

        },
        error => {
          alert("Impossible de récupérer la classe");
        }
      )
    }
  }

  selectCycle(cycle: Cycle) {
    this.selectedCycle = cycle;
    this.ClasseService.getAllClassesByCycle(cycle.scxIdCycle).subscribe(
      res =>{
        this.classes = res;
      },
      error => {
        alert("Impossible de récupérer les classes du cycle");
      }
    )
  }

  selectClasse(classe: Classe) {
    this.selectedClasse = classe;
    this.salleService.getSallesByAnneeClasse(classe.scxIdClasse,this.selectedAnnee.scxIdAnneeAcademique).subscribe(
      res =>{
        this.salles = res;
      },
      error => {
        alert("Impossible de récupérer les salles de la classe");
      }
    )
  }
}
