import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, FormsModule, PatternValidator, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data-service';



@Component({
  selector: 'app-start-game-component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './start-game-component.html',
  styleUrl: './start-game-component.sass',
  standalone: true
})
export class StartGameComponent {

  constructor(private router: Router, private sharedData: SharedDataService) {}

  usernameFormControl = new FormControl('', [Validators.required, this.usernameValidator()])

  onStart(): void {
    if(this.usernameFormControl.invalid) {
      return;
    }
    
    const username: string = this.usernameFormControl.value!;
    this.sharedData.setCurrentUsername(username);
    this.router.navigate(['game'])
  }

  private usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
    
      const valid = /^[a-zA-Z0-9]{4,16}$/.test(value);
      return valid ? null : { username: true };
    };
  };
};
