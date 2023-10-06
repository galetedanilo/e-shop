import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryFormComponent } from './ui/subcategory-form/subcategory-form.component';
import { Store } from '@ngrx/store';
import { SubcategoriesActions } from './states/subcategories.actions';
import { SubcategoriesFeature } from './states/subcategories.feature';
import { ICategory } from './models/category.model';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, SubcategoryFormComponent, ToastModule],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit {
  #store = inject(Store);

  categories = this.#store.selectSignal(
    SubcategoriesFeature.selectCategories
  ) as Signal<ICategory[]>;

  ngOnInit(): void {
    this.#store.dispatch(
      SubcategoriesActions.loadSubcategories({
        messages: {
          success: 'Deu certo',
          failure: 'Due errado',
        },
      })
    );
  }
}
