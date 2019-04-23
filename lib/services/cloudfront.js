import { createHmac } from 'crypto'

import { join, pipe, map, apply, replace } from 'ramda'

const hmacRegexes = [
  [/\+/g, '-'],
  [/\//g, '_']
]

const cleanHmac = pipe(...map(apply(replace), hmacRegexes))

const getHmac = (key, value) => {
  const hmac = createHmac('sha1', key).update(value)
  return cleanHmac(hmac.digest('base64'))
}

export const createGetImageUrl = ({
  baseUrl,
  securityKey
}) => ({ path }) => {
  const imagePath = '500x500/smart/181214OpenTable_NOPB6_322.jpg'
  const hash = getHmac(securityKey, imagePath)
  return join('/', [baseUrl, hash, imagePath])
}
