const ERROR_MESSAGES = {
  TYPE1_REQUIRED: 'type1 값이 필요합니다.',
  TYPE2_REQUIRED: 'type2 값이 필요합니다.',
  INVALID_COUNT: '학습 개수(count)를 올바르게 입력해주세요.',
  INVALID_INCORRECT_THRESHOLD: '틀린 기준 n 값을 올바르게 입력해주세요.',
  WORD_ID_REQUIRED: '결과에 wordId가 없습니다.',
  WORD_NOT_FOUND: '존재하지 않는 wordId가 포함되었습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
}

export const mapErrorCode = (code) => {
  if (!code) return '요청 처리 중 문제가 발생했습니다.'
  return ERROR_MESSAGES[code] || '요청 처리 중 문제가 발생했습니다.'
}
