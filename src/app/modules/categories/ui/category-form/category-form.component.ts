import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  effect,
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
import { ICategory } from '../../models/category.model';
import { ErrorFieldComponent } from 'src/app/shared/components/error-field/error-field.component';
import { FormMessagesHelper } from '../../helpers/error-message.helper';

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
    ErrorFieldComponent,
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() isLoading!: boolean;
  @Input() formValue!: ICategory;
  @Output() saveCategory = new EventEmitter<ICategory>();
  @Output() clearSelected = new EventEmitter<void>();

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  #initialFormValue: unknown;

  form = new FormGroup({
    id: new FormControl(0),
    active: new FormControl(true),
    name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  messages = FormMessagesHelper;

  ngOnInit(): void {
    this.#initialFormValue = this.form.value;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.form.setValue(this.formValue);
  }

  onSubmit() {
    this.saveCategory.emit(this.form.getRawValue() as ICategory);
    this.formDir.resetForm(this.#initialFormValue);
  }

  onCancel() {
    this.clearSelected.emit();
    this.formDir.resetForm(this.#initialFormValue);
  }
}
