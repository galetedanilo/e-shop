import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel } from '../models';
import { ACategoriesService } from './categories.service.interface';

@Injectable()
export class CategoriesService implements ACategoriesService {
  #http = inject(HttpClient);
  #resource = 'http://localhost:3000/categories';

  create(category: ICategoryModel): Observable<ICategoryModel> {
    return this.#http.post<ICategoryModel>(this.#resource, category);
  }

  update(category: Partial<ICategoryModel>): Observable<ICategoryModel> {
    return this.#http.put<ICategoryModel>(
      `${this.#resource}/${category.id}`,
      category
    );
  }

  delete(id: number | string): Observable<void> {
    return this.#http.delete<void>(`${this.#resource}/${id}`);
  }

  getById(id: number | string): Observable<ICategoryModel> {
    return this.#http.get<ICategoryModel>(`${this.#resource}/${id}`);
  }

  getAll(): Observable<ICategoryModel[]> {
    return this.#http.get<ICategoryModel[]>(this.#resource);
  }
}
