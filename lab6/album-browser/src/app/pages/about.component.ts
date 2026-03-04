import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1>About</h1>
    <p><b>Name:</b> Aslan</p>
    <p><b>Course:</b> Web Development</p>
    <p><b>Lab:</b> Routing & HTTP</p>
  `,
  styles: [`
    h1 { margin: 0 0 12px; }
    p { margin: 6px 0; }
  `],
})
export class AboutComponent {}