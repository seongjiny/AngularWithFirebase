import { FavoriteThingsPage } from './app.po';

describe('favorite-things App', () => {
  let page: FavoriteThingsPage;

  beforeEach(() => {
    page = new FavoriteThingsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
