import { ReceptioPage } from './app.po';

describe('receptio App', function() {
  let page: ReceptioPage;

  beforeEach(() => {
    page = new ReceptioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
