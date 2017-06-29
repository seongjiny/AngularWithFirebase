import { Exam1Page } from './app.po';

describe('exam1 App', () => {
  let page: Exam1Page;

  beforeEach(() => {
    page = new Exam1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
