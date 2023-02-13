import { construct } from './construct';

describe('construct', () => {
  class TestClass {
    name: string;

    constructor(data: { name: string }) {
      this.name = data.name;
    }
  }

  it('should return the value as is when it is an instance of the class already', () => {
    const data = new TestClass({ name: 'Zougui' });

    const result = construct(TestClass, data);

    expect(result).toBe(data);
  });

  it('should return the an instance from the constructor when it is not an instance of the class', () => {
    const data = { name: 'Zougui' };

    const result = construct(TestClass, data);

    expect(result).toBeInstanceOf(TestClass);
  });
});
