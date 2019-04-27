import jsonwebtoken from 'jsonwebtoken'

export const createLoginUser = ({
  burstCoupon,
  jwtToken
}) => ({ email, coupon }) => {
    const valid = burstCoupon === coupon;

    if (!valid) {
        throw new Error('Incorrect credentials')
    }

    const token = jsonwebtoken.sign({ email: email }, jwtToken, { expiresIn: '1y' })
    return token
}
