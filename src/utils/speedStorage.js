const KEY_SESSION_META = 'speedSessionMeta'
const KEY_RESULTS = 'speedResults'
const KEY_FINAL_REVIEW = 'speedFinalReview'

const safeParse = (value) => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('Storage parse error', error)
    return null
  }
}

export const saveSessionMeta = (meta) =>
  sessionStorage.setItem(KEY_SESSION_META, JSON.stringify(meta))

export const loadSessionMeta = () => safeParse(sessionStorage.getItem(KEY_SESSION_META))

export const clearSessionMeta = () => sessionStorage.removeItem(KEY_SESSION_META)

export const saveResults = (results) => sessionStorage.setItem(KEY_RESULTS, JSON.stringify(results))

export const loadResults = () => safeParse(sessionStorage.getItem(KEY_RESULTS)) || []

export const clearResults = () => sessionStorage.removeItem(KEY_RESULTS)

export const saveFinalReviewWords = (words) =>
  sessionStorage.setItem(KEY_FINAL_REVIEW, JSON.stringify(words))

export const loadFinalReviewWords = () =>
  safeParse(sessionStorage.getItem(KEY_FINAL_REVIEW)) || []

export const clearFinalReviewWords = () => sessionStorage.removeItem(KEY_FINAL_REVIEW)
