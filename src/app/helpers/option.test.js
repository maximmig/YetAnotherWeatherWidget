import Option from './option';

describe('Option', () => {
  const key = 'key';
  const label = 'label';
  const icon = 'path/to/icon';

  it('correctly initializes new instance', () => {
    const option = new Option(label, key, icon);
    expect(option.label).toEqual(label);
    expect(option.key).toEqual(key);
    expect(option.icon).toEqual(icon);
  });

  it('creates instance without new', () => {
    const option = Option(label);
    expect(option).toBeInstanceOf(Option);
    expect(option.label).toEqual(label);
  });

  it('ensures key is equal to label if omitted', () => {
    expect(Option(label).key).toEqual(label);
  });
});
