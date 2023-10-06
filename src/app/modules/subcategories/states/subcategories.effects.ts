import { Injectable, inject } from '@angular/core';
import { ISubcategoryService } from '../services/subcategory.service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubcategoriesActions } from './subcategories.actions';
import { catchError, concatMap, exhaustMap, map, of, tap } from 'rxjs';
import { ApiCode, ApiMessage } from '../enums/api-error.enum';
import { MessageService } from 'primeng/api';

@Injectable()
export class SubcategoreisEffect {
  #service = inject(ISubcategoryService);
  #actions = inject(Actions);
  #messageService = inject(MessageService);

  categories$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(SubcategoriesActions.loadSubcategories),
      exhaustMap(({ messages }) =>
        this.#service.getAll().pipe(
          tap({
            next: () =>
              this.#handleMessage('success', 'Succes', messages.success),
            error: () =>
              this.#handleMessage('error', 'Error', messages.failure),
          }),
          concatMap(subcategories =>
            this.#service.getAllCategories().pipe(
              map(categories =>
                SubcategoriesActions.loadSubcategoriesSuccess({
                  subcategories,
                  categories,
                })
              )
            )
          ),
          catchError(() =>
            of(
              SubcategoriesActions.loadSubcategoriesFailure({
                error: {
                  code: ApiCode.FAILURE_LOAD_CATEGORIES,
                  message: ApiMessage.FAILURE_LOAD_CATEGORIES,
                },
              })
            )
          )
        )
      )
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
