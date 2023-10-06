import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';

export abstract class ICategoriesService {
  abstract create(category: ICategory): Observable<ICategory>;
  abstract update(category: Partial<ICategory>): Observable<ICategory>;
  abstract delete(id: string | number): Observable<void>;
  abstract getById(id: string | number): Observable<ICategory>;
  abstract getAll(): Observable<ICategory[]>;
}
