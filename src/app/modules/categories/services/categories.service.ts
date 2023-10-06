import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models';
import { ICategoriesService } from './categories.service.interface';

@Injectable()
export class CategoriesService implements ICategoriesService {
  #http = inject(HttpClient);
  #resource = 'http://localhost:3000/categories';

  create(category: ICategory): Observable<ICategory> {
    return this.#http.post<ICategory>(this.#resource, category);
  }

  update(category: Partial<ICategory>): Observable<ICategory> {
    return this.#http.put<ICategory>(
      `${this.#resource}/${category.id}`,
      category
    );
  }

  delete(id: number | string): Observable<void> {
    return this.#http.delete<void>(`${this.#resource}/${id}`);
  }

  getById(id: number | string): Observable<ICategory> {
    return this.#http.get<ICategory>(`${this.#resource}/${id}`);
  }

  getAll(): Observable<ICategory[]> {
    return this.#http.get<ICategory[]>(this.#resource);
  }
}
