let mainURL
const url = 'http://localhost'
const port = 8080

if (port) {
  mainURL = `${url}:${port}`
} else {
  mainURL = url
}

export const tokenVerify = `${mainURL}/auth`

export const type = {
  ADD: 1,
  DELETE: 2,
  ALL: 3,
  GET_INFO: 3,
  ADD_TO_CART : 4,
  BUY: 5,
  OTHER: 10
}

export const favorite = `${mainURL}/auth/favorite`
export const cart = `${mainURL}/auth/cart`
export const userInfo = `${mainURL}/auth/info`
// todo changeInfo
export const changeInfo = `${mainURL}/auth/changeInfo`

export const signIn = `${mainURL}/user/signin`
export const signUp = `${mainURL}/user/signup`
// todo forget password
export const forgetPassword = `${mainURL}/user/forget`

export const categoriesAPI = `${mainURL}/api/categories`
export const goodsAPI = `${mainURL}/api/goods`


export const tokenName = 'uid_token'
