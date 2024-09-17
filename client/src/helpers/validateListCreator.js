import validate from 'validate.js'

const formConstraints = {
  'title': {
    presence: true,
  },
}

export function validateListCreator(formData) {
  return validate(formData, formConstraints)
}