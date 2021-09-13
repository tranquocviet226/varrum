const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const classTypeRegex = /^basic$|^advanced$/
const statusRegex = /^active$|^inactive$|^block$/
const slugRegex = /^[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*$/

export const regex = {
  passwordRegex: passwordRegex,
  phoneRegex: phoneRegex,
  classTypeRegex: classTypeRegex,
  slugRegex: slugRegex,
  statusRegex
}
