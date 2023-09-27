import { Injectable, inject } from '@angular/core';
import { ICategoriesService } from './categories.service.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesService implements ICategoriesService {
  #http = inject(HttpClient);
  #resource = 'http://localhost:3000/categories';

  create(category: ICategory): Observable<ICategory> {
    return this.#http.post<ICategory>(this.#resource, category);
  }

  update(category: ICategory): Observable<ICategory> {
    return this.#http.put<ICategory>(
      `${this.#resource}/${category.id}`,
      category
    );
  }

  delete(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#resource}/${id}`);
  }

  getById(id: number): Observable<ICategory> {
    return this.#http.get<ICategory>(`${this.#resource}/${id}`);
  }

  getAll(): Observable<ICategory[]> {
    return this.#http.get<ICategory[]>(this.#resource);
  }
}
