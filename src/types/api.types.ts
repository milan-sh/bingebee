export type ApiSuccessResponse = {
  status: number;
  success: true;
  message: string;
  data?: unknown;
};

export type ApiErrorResponse = {
  status: number;
  success: false;
  message: string;
  error?: unknown;
};

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
