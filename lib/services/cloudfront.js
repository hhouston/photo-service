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




// const readFile = util.promisify(fs.readFile);
// const getStuff = async (file) => {
//     return await readFile(file);
// }
// getStuff('config/secret.d/cloudfront-private-key.pem').then(data => {
//     const signingParams = {
//       keypairId: 'APKAJ4JXK6GNZDSWCW6A',
//       privateKeyString: data.toString(),
//       // Optional - this can be used as an alternative to privateKeyString
//       // privateKeyPath: '/path/to/private/key',
//       expireTime: 1558147865000
//     }
//
//     const signedUrl = cfsign.getSignedUrl(
//       'https://d3gaqejqo5el7.cloudfront.net/fit-in/1500x1500/safe-url/181214OpenTable_NOPB6_322.jpg',
//       signingParams
//     )
//
//     console.log('signed url----- ', signedUrl);
// }).catch(err => {
//   console.log('err', err);
// })
