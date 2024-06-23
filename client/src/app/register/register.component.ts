import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  // v17.3 and before, we'll be using @Decorator approch to pass parameter in child<->parent component
  // @Input() usersFromHomeComponentOldStyle: any; //parent->child on v17.3 and before
  // @Output() cancelRegisterOldStyle = new EventEmitter(); //chile->parent v17.3 and before
  // usersFromHomeComponent = input.required<any>(); //after v17.3
  cancelRegister = output<boolean>(); //after v17.3
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
