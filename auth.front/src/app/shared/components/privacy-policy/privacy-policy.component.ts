import { Component, Output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-privacy-policy',
  imports: [LucideAngularModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  @Output() onClose = new EventEmitter<void>();

  readonly CloseIcon = X;
}
