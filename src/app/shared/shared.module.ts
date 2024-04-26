import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadNavComponent } from './components/head-nav/head-nav.component';



@NgModule({
  declarations: [
    HeadNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeadNavComponent
  ]
})
export class SharedModule { }
