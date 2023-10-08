import { Injectable, Signal, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoriesActions } from './categories.actions';
import { categoriesFeature } from './categories.feature';
import { ICategoryModel } from '../models';

@Injectable()
export class CategoriesFacade {
  #store = inject(Store);

  get category(): Signal<ICategoryModel> {
    return this.#store.selectSignal(
      categoriesFeature.selectSelectedCategory
    ) as Signal<ICategoryModel>;
  }

  get categories(): Signal<ICategoryModel[]> {
    return this.#store.selectSignal(categoriesFeature.selectAll);
  }

  get loading(): Signal<boolean> {
    return this.#store.selectSignal(categoriesFeature.selectIsLoading);
  }

  get formLoading(): Signal<boolean> {
    return this.#store.selectSignal(categoriesFeature.selectIsFormLoading);
  }

  enterPage() {
    this.#store.dispatch(categoriesActions.enterPage());
  }

  selected(id: string) {
    this.#store.dispatch(categoriesActions.setSelectedCategory({ id }));
  }

  delete(id: string) {
    this.#store.dispatch(categoriesActions.deleteCategory({ id }));
  }

  save(category: ICategoryModel) {
    if (category.id) {
      this.#store.dispatch(categoriesActions.updateCategory({ category }));
    } else {
      this.#store.dispatch(categoriesActions.createCategory({ category }));
    }
  }
}
