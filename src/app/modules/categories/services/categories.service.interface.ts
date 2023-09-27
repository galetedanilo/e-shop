import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';

export abstract class ICategoriesService {
  abstract create(category: ICategory): Observable<ICategory>;
  abstract update(category: Partial<ICategory>): Observable<ICategory>;
  abstract delete(id: number): Observable<void>;
  abstract getById(id: number): Observable<ICategory>;
  abstract getAll(): Observable<ICategory[]>;
}
