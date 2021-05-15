import BasePage from '../base_page';

class Aniwatch extends BasePage {
  getIdentifier() {
    return this.pathname.split('/')[2];
  }

  getRawEpisodeNumber() {
    return parseInt(this.pathname.split('/')[3], 10);
  }
}

export default Aniwatch;
