import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('AA2_Majey_Laura_Jimenez_Kell');
}
