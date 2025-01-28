export type ToasterItem = {
  type: 'danger' | 'error' | 'warn' | 'success' | 'info';
  message: string;
  title: string;
  autoClose: boolean;
};
