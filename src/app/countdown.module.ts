import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownDirective } from './countdown.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CountdownDirective],
  exports: [CountdownDirective]
})
export class CountdownModule { }