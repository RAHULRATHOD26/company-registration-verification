// Email and SMS notification service

// Send email notification (placeholder - integrate with SendGrid/Nodemailer)
const sendEmail = async (to, subject, message) => {
  try {
    console.log(`Sending email to ${to}: ${subject}`);
    // Integrate with SendGrid or Nodemailer
    // Example: await sgMail.send({ to, subject, html: message });
    return { success: true, message: `Email sent to ${to}` };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send SMS notification (placeholder - integrate with Twilio)
const sendSMS = async (phone, message) => {
  try {
    console.log(`Sending SMS to ${phone}: ${message}`);
    // Integrate with Twilio
    // Example: await twilio.messages.create({ body: message, from: process.env.TWILIO_PHONE, to: phone });
    return { success: true, message: `SMS sent to ${phone}` };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
  const subject = 'Your OTP for Company Registration';
  const message = `Your One Time Password (OTP) is: <strong>${otp}</strong><br/>This OTP is valid for 10 minutes.`;
  return sendEmail(email, subject, message);
};

// Send OTP via SMS
const sendOTPSMS = async (phone, otp) => {
  const message = `Your OTP for Company Registration is: ${otp}. Valid for 10 minutes.`;
  return sendSMS(phone, message);
};

// Send verification confirmation email
const sendVerificationEmail = async (email, name) => {
  const subject = 'Verification Successful';
  const message = `<h2>Welcome ${name}!</h2><p>Your email has been verified successfully. You can now proceed with company registration.</p>`;
  return sendEmail(email, subject, message);
};

module.exports = {
  sendEmail,
  sendSMS,
  sendOTPEmail,
  sendOTPSMS,
  sendVerificationEmail
};
