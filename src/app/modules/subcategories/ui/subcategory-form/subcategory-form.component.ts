import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ICategory } from '../../models/category.model';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
  ],
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.css'],
})
export class SubcategoryFormComponent implements OnInit {
  @Input() isLoading!: boolean;
  @Input() categories!: ICategory[] | undefined;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  #initialFormValue: unknown;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    isActive: new FormControl(false),
    category: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.#initialFormValue = this.form.value;
  }

  onSubmit() {

  }

  onCancel() {
    this.formDir.resetForm(this.#initialFormValue);
  }
}
