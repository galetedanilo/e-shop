import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CategoryState } from '../interfaces/category.state';
import { CategoriesActions } from './categories.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { ICategory } from '../models/category.model';

const adapter = createEntityAdapter<ICategory>();

const initialState: CategoryState = adapter.getInitialState({
  isFormLoading: false,
  isLoading: false,
  selectedCategoryId: null,
  error: null,
});

const initialFormState: ICategory = {
  id: null,
  active: false,
  name: '',
  description: '',
};

const reducer = createReducer<CategoryState>(
  initialState,
  on(
    CategoriesActions.enterPage,
    CategoriesActions.loadCategories,
    (state): CategoryState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    CategoriesActions.loadCategoriesSuccess,
    (state, action): CategoryState => {
      return adapter.addMany(action.categories, { ...state, isLoading: false });
    }
  ),
  on(
    CategoriesActions.loadCategoriesFailure,
    (state, action): CategoryState => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  ),
  on(
    CategoriesActions.createCategory,
    CategoriesActions.updateCategory,
    (state): CategoryState => ({
      ...state,
      isFormLoading: true,
    })
  ),
  on(
    CategoriesActions.createCategorySuccess,
    (state, action): CategoryState => {
      return adapter.addOne(action.category, {
        ...state,
        isFormLoading: false,
      });
    }
  ),
  on(
    CategoriesActions.updateCategorySuccess,
    (state, action): CategoryState => {
      return adapter.updateOne(action.category, {
        ...state,
        isFormLoading: false,
        selectedCategoryId: null,
      });
    }
  ),
  on(
    CategoriesActions.createCategoryFailure,
    CategoriesActions.updateCategoryFailure,
    (state, action): CategoryState => ({
      ...state,
      isFormLoading: false,
      selectedCategoryId: null,
      error: action.error,
    })
  ),
  on(
    CategoriesActions.deleteCategorySuccess,
    (state, action): CategoryState => {
      return adapter.removeOne(action.id, state);
    }
  ),
  on(
    CategoriesActions.deleteCategoryFailure,
    (state, action): CategoryState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    CategoriesActions.setSelectedCategory,
    (state, action): CategoryState => ({
      ...state,
      selectedCategoryId: action.id,
    })
  ),
  on(
    CategoriesActions.clearSelectedCategory,
    (state): CategoryState => ({
      ...state,
      selectedCategoryId: null,
    })
  )
);

export const CategoriesFeature = createFeature({
  name: 'categoriesFeature',
  reducer,
  extraSelectors: ({
    selectCategoriesFeatureState,
    selectSelectedCategoryId,
    selectEntities,
  }) => ({
    ...adapter.getSelectors(selectCategoriesFeatureState),
    selectSelectedCategory: createSelector(
      selectSelectedCategoryId,
      selectEntities,
      (selectedId, entities) =>
        selectedId ? entities[selectedId] : initialFormState
    ),
  }),
});
