export interface LoginTokenResponse {
  token: string;
  token_expiry?: string;
  role: string;
  user?: any;
}
