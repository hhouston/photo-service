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
  securityKey,
  log
}) => ({ id, width, height, watermark }) => {
  log.info({ id }, 'Get Image Url: Start')

  // const wmPath = `${width}x${height}/smart/0vPndq2UcmSycDEfYFvg`
  // const wmHash = getHmac(securityKey, wmPath)
  // const wmUrl = join('/', [baseUrl, wmHash, wmPath])

  const imagePath = `${width}x${height}/smart/${id}`
  const hash = getHmac(securityKey, imagePath)
  const url = join('/', [baseUrl, hash, imagePath])

  log.info({ url }, 'Get Image Url: Success')

  return { url, width, height }
}
