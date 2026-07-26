export interface OtpService {
  /** Sends a one-time password to the given mobile number. */
  sendOtp(mobileNumber: string): Promise<{ success: boolean; requestId?: string; message?: string }>;

  /** Verifies an OTP the user entered against what was sent. */
  verifyOtp(
    mobileNumber: string,
    otp: string,
    requestId?: string
  ): Promise<{ success: boolean; message?: string }>;
}
