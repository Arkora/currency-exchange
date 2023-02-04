export const setUser = (user) =>{
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () =>{
   const user = localStorage.getItem('user')
   ? JSON.parse(localStorage.getItem('user'))
      : {}
      return user
}

export const setToken = (token)  =>{
    localStorage.setItem('token',JSON.stringify(token))
}

export const getToken = () =>{
    const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
       : ''
       return token
 }

