export type ToastItem = {
  type: 'danger' | 'error' | 'warn' | 'success' | 'info';
  message: string;
  title: string;
  autoClose: boolean;
  closeRef?: number | undefined;
};
