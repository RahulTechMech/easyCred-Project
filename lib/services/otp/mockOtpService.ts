import type { OtpService } from "./types";

/**
 * Development-only mock. Any 6-digit code is accepted as valid, and no real
 * SMS is sent. Swap this for MSG91Service / TwilioVerifyService (implementing
 * the same OtpService interface) when credentials are available — no other
 * code needs to change since callers only depend on the OtpService type.
 */
export class MockOtpService implements OtpService {
  async sendOtp(mobileNumber: string) {
    console.info(`[MockOtpService] Pretending to send OTP to ${mobileNumber}`);
    return { success: true, requestId: `mock-${Date.now()}` };
  }

  async verifyOtp(mobileNumber: string, otp: string) {
    const isValidFormat = /^\d{6}$/.test(otp);
    return {
      success: isValidFormat,
      message: isValidFormat ? undefined : "Enter a valid 6-digit OTP",
    };
  }
}

// -----------------------------------------------------------------------
// Example of how a real provider would be wired in later:
//
// export class Msg91OtpService implements OtpService {
//   async sendOtp(mobileNumber: string) {
//     const res = await fetch("https://control.msg91.com/api/v5/otp", { ... });
//     ...
//   }
//   async verifyOtp(mobileNumber: string, otp: string, requestId?: string) {
//     const res = await fetch("https://control.msg91.com/api/v5/otp/verify", { ... });
//     ...
//   }
// }
// -----------------------------------------------------------------------

export const otpService: OtpService = new MockOtpService();
