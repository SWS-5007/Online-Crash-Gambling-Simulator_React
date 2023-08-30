export const isValidEmail = (email) => {
  // Regular expression pattern for validating email addresses
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the pattern
  return emailPattern.test(email);
};
