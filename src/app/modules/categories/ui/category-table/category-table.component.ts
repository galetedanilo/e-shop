import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { ICategoryModel } from '../../models/category.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmPopupModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
})
export class CategoryTableComponent {
  @Input() categories!: ICategoryModel[];
  @Input() isLoading!: boolean;
  @Output() selected = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  #service = inject(ConfirmationService);

  onConfirm(event: Event, id: string) {
    this.#service.confirm({
      target: event.target as EventTarget,
      message: $localize`Are you sure that you want to proceed?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete.emit(id);
      },
    });
  }
}
