export type ApiSuccessResponse<T = unknown> = {
  status: number;
  success: true;
  message: string;
  data?: T;
};

export type ApiErrorResponse = {
  status: number;
  success: false;
  message: string;
  error?: unknown;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
