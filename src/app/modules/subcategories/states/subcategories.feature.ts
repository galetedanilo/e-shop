import { createEntityAdapter } from '@ngrx/entity';
import { ISubcategory } from '../models/subcategory.model';
import { ISubcategoryState } from '../interfaces/subcategory.state';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SubcategoriesActions } from './subcategories.actions';

const adapter = createEntityAdapter<ISubcategory>();

const initialState: ISubcategoryState = adapter.getInitialState({
  isLoading: false,
  isFormLoading: false,
  selectedId: null,
  categories: [],
  error: null,
});

const reducer = createReducer(
  initialState,
  on(
    SubcategoriesActions.loadSubcategories,
    (state): ISubcategoryState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    SubcategoriesActions.loadSubcategoriesSuccess,
    (state, action): ISubcategoryState => {
      return adapter.addMany(action.subcategories, {
        ...state,
        categories: action.categories,
        isLoading: false,
      });
    }
  ),
  on(
    SubcategoriesActions.loadSubcategoriesFailure,
    (state, action): ISubcategoryState => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export const SubcategoriesFeature = createFeature({
  name: 'subcategoreisFeature',
  reducer,
  extraSelectors: ({ selectSubcategoreisFeatureState, selectCategories }) => ({
    ...adapter.getSelectors(selectSubcategoreisFeatureState),
    selectCategories: createSelector(
      selectCategories,
      categories => categories
    ),
  }),
});
