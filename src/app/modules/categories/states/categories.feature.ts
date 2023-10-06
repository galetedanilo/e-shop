import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { ICategoryState } from '../interfaces';
import { ICategory } from '../models';
import { CategoriesActions } from './categories.actions';


const adapter = createEntityAdapter<ICategory>();

const initialState: ICategoryState = adapter.getInitialState({
  isFormLoading: false,
  isLoading: false,
  selectedId: null,
  error: null,
});

const initialFormState: ICategory = {
  id: null,
  isActive: false,
  name: '',
  description: '',
};

const reducer = createReducer<ICategoryState>(
  initialState,
  on(
    CategoriesActions.enterPage,
    CategoriesActions.loadCategories,
    (state): ICategoryState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    CategoriesActions.loadCategoriesSuccess,
    (state, action): ICategoryState => {
      return adapter.addMany(action.categories, { ...state, isLoading: false });
    }
  ),
  on(
    CategoriesActions.loadCategoriesFailure,
    (state, action): ICategoryState => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  ),
  on(
    CategoriesActions.createCategory,
    (state): ICategoryState => ({
      ...state,
      isFormLoading: true,
    })
  ),
  on(
    CategoriesActions.createCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.addOne(action.category, {
        ...state,
        isFormLoading: false,
      });
    }
  ),
  on(CategoriesActions.updateCategory, (state, action): ICategoryState => {
    return adapter.updateOne(
      { id: action.category.id as string, changes: action.category },
      {
        ...state,
        isFormLoading: true,
      }
    );
  }),
  on(
    CategoriesActions.updateCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.updateOne(action.category, {
        ...state,
        isFormLoading: false,
        selectedId: null,
      });
    }
  ),
  on(
    CategoriesActions.createCategoryFailure,
    CategoriesActions.updateCategoryFailure,
    (state, action): ICategoryState => ({
      ...state,
      isFormLoading: false,
      selectedId: null,
      error: action.error,
    })
  ),
  on(
    CategoriesActions.deleteCategorySuccess,
    (state, action): ICategoryState => {
      return adapter.removeOne(action.id, state);
    }
  ),
  on(
    CategoriesActions.deleteCategoryFailure,
    (state, action): ICategoryState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    CategoriesActions.setSelectedCategory,
    (state, action): ICategoryState => ({
      ...state,
      selectedId: action.id,
    })
  ),
  on(
    CategoriesActions.clearSelectedCategory,
    (state): ICategoryState => ({
      ...state,
      selectedId: null,
    })
  )
);

export const CategoriesFeature = createFeature({
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
