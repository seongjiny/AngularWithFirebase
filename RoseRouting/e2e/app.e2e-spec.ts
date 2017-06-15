import { RoseRoutingPage } from './app.po';

describe('rose-routing App', () => {
  let page: RoseRoutingPage;

  beforeEach(() => {
    page = new RoseRoutingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
