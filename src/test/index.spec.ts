import { cleanInput } from '../api'

describe('clean user input', () => {
  it('should strip out special characters', () => {
    const input: Array<string> = ['!Lagos', 'london,', 'jos.', 'Berlin*', 'sao paulo;']
    const expectedOutput = ['Lagos', 'london', 'jos', 'Berlin', 'sao paulo']
    const output = cleanInput(input)

    expect(output).toEqual(expectedOutput)
  })
})
