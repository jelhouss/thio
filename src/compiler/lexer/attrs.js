import {
  ATTRIBUTE_NOT_WRAPPED_IN_QUOTES,
  EMPTY_EVENT_LISTENER
} from '../constants/errors'

export default ({ FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG, attrs }) => {
  let cursor = 0

  while (cursor < FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG.length) {
    let attribute = ''
    let value = ''
    let IS_DATA_ATTRIBUTE = false
    let IS_EVENT = false

    while (
      FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== '=' &&
      FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== undefined &&
      FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== ' '
    ) {
      attribute += FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor]
      cursor++
    }

    if (FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === undefined) {
      attrs.push({ attribute, value })

      break
    } else if (FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === ' ') {
      cursor++
    } else {
      cursor++

      if (
        FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === '"' ||
        FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === "'"
      ) {
        cursor++

        while (
          FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== '"' &&
          FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== "'" &&
          FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] !== undefined
        ) {
          value += FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor]
          cursor++
        }
        if (
          FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === '"' ||
          FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG[cursor] === "'"
        ) {
          if (/^data-/.test(attribute)) {
            IS_DATA_ATTRIBUTE = true
          }

          if (/^on/.test(attribute)) {
            IS_EVENT = true
          }

          if (value === '') {
            if (IS_EVENT) {
              throw new TypeError(EMPTY_EVENT_LISTENER)
            }
          } else {
            cursor++
          }
        } else {
          throw new TypeError(ATTRIBUTE_NOT_WRAPPED_IN_QUOTES)
        }
      } else {
        throw new TypeError(ATTRIBUTE_NOT_WRAPPED_IN_QUOTES)
      }
    }

    if (attribute !== '') {
      if (IS_EVENT) {
        attrs.push({ event: attribute.slice(2), handler: value })
      } else if (IS_DATA_ATTRIBUTE) {
        attrs.push({
          dataAttribute: attribute.slice(5),
          value
        })
      } else {
        attrs.push({ attribute, value })
      }
    }
  }

  return attrs
}
