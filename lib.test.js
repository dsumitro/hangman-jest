const readlineSync = require('readline-sync');
const {
  stringify,
  createBlankWordArray,
  isWordSolved,
  print,
  randomlySelectWord,
  askForALetter,
  validateInput,
} = require('./lib');

describe('stringify', () => {
  it('should convert an arbitrary string array to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('hello');
  });

  it('should should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    const allCaps = ['H', 'E', 'L', 'L', 'O'];
    const allCapsresult = stringify(allCaps);
    expect(result).toBe('Hello');
    expect(allCapsresult).toBe('HELLO');
  });

  it('should maintain spaces', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];
    const result = stringify(stringArray);
    expect(result).toBe('Hello world');
  });

  it('should return empty string when given an empty array', () => {
    const stringArray = [];
    const result = stringify(stringArray);
    expect(result).toBe('');
  });

  it('should properly handle array entries with multiple characters', () => {
    const stringArray = ['h', 'el', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('hello');
  });
  it('should return nothing if given nothing', () => {
    const result = stringify();
    expect(result).toBe('');
  });
});

describe('createBlankWordArray', () => {
  it('should return an array of arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);
    // test length
    expect(result.length).toBe(10);
    // or
    expect(result).toHaveLength(10);

    // check that each index has an underscore
    expect(result.every(letter => letter === '_')).toBeTruthy();

    // toEqual can check deep equality
    expect(result).toEqual(['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']);
  });
  it('should return an empty array when passed a length of 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });
  it('should gracefully handle undefined input', () => {
    const result = createBlankWordArray();
    expect(result).toEqual([]);
    // or
    expect(result).toHaveLength(0);
  });

  it('should return an empty array on NaN inputs', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
    expect(createBlankWordArray(true)).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return false if  array contains at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBe(false);
    // or
    expect(result).toBeFalsy();
    // or
    expect(result).not.toBeTruthy();
  });

  it('should return true if array does not contain an underscore', () => {
    const input = 'hello'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });

  it('should throw a TypeError if passed undefined input', () => {
    // expect.assertions(1);
    // try {
    //   isWordSolved();
    // } catch (err) {
    //   expect(err).toBeInstanceOf(TypeError);
    // }
    // OR
    // TODO: check this again with someone
    expect(() => isWordSolved()).toThrow(TypeError);
  });
});
describe('print', () => {
  it('should log output to the console', () => {
    console.log = jest.fn();
    print('Some input');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Some input');
    console.log.mockClear(); // clear the mock state
  });

  it('should output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('');
    console.log.mockClear(); // clear the mock state
  });
});
describe('randomlySelectWord', () => {
  // Math.random = jest.fn(() => 0.5);
  // Math.random = jest.fn().mockReturnValue(0.5);

  it('should return any word in the array', () => {
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);
    const firstResult = randomlySelectWord(['first', 'second', 'third']);
    const secondResult = randomlySelectWord(['first', 'second', 'third']);
    const thirdResult = randomlySelectWord(['first', 'second', 'third']);

    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});

jest.mock('readline-sync'); // mocks all the functions in an entire library/module by setting every functino equal to a jest.fn()
describe('askForALetter', () => {
  it('should return the letter that the user input', () => {
    readlineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});

describe('validateInput', () => {
  it('should only return a single letter when a single letter is passed in', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });
  it('should return the first character if it receives multiple characters', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });
  it('should throw an error with a messge of "Invalid input" if it receives a number', () => {
    expect.assertions(2);
    try {
      validateInput(2);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid input');
    }
  });

  it('should throw an error if it receives an input of undefined', () => {
    expect(validateInput).toThrow('Invalid input');
  });

  it('should throw an error if it receives a character that is not a letter', () => {
    expect(() => {
      validateInput('2');
    }).toThrow('Invalid input');

    expect(() => {
      validateInput('.a');
    }).toThrow('Invalid input');
  });
});
