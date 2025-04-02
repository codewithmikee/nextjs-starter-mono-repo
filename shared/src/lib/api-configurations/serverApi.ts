// src/lib/api-utils.ts
// import { auth } from "@/auth"

import { auth } from '../auth';

export async function getAuthToken() {
  const session = await auth();
  return session?.accessToken;
}

export async function serverFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      ...options,
      headers
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    console.error('❌ Server Fetch Error', {
      url,
      status: response.status,
      statusText: response.statusText,
      error: errorResponse || 'No error message from server'
    });

    throw new Error(
      `API Error (${response.status}): ${
        errorResponse?.message || response.statusText
      }`
    );
  }

  return response.json();
}
