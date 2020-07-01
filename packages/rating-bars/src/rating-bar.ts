/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
import { html, customElement, LitElement, property, TemplateResult } from 'lit-element';
import styles from './rating-bar-css';

@customElement('rating-bar')
export default class RatingBar extends LitElement {
  /**
   * Implement `render` to define a template for button element.
   */

  @property({type: Number, reflect: true})
  rating = 0;
  
  @property({type: String, reflect: true})
  label = "";

  @property({type: String})
  a11yLabel = ""; // Experience 7.1 out of 10

  @property({type: Number})
  conversionRate = 0;

  @property({type: String})
  _ratingClass = '';
  
  _ratingEnum = {
    'Poor': 'poor',
    'Average': 'average',
    'Good': 'good'
  };

  render(): TemplateResult {
    return html`
      <div class="rating-bar-container" aria-hidden="true">
        <div class="rating-bar-shell">
          <div id="rating-bar-progress" class="${this._ratingClass} rating-bar-progress" style="width:${ this.rating <=100 ? this.rating : 0 }%;"></div>
        </div>
        <div class="rating-bar-label">
          <span>${this.label}</span>
          <span>${this.rating / this.conversionRate}</span>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    if (!this.hasAttribute('aria-label')) {
      this._handlea11yLabel();
    }
    this.handleProgressColor();
  }

  handleProgressColor() {
      this._ratingClass = this._ratingEnum.Poor;

      switch(true)
      {
        case this.rating >= 50 && this.rating < 70:
          this._ratingClass = this._ratingEnum.Average;
          break;
        case this.rating >= 70:
          this._ratingClass = this._ratingEnum.Good;
          break;
      }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  _handlea11yLabel() {
    let ariaLabel = '';
    if (this.a11yLabel) {
      ariaLabel += `${this.a11yLabel} `;
    }
    if (this.rating && this.conversionRate && this.label) {
      ariaLabel += `${this.label} ${this.rating / this.conversionRate} out of ${this.conversionRate}`;
    }
    this.setAttribute('aria-label', ariaLabel);
  }
  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
