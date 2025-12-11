const normalize = (value) => {
  return (value ?? '').toString().trim().toLowerCase()
}

export default normalize
