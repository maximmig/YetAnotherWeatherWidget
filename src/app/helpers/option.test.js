import Option from './option';

describe('Option', () => {
  const key = 'key';
  const label = 'label';
  const icon = 'path/to/icon';

  it('creates instance without new', () => {
    Option(label).should.be.instanceOf(Option);
  });

  it('ensures key is equal to label if omitted', () => {
    Option(label).key.should.be.equal(label);
  });

  it('correctly initializes new instance', () => {
    const option = new Option(label, key, icon);
    option.label.should.be.equal(label);
    option.key.should.be.equal(key);
    option.icon.should.be.equal(icon);
  });
});
