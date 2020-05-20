export const cleanInput = input => {
  const cleanedInput = input.map(value => value.replace(/[!@#$%^&*.,`~%;:]/g, ""))
  
  return cleanedInput
}
