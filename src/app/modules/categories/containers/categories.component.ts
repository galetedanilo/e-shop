import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';

import { CategoryFormComponent, CategoryTableComponent } from '../ui';
import { CategoriesFacade } from '../states';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoryFormComponent,
    CategoryTableComponent,
    ToastModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  protected facade = inject(CategoriesFacade);
}
