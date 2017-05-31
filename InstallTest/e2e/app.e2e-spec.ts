import { InstallTestPage } from './app.po';

describe('install-test App', () => {
  let page: InstallTestPage;

  beforeEach(() => {
    page = new InstallTestPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
