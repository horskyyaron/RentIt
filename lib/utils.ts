import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSize(sizeInBytes: number) {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;

  if (sizeInBytes < kilobyte) {
    return sizeInBytes + " B";
  } else if (sizeInBytes < megabyte) {
    return (sizeInBytes / kilobyte).toFixed(2) + " KB";
  } else {
    return (sizeInBytes / megabyte).toFixed(2) + " MB";
  }
}
