import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRedirectorRoutingModule } from './main-redirector-routing.module';
import { MainRedirectorComponent } from './main-redirector.component';

@NgModule({
  declarations: [MainRedirectorComponent],
  imports: [CommonModule, MainRedirectorRoutingModule],
})
export class MainRedirectorModule {}
