import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { categoriesActions } from './categories.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { EApiMessage } from '../enums/api-error.enum';
import { ACategoriesService } from '../services/categories.service.interface';
import { AAppMessageClass } from 'src/app/shared/classes/app-message.class';

@Injectable()
export class CategoriesEffect extends AAppMessageClass {
  #service = inject(ACategoriesService);
  #actions = inject(Actions);

  loadCategories$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(categoriesActions.enterPage, categoriesActions.loadCategories),
      exhaustMap(() =>
        this.#service.getAll().pipe(
          tap({
            next: () =>
              this.handleMessage(
                'success',
                'Success',
                EApiMessage.SUCCESS_LOAD
              ),
            error: () =>
              this.handleMessage('error', 'Error', EApiMessage.FAILURE_LOAD),
          }),
          map(categories =>
            categoriesActions.loadCategoriesSuccess({ categories })
          ),
          catchError(() => of(categoriesActions.loadCategoriesFailure()))
        )
      )
    );
  });

  createCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(categoriesActions.createCategory),
      concatMap(props =>
        this.#service.create(props.category).pipe(
          tap({
            next: () =>
              this.handleMessage(
                'success',
                'Success',
                EApiMessage.SUCCESS_CREATE
              ),
            error: () =>
              this.handleMessage('error', 'Error', EApiMessage.FAILURE_CREATE),
          }),
          map(category =>
            categoriesActions.createCategorySuccess({ category })
          ),
          catchError(() => of(categoriesActions.createCategoryFailure()))
        )
      )
    );
  });

  updateCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(categoriesActions.updateCategory),
      concatMap(props =>
        this.#service.update(props.category).pipe(
          tap({
            next: () =>
              this.handleMessage(
                'success',
                'Success',
                EApiMessage.SUCCESS_UPDATE
              ),
            error: () =>
              this.handleMessage('error', 'Error', EApiMessage.FAILURE_UPDATE),
          }),
          map(category =>
            categoriesActions.updateCategorySuccess({
              category: { id: category.id as string, changes: category },
            })
          ),
          catchError(() => of(categoriesActions.updateCategoryFailure()))
        )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(categoriesActions.deleteCategory),
      mergeMap(props =>
        this.#service.delete(props.id).pipe(
          tap({
            next: () =>
              this.handleMessage(
                'success',
                'Success',
                EApiMessage.SUCCESS_DELETE
              ),
            error: () =>
              this.handleMessage('error', 'Error', EApiMessage.FAILURE_DELETE),
          }),
          map(() => categoriesActions.deleteCategorySuccess({ id: props.id })),
          catchError(() => of(categoriesActions.deleteCategoryFailure()))
        )
      )
    );
  });
}
