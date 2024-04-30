import { Component } from '@angular/core';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { SortArrayPipe } from '../../pipes/sort-array.pipe';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-pipes-page',
  standalone: true,
  templateUrl: './pipes-page.component.html',
  styleUrl: './pipes-page.component.css',
  imports: [TruncateTextPipe, SortArrayPipe, FileSizePipe],
})
export class PipesPageComponent {
  items: Product[] = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    { name: 'Product 3', price: 30 },
  ];
}
