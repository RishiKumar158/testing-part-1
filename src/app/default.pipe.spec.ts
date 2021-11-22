import { DefaultPipe } from "./default.pipe";

describe('DefaultPipe', () => {

  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });


  it('should create an instance of DefaultPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('','http://place-hold.it/300')).toBe('http://place-hold.it/300');
  });

  it('providing value returns value', () => {
    expect(pipe.transform('http://place-hold.it/300', 'fallback')).toBe('http://place-hold.it/300');
  });

  it('asking for https gives https', () => {
    expect(pipe.transform('', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/300')
  });
});