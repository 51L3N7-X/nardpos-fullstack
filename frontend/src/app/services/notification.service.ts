import { Injectable } from '@angular/core';
import { toast } from 'sonner';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  success(message: string, description?: string): void {
    toast.success(message, {
      description: description
    });
  }

  error(message: string, description?: string): void {
    toast.error(message, {
      description: description
    });
  }

  info(message: string, description?: string): void {
    toast.info(message, {
      description: description
    });
  }

  warning(message: string, description?: string): void {
    toast.warning(message, {
      description: description
    });
  }

  loading(message: string): string | number {
    return toast.loading(message);
  }

  dismiss(toastId: string | number): void {
    toast.dismiss(toastId);
  }
}
