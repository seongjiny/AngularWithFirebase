import { Exam2Page } from './app.po';

describe('exam2 App', () => {
  let page: Exam2Page;

  beforeEach(() => {
    page = new Exam2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
