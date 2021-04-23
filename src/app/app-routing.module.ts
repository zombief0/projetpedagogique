import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CycleComponent} from "./metier/cycle/cycle.component";
import {SpecialiteComponent} from "./metier/specialite/specialite.component";
import {SerieComponent} from "./metier/serie/serie.component";
import {MatiereComponent} from "./metier/matiere/matiere.component";
import {ProjetPedagogiqueComponent} from "./metier/projet-pedagogique/projet-pedagogique.component";
import {AnneeAcademiqueComponent} from "./metier/annee-academique/annee-academique.component";
import {EnseignantComponent} from "./metier/enseignant/enseignant.component";
import {EnseignerComponent} from "./metier/enseigner/enseigner.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cycle' },
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path:'cycle', component:CycleComponent },
  { path:'specialite', component:SpecialiteComponent },
  { path: 'serie', component: SerieComponent },
  { path: 'cours', component: MatiereComponent },
  { path: 'projet', component: ProjetPedagogiqueComponent },
  { path: 'annee', component: AnneeAcademiqueComponent },
  { path: 'enseignant', component: EnseignantComponent },
  { path: 'enseigner', component: EnseignerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
