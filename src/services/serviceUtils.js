export function clone(value) {
  return structuredClone(value)
}

export function simulateRequest(value, options = {}) {
  const { delay = 650, shouldFail = false, errorMessage = 'The request could not be completed.' } = options
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error(errorMessage))
        return
      }
      resolve(clone(value))
    }, delay)
  })
}
