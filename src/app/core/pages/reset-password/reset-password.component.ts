import { routes } from './../../../app.routes';
import { Component, inject } from '@angular/core';
import { injectSupabase } from '../../../shared/functions/inject-supabase.function';
import { MessageService } from 'primeng/api';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [MessageService],
})
export class ResetPasswordComponent {
  private supabase = injectSupabase();
  private messageService = inject(MessageService);
  private router = inject(Router);
  protected loadingService = inject(LoadingService);

  password: FormControl;

  constructor() {
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
  }

  async onSubmit() {
    this.loadingService.start();

    this.supabase.auth.updateUser({ password: this.password.value });

    this.messageService.add({
      severity: 'success',
      summary: 'Senha alterada',
      detail: 'Sua senha foi alterada com sucesso.',
      life: 3000,
    });

    this.password.setValue('');
    this.loadingService.stop();
    this.router.navigate(['/']);
  }

  getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.password.hasError('minlength')) {
      const requiredLength = this.password.errors
        ? this.password.errors['minlength']['requiredLength']
        : 8;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    return;
  }
}
