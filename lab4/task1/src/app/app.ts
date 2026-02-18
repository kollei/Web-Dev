import {Component} from '@angular/core';
import {Child} from './ComponentOutputProperties';

@Component({
  selector: 'app-root',
  template: `<app-child></app-child>`,
  imports: [Child] 
})
export class AppComponent {}