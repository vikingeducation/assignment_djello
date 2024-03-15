// updated card
//  object: list, title, description, card, membership
// verb: update, create, destroy
// value: ...
// user: name

export function activitySentence(name, verb, object, value) {


  let phrase = {
    create: {
      membership: value + ' ' + 'joined the card',
      card: `${name} created this card`
    },
    update: {
      title: `${name} changed the title to ${value}`,
      description: `${name} changed the description to ${value}`,
      list: `${name} moved the card to ${value}`
    },
    destroy: {
      membership: `${value} left the card`
    }
  }

  return phrase[verb][object]


}