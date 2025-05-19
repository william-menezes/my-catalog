import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { injectSupabase } from '../../../../shared/functions/inject-supabase.function';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  private supabase = injectSupabase();
  private messageService = inject(MessageService);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        //Validators.required,
      ]),
    });
  }

  async login() {
    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos corretamente.',
        life: 3000,
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log({ email, password });
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    /* const {error} = await this.supabase.auth.signInWithOtp({email}); */

    console.log(error);

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos corretamente.',
        life: 3000,
      });

      return;
    }

    this.router.navigate(['/']);
  }

  getErrorMessage(fieldName: string) {
    const field = this.loginForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 8;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if (field?.hasError('email')) {
      return 'E-mail inválido';
    }

    return 'Campo inválido';
  }
}
