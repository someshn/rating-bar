/* eslint-disable linebreak-style */
import { RatingBar } from '..';
import '..';

describe("rating-bar", ()=> {
  let ratingBar: RatingBar = null;

  beforeEach(async () => {
    ratingBar = (await document.body.appendChild(
        document.createElement('rating-bar'),
      )) as RatingBar;
      ratingBar.label = 'Location';
      ratingBar.conversionRate = 10;
      await ratingBar.requestUpdate();
    });

    afterEach(async function() {
      await ratingBar.remove();
    });

    it('Should Check Aria Label', () => {
      ratingBar.rating = 84;
      ratingBar._handlea11yLabel();
      expect(ratingBar.getAttribute('aria-label')).toEqual('Business 8.4 out of 10');
    });

     it('Should Check Good Based On Rating 83', async ()=> {
      ratingBar.rating = 83;
      ratingBar.handleProgressColor();
      await ratingBar.requestUpdate();
      expect(ratingBar.shadowRoot.querySelectorAll('.good').length).toEqual(1);
     });

     it('Should Check Poor Based On Rating 60', async ()=> {
      ratingBar.rating = 60;
      ratingBar.handleProgressColor();
      await ratingBar.requestUpdate();
      expect(ratingBar.shadowRoot.querySelectorAll('.poor').length).toEqual(1);
     });

     it('Should Check Average Based On Rating 76', async ()=> {
      ratingBar.rating = 76;
      ratingBar.handleProgressColor();
      await ratingBar.requestUpdate();
      expect(ratingBar.shadowRoot.querySelectorAll('.good').length).toEqual(1);
     });
});
