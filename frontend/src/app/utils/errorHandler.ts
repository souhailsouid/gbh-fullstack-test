import axios from 'axios';

export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error);
    return error.response?.data?.message || 'A network error occurred';
  } else if (error instanceof Error) {
    console.error('Unexpected Error:', error);
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
}




