import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './ui/category-form/category-form.component';
import { CategoryTableComponent } from './ui/category-table/category-table.component';

import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { CategoriesActions, CategoriesFeature } from './states';
import { ICategory } from './models';

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
export class CategoriesComponent implements OnInit {
  #store = inject(Store);

  category = this.#store.selectSignal(
    CategoriesFeature.selectSelectedCategory
  ) as Signal<ICategory>;

  categories = this.#store.selectSignal(CategoriesFeature.selectAll);
  loading = this.#store.selectSignal(CategoriesFeature.selectIsLoading);
  formLoading = this.#store.selectSignal(CategoriesFeature.selectIsFormLoading);

  ngOnInit(): void {
    this.#store.dispatch(
      CategoriesActions.enterPage({
        messages: {
          success: $localize`Categories loaded successfully`,
          failure: $localize`Error to load categories`,
        },
      })
    );
  }

  saveCategory(category: ICategory) {
    if (category.id) {
      this.#store.dispatch(CategoriesActions.updateCategory({ category }));
    } else {
      this.#store.dispatch(CategoriesActions.createCategory({ category }));
    }
  }

  editCategory(id: string) {
    this.#store.dispatch(CategoriesActions.setSelectedCategory({ id }));
  }

  deleteCategory(id: string) {
    this.#store.dispatch(CategoriesActions.deleteCategory({ id }));
  }

  clearSelectedCategory() {
    this.#store.dispatch(CategoriesActions.clearSelectedCategory());
  }
}
