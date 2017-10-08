const mainURL = 'http://10.146.100.135'
const port = '3001'

export const tokenVerify = `${mainURL}:${port}/auth`

export const type = {
  ADD: 1,
  DELETE: 2,
  ALL: 3,
  ADD_TO_CART : 4,
  BUY: 5,
  other: 10
}

export const favorite = `${mainURL}:${port}/auth/favorite`
export const cart = `${mainURL}:${port}/auth/cart`
export const userInfo = `${mainURL}:${port}/auth/info`

export const signIn = `${mainURL}:${port}/signin`
export const signUp = `${mainURL}:${port}/signup`

export const categoriesAPI = `${mainURL}:${port}/api/categories`
export const goodsAPI = `${mainURL}:${port}/api/goods`

export const tokenName = 'uid_token'
