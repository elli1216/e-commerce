export const isValidEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const isValidPassword = (password: string) => {
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const isPasswordMatching = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export const isValidUsername = (username: string) => {
  // At least 3 characters, only letters, numbers and underscores
  const re = /^[a-zA-Z0-9_]{3,}$/;
  return re.test(username);
};

export const isValidPhilippinePhoneNumber = (phone: string) => {
  // PH mobile number format: +639XXXXXXXXX or 09XXXXXXXXX
  // Remove any spaces, hyphens or parentheses
  const cleanPhoneNum = phone.replace(/[\s\-()]/g, "");

  // Check if it starts with +639 followed by 9 digits or 09 followed by 9 digits
  const re = /^(\+?639|09)\d{9}$/;
  return re.test(cleanPhoneNum);
};

export const getImageUrl = (imageName: string) => {
  return `http://localhost:3000/images/${imageName}`;
};
