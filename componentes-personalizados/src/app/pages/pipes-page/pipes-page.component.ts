import { Component } from '@angular/core';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';

@Component({
  selector: 'app-pipes-page',
  standalone: true,
  templateUrl: './pipes-page.component.html',
  styleUrl: './pipes-page.component.css',
  imports: [TruncateTextPipe],
})
export class PipesPageComponent {}
