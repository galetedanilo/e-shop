import { Observable } from 'rxjs';
import { ICategoryModel } from '../models/category.model';

export abstract class ACategoriesService {
  abstract create(category: ICategoryModel): Observable<ICategoryModel>;
  abstract update(
    category: Partial<ICategoryModel>
  ): Observable<ICategoryModel>;
  abstract delete(id: string | number): Observable<void>;
  abstract getById(id: string | number): Observable<ICategoryModel>;
  abstract getAll(): Observable<ICategoryModel[]>;
}
