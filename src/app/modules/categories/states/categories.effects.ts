import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesActions } from './categories.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { EApiCode, EApiMessage } from '../enums/api-error.enum';
import { MessageService } from 'primeng/api';
import { ICategoriesService } from '../services/categories.service.interface';

@Injectable()
export class CategoriesEffect {
  #service = inject(ICategoriesService);
  #actions = inject(Actions);
  #messageService = inject(MessageService);

  loadCategories$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(CategoriesActions.enterPage, CategoriesActions.loadCategories),
      exhaustMap(({ messages }) =>
        this.#service.getAll().pipe(
          tap({
            next: () =>
              this.#handleMessage('success', 'Success', messages.success),
            error: () =>
              this.#handleMessage('error', 'Error', messages.failure),
          }),
          map(categories =>
            CategoriesActions.loadCategoriesSuccess({ categories })
          ),
          catchError(() =>
            of(
              CategoriesActions.loadCategoriesFailure({
                error: {
                  code: EApiCode.FAILURE_LOAD,
                  message: EApiMessage.FAILURE_LOAD,
                },
              })
            )
          )
        )
      )
    );
  });

  saveCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(CategoriesActions.createCategory),
      concatMap(props =>
        this.#service.create(props.category).pipe(
          map(category => {
            this.#handleMessage(
              'success',
              'Success',
              'New category registered successfully'
            );
            return CategoriesActions.createCategorySuccess({ category });
          }),
          catchError(() => {
            this.#handleMessage(
              'error',
              'Error',
              'Error to resgister new category'
            );

            return of(
              CategoriesActions.createCategoryFailure({
                error: {
                  code: EApiCode.FAILURE_CREATE,
                  message: EApiMessage.FAILURE_UPDATE,
                },
              })
            );
          })
        )
      )
    );
  });

  updateCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(CategoriesActions.updateCategory),
      concatMap(props =>
        this.#service.update(props.category).pipe(
          map(category => {
            this.#handleMessage(
              'success',
              'Success',
              'Update category successfully'
            );
            return CategoriesActions.updateCategorySuccess({
              category: { id: category.id as number, changes: category },
            });
          }),
          catchError(() => {
            this.#handleMessage('error', 'Error', 'Error to update category');

            return of(
              CategoriesActions.updateCategoryFailure({
                error: {
                  code: EApiCode.FAILURE_UPDATE,
                  message: EApiMessage.FAILURE_UPDATE,
                },
              })
            );
          })
        )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(CategoriesActions.deleteCategory),
      mergeMap(props =>
        this.#service.delete(props.id).pipe(
          map(() => {
            this.#handleMessage(
              'success',
              'Success',
              'Delete category successfully'
            );
            return CategoriesActions.deleteCategorySuccess({ id: props.id });
          })
        )
      ),
      catchError(() => {
        this.#handleMessage('error', 'Error', 'Error to delete category');

        return of(
          CategoriesActions.deleteCategoryFailure({
            error: {
              code: EApiCode.FAILURE_DELETE,
              message: EApiMessage.FAILURE_DELETE,
            },
          })
        );
      })
    );
  });

  #handleMessage(
    severity: 'success' | 'error',
    summary: string,
    detail: string
  ) {
    this.#messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
