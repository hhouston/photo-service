import jsonwebtoken from 'jsonwebtoken'

export const createLoginUser = ({
  burstCoupon,
  jwtToken,
  log
}) => ({ email, coupon }) => {
    try {
    log.info({ coupon, burstCoupon }, 'Verify Coupon: Start')

    const valid = burstCoupon === coupon

    if (!valid) {
        throw new Error('Incorrect credentials')
    }

    const token = jsonwebtoken.sign({ email }, jwtToken, { expiresIn: '10y' })
    return token
  } catch (err) {
    log.error({ err }, 'Verify Coupon: Fail')
    throw err
  }
}
