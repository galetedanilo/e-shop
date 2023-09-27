import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Component({
  selector: 'app-error-field',
  standalone: true,
  imports: [CommonModule, ValidationPipe],
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css'],
})
export class ErrorFieldComponent {
  @Input() control!: FormControl | AbstractControl;
  @Input() messages!: object;

  formDirective = inject(FormGroupDirective);
}
