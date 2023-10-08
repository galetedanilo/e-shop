import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export abstract class AAppMessageClass {
  #messageService = inject(MessageService);

  handleMessage(
    severity: 'success' | 'error',
    summary: string,
    detail: string
  ) {
    this.#messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
