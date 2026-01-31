import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';

function passwordMatchValidator(group: FormGroup) {
  const pw = group.get('password')?.value;
  const pw2 = group.get('confirmPassword')?.value;
  return pw === pw2 ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  form!: FormGroup;
  registerError: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );

    this.form.valueChanges.subscribe(() => (this.registerError = null));
  }

  onSubmit() {
    this.registerError = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    this.auth.register(email, '', password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        if (err && err.status === 409) {
          this.registerError = 'Account already exists';
        } else {
          this.registerError = 'Registration failed. Please try again';
        }
        console.error('Register failed', err);
      },
    });
  }
}
