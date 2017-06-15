import { PhotoBucketPage } from './app.po';

describe('photo-bucket App', () => {
  let page: PhotoBucketPage;

  beforeEach(() => {
    page = new PhotoBucketPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
