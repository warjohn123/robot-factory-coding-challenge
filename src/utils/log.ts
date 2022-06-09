import { toast } from "react-toastify";

export function log(...args: any[]) {
  console.log(...args);
}

export const toastMessage = (message: string) => toast.success(message);
