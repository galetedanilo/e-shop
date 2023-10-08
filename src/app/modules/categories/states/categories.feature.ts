import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { ICategoryState } from '../interfaces';
import { ICategoryModel } from '../models';
import { categoriesActions } from './categories.actions';

const adapter = createEntityAdapter<ICategoryModel>();

const initialState: ICategoryState = adapter.getInitialState({
  isFormLoading: false,
  isLoading: false,
  selectedId: null,
});

const initialFormState: ICategoryModel = {
  id: null,
  isActive: false,
  name: '',
  description: '',
};

const reducer = createReducer<ICategoryState>(
  initialState,
  on(
    categoriesActions.enterPage,
    categoriesActions.loadCategories,
    (state): ICategoryState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    categoriesActions.loadCategoriesSuccess,
    (state, action): ICategoryState => {
      return adapter.addMany(action.categories, { ...state, isLoading: false });
    }
  ),
  on(
    categoriesActions.loadCategoriesFailure,
    (state): ICategoryState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    categoriesActions.createCategory,
    (state): ICategoryState => ({
      ...state,
      isFormLoading: true,
    })
  ),
  on(
    categoriesActions.createCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.addOne(action.category, {
        ...state,
        isFormLoading: false,
      });
    }
  ),
  on(categoriesActions.updateCategory, (state, action): ICategoryState => {
    return adapter.updateOne(
      { id: action.category.id as string, changes: action.category },
      {
        ...state,
        isFormLoading: true,
      }
    );
  }),
  on(
    categoriesActions.updateCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.updateOne(action.category, {
        ...state,
        isFormLoading: false,
        selectedId: null,
      });
    }
  ),
  on(
    categoriesActions.createCategoryFailure,
    categoriesActions.updateCategoryFailure,
    (state): ICategoryState => ({
      ...state,
      isFormLoading: false,
      selectedId: null,
    })
  ),
  on(
    categoriesActions.deleteCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.removeOne(action.id, { ...state, selectedId: null });
    }
  ),
  on(
    categoriesActions.deleteCategoryFailure,
    (state): ICategoryState => ({
      ...state,
    })
  ),
  on(
    categoriesActions.setSelectedCategory,
    (state, action): ICategoryState => ({
      ...state,
      selectedId: action.id,
    })
  )
);

export const categoriesFeature = createFeature({
  name: 'categoriesFeature',
  reducer,
  extraSelectors: ({
    selectCategoriesFeatureState,
    selectSelectedId,
    selectEntities,
  }) => ({
    ...adapter.getSelectors(selectCategoriesFeatureState),
    selectSelectedCategory: createSelector(
      selectSelectedId,
      selectEntities,
      (selectedId, entities) =>
        selectedId ? entities[selectedId] : initialFormState
    ),
  }),
});
