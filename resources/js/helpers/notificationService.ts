interface NotificationPayload {
  message: string;
}

class NotificationService {
  static showError(message: string) {
    const event = new CustomEvent('show-error', { detail: { message } });
    window.dispatchEvent(event);
  }
}

export default NotificationService;