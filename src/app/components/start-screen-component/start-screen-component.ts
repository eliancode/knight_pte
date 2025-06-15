import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, FormsModule, PatternValidator, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    
    const valid = /^[a-zA-Z0-9]{4,16}$/.test(value);
    return valid ? null : { username: true };
  };
}


@Component({
  selector: 'app-start-screen-component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './start-screen-component.html',
  styleUrl: './start-screen-component.sass'
})
export class StartScreenComponent {
  usernameFormControl = new FormControl("", [Validators.required, usernameValidator()])
}
