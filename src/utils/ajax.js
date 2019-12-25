import axios from 'axios'
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 1000 * 60 * 10

function requestHandle (params) {
  return new Promise((resolve, reject) => {
    axios(params)
      .then((res) => {
        if (res.data) {
          if (res.data.status === 200) {
            resolve({
              data: res.data.data ? res.data.data : null
            })
          } else if (res.data.status === 20122) {
            window.alert('无操作权限')
          } else {
            if (res.data.status === 20121) {
              try {
                document.location.replace('/login')
              } catch (err) {}
            } else {
              resolve({
                error: {
                  code: res.data.status,
                  message: res.data.message
                }
              })
            }
          }
        } else {
          reject(new Error('没有返回数据'))
        }
      })
      .catch((err) => {
        resolve({
          error: {
            code: 500,
            message: `${params.url}: ${err.message}`
          }
        })
      })
  })
}

function queryString (url, query) {
  let str = []
  for (let key in query) {
    if (query[key]) {
      str.push(key + '=' + query[key])
    }
  }
  let paramStr = str.join('&')
  return paramStr
    ? `${url}${url.indexOf('?') > -1 ? '&' : '?'}${paramStr}`
    : url
}

function getHeaders (options) {
  let headers = Object.assign({
    'Content-Type': 'application/json'
  },
  options
  )

  // let token = getSessionStorage('auth_token')
  // if (token) {
  //   headers.Authorization = token
  // }
  return headers
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params,
      headers: getHeaders(op)
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: queryString(url, params),
      headers: getHeaders(op)
    })
  },
  serverUrl (apiName) {
    // return `/api${apiName}`;
    return apiName
  },
  serverUrlMock (apiName) {
    return apiName
  }
}
