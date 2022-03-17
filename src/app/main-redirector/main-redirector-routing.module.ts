import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRedirectorComponent } from './main-redirector.component';

const routes: Routes = [
  {
    path: '',
    component: MainRedirectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRedirectorRoutingModule {}
