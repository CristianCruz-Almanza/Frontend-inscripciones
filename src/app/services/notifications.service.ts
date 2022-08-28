import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }  
  /**
   * A function that displays a toast notification.
   * @param {string} msg - The message you want to display
   * @param {'warning' | 'error' | 'success' | 'info' |'question'} icon
   * @param {string} [target=body] - The target element to display the toast.
   */
  notifications(msg:string, icon: 'warning' | 'error' | 'success' | 'info' |'question', target:string = 'body') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      target: target,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({
      icon: icon,
      title: msg
    });
  }
}
