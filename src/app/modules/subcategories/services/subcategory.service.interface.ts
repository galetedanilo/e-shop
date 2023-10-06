import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { ISubcategory } from '../models/subcategory.model';

export abstract class ISubcategoryService {
  abstract getAll(): Observable<ISubcategory[]>;
  abstract getAllCategories(): Observable<ICategory[]>;
}
