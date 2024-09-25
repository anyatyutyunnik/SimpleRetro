const urls = {
  getMainUrl: () => {
    return createAppUrl('/')
  },
  getSigninUrl: () => {
    return createAppUrl('/signin')
  },
  getBoardUrl: (id = ':id') => {
    return createAppUrl(`/board/${id}`)
  },
  getBoardListUrl: () => {
    return createAppUrl('/board-list')
  },
  getNotFoundUrl: () => {
    return createAppUrl('/404')
  },
}

function createAppUrl(url: string) {
  return new URL(url, window.location.origin)
}

export { urls }
