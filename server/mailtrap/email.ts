import { verifyEmail } from "./../controller/user.controller";
import { client, sender } from "./mailtrap";
import {
  htmlContent,
  generateWelcomeEmailHtml,
  generateResetSuccessEmailHtml,
  generatePasswordResetEmailHtml,
} from "./htmlEmail";

export const sendVerificationEmail = async (
  emailx: string,
  verificationToken: string
) => {
  const recipient = [{ email: "tech03302@gmail.com" }];

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "verify your email",
      category: "Email Verification",
      html: htmlContent.replace("{verificationToken}", verificationToken),
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (emailx: string, name: string) => {
  const recipient = [{ email: "tech03302@gmail.com" }];
  const htmlContentx = generateWelcomeEmailHtml(name);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to DineDash",
      html: htmlContentx,
      template_variables: {
        company_info_name: "DineDash",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  emailx: string,
  resetUrl: string
) => {
  const recipient = [{ email: "tech03302@gmail.com" }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};

export const sendResetSuccessEmail = async (emailx: string) => {
  const recipient = [{ email: "tech03302@gmail.com" }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
