import { H4TestPage } from './app.po';

describe('h4-test App', () => {
  let page: H4TestPage;

  beforeEach(() => {
    page = new H4TestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
