import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.checkmytenant.ng";

export async function apiRequest(
  path: string,
  options: RequestInit = {},
): Promise<any> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ? options.headers : {}),
    },
    ...options,
  });
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = "API request failed";

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch {
      // If parsing fails, use the raw error text
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }
  return response.json();
}
