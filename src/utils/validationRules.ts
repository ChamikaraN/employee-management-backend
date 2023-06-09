const validationRules = {
  first_name: {
    required: true,
    pattern: /^[a-zA-Z]{6,10}$/,
    message:
      "First name should only contain alphabets, min 6 characters, and max 10 characters",
  },
  last_name: {
    required: true,
    pattern: /^[a-zA-Z]{6,10}$/,
    message:
      "Last name should only contain alphabets, min 6 characters, and max 10 characters",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
  number: {
    required: true,
    pattern:
      /^(0|94|\+94)?(1\d|2[1234567]|3[12345678]|4[157]|5[12457]|6[3567]|7[012478]|9[12])(\d{7})$/,
    message: "Invalid Sri Lankan phone number",
  },
  gender: {
    required: true,
    pattern: /^[MF]$/,
    message: "Gender is required",
  },
};

export { validationRules };
