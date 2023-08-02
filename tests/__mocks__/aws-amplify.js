export const Auth = {
  signUp: jest.fn(() => Promise.resolve({ user: {} })),
  signIn: jest.fn(() => Promise.resolve({ user: {} })),
  confirmSignUp: jest.fn(() => Promise.resolve({ user: {} })),
  forgotPassword: jest.fn(() => Promise.resolve({ user: {} })),
  forgotPasswordSubmit: jest.fn(() => Promise.resolve({ user: {} })),
};
