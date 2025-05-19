import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { injectSupabase } from '../../../../shared/functions/inject-supabase.function';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  private supabase = injectSupabase();
  private messageService = inject(MessageService);
  private router = inject(Router);

  email: FormControl;

  constructor() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.email.hasError('email')) {
      return 'E-mail inválido';
    }

    return;
  }

  async onSubmit() {
    await this.supabase.auth.resetPasswordForEmail(this.email.value);

    this.messageService.add({
      severity: 'success',
      summary: 'E-mail enviado',
      detail: 'Verifique sua caixa de entrada.',
      life: 3000,
    });

    this.email.setValue('');
  }

  comeBack() {
    this.router.navigate(['./auth']);
  }
}
