import validate from 'validate.js'

const formConstraints = {
  'title': {
    presence: true,
  },
}

export function validateBoardCreator(formData) {
  return validate(formData, formConstraints)
}