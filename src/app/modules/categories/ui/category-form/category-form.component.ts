import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() isLoading!: boolean;
  @Input() category!: ICategoryModel;
  @Output() save = new EventEmitter<ICategoryModel>();
  @Output() deselected = new EventEmitter<void>();

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  #initialFormValue: unknown;

  form = new FormGroup({
    id: new FormControl(''),
    isActive: new FormControl(true),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  ngOnInit(): void {
    this.#initialFormValue = this.form.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(_changes: SimpleChanges): void {
    this.form.setValue(this.category);
  }

  onSubmit() {
    this.save.emit(this.form.getRawValue() as ICategoryModel);
    this.formDir.resetForm(this.#initialFormValue);
  }

  onCancel() {
    this.deselected.emit();
    this.formDir.resetForm(this.#initialFormValue);
  }
}
