import { capitalizeString } from './utilities';

describe('capitalizeString', () => {
  it('capitalizes the first letter of a string', () => {
    const testString = 'baloney';
    const result = capitalizeString(testString);
    expect(result).toEqual('Baloney');
  });

  it('returns an empty string if nothing is passed in', () => {
    const result = capitalizeString();
    expect(result).toEqual('');
  });
});
