const removeKeyNull = (value: any) => {
  Object.keys(value).forEach((key) => value[key] == null && delete value[key])
  return value
}
export default removeKeyNull
