import { Injectable, inject } from '@angular/core';
import { ISubcategoryService } from './subcategory.service.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { ISubcategory } from '../models/subcategory.model';

@Injectable()
export class SubcategoryService implements ISubcategoryService {
  #http = inject(HttpClient);
  #resource = 'http://localhost:3000/subcategories';

  getAll(): Observable<ISubcategory[]> {
    return this.#http.get<ISubcategory[]>(this.#resource);
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.#http.get<ICategory[]>('http://localhost:3000/categories');
  }
}
