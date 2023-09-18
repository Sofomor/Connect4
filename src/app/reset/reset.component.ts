import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  @Output() resetClicked = new EventEmitter<void>();

  onResetButtonClick(): void {
    this.resetClicked.emit();
  }
}
