import { HTML_ELEMENTS, VOID_ELEMENTS } from '../constants/tags'
import {
  VOID_ELEMENT_NOT_VALID,
  INVALID_ATTTRIBUTE_NAME,
  INVALID_ATTTRIBUTE_VALUE,
  INVALID_EVENT_HANDLER,
  INVALID_TAG_NAME,
  INVALID_DATA_ATTRIBUTE_NAME,
  INVALID_DATA_ATTRIBUTE_VALUE
} from '../constants/errors'
import {
  ATTRIBUTE_VALUE_REGEX,
  DATA_ATTRIBUTE_NAME_REGEX,
  DATA_ATTRIBUTE_VALUE_REGEX
} from '../constants/regex'
import EVENTS from '../constants/events'
import ATTRIBUTES from '../constants/attrs'

export default ({
  token: { voidElement, openTag, attrs },
  IS_VOID = false
}) => {
  if (IS_VOID && !VOID_ELEMENTS.includes(voidElement)) {
    throw new TypeError(VOID_ELEMENT_NOT_VALID)
  }

  if (!IS_VOID && !HTML_ELEMENTS.includes(openTag) && openTag !== 'ROOT') {
    throw new TypeError(INVALID_TAG_NAME)
  }

  return openTag === 'ROOT'
    ? { tag: 'ROOT', children: [] }
    : {
      tag: IS_VOID ? voidElement : openTag,
      props: {
        dataAttributes: attrs
          .filter((lexedAttribute) => lexedAttribute.dataAttribute)
          .map(({ dataAttribute, value }) => {
            if (!DATA_ATTRIBUTE_NAME_REGEX.test(dataAttribute)) {
              throw new TypeError(INVALID_DATA_ATTRIBUTE_NAME)
            } else if (!DATA_ATTRIBUTE_VALUE_REGEX.test(value)) {
              throw new TypeError(INVALID_DATA_ATTRIBUTE_VALUE)
            } else {
              return { dataAttribute, value }
            }
          }),
        attributes: attrs
          .filter((lexedAttribute) => lexedAttribute.attribute)
          .map(({ attribute, value }) => {
            if (!ATTRIBUTES.includes(attribute)) {
              throw new TypeError(INVALID_ATTTRIBUTE_NAME)
            } else if (value !== '' && !ATTRIBUTE_VALUE_REGEX.test(value)) {
              throw new TypeError(INVALID_ATTTRIBUTE_VALUE)
            } else {
              return { attribute, value }
            }
          }),
        events: attrs
          .filter((lexedAttribute) => lexedAttribute.event)
          .map(({ event, handler }) => {
            if (!EVENTS.includes(event)) {
              throw new TypeError(INVALID_EVENT_HANDLER)
            } else {
              return { event, handler }
            }
          })
      },
      ...(!IS_VOID && { children: [] })
    }
}
