import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
  
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HlmButtonImports, HlmToasterImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NardPOS Inventory';
}
