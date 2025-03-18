import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-code-confirmation',
  imports: [CommonModule],
  templateUrl: './code-confirmation.component.html',
  styleUrl: './code-confirmation.component.css'
})
export class CodeConfirmationComponent {
  code = '';
  phoneNumber = '+221 77 580 78 01';
  maxLength = 6;

  handleNumberClick(number: string): void {
    if (this.code.length < this.maxLength) {
      this.code += number;
    }
  }

  handleDelete(): void {
    this.code = this.code.slice(0, -1);
  }

  handleResend(): void {
    console.log('Resending code...');
  }
}
