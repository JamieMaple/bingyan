const url = 'http://localhost'
const port = '3001'

const mainURL = `${url}:${port}`

export const tokenVerify = `${mainURL}/auth`

export const type = {
  ADD: 1,
  DELETE: 2,
  ALL: 3,
  GET_INFO: 3,
  ADD_TO_CART : 4,
  BUY: 5,
  other: 10
}

export const favorite = `${mainURL}/auth/favorite`
export const cart = `${mainURL}/auth/cart`
export const userInfo = `${mainURL}/auth/info`

export const signIn = `${mainURL}/signin`
export const signUp = `${mainURL}/signup`

export const categoriesAPI = `${mainURL}/api/categories`
export const goodsAPI = `${mainURL}/api/goods`

export const tokenName = 'uid_token'
