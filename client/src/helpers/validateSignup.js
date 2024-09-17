import validate from 'validate.js'

const formConstraints = {
  'email': {
    presence: true,
    email: true,
  },
  'password': {
    presence: true,
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    }
  },
  'first_name': {
    presence: true
  },
  'password_confirmation': {
    presence: true,
    equality: 'password'
  }
}

export function validateSignup(formData) {
  return validate(formData, formConstraints)
}