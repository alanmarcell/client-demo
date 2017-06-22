import { ClientDemoTestPage } from './app.po';

describe('Client Demo App', () => {
  let page: ClientDemoTestPage;

  beforeEach(() => {
    page = new ClientDemoTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
