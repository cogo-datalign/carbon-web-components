/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import ArrowRight24 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/24.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * MegaMenu Heading.
 *
 * @element c4d-megamenu-heading
 * @csspart heading-link - The link element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-link)`
 * @csspart heading-h2 - The h2 element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-h2)`
 * @csspart heading-h3 - The h3 element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-h3)`
 * @csspart heading-h4 - The h4 element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-h4)`
 * @csspart heading-h5 - The h5 element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-h5)`
 * @csspart heading-h6 - The h6 element of the megamenu heading. Usage: `c4d-megamenu-heading::part(heading-h6)`
 * @csspart heading-span - The span element containing slotted content. Usage: `c4d-megamenu-heading::part(heading-span)`
 */
@customElement(`${c4dPrefix}-megamenu-heading`)
class C4DMegaMenuHeading extends HostListenerMixin(LitElement) {
  /**
   * Megamenu heading href.
   */
  @property({ reflect: true })
  href = '';

  /**
   * Megamenu heading text.
   */
  @property({ reflect: true })
  title = '';

  @property({ reflect: true, type: Number, attribute: 'heading-level' })
  headingLevel = 2;

  /**
   * Arrow icon to use when presented as link.
   */
  protected _arrowIcon = ArrowRight24();

  /**
   * Render heading as link.
   */
  protected renderLink() {
    const { _arrowIcon } = this;
    return html`
      <a
        part="heading-link"
        href="${this.href}"
        data-attribute1="headerNav"
        data-attribute2="FlatHdline"
        data-attribute3="${this.title}">
        ${this.title} ${_arrowIcon}
      </a>
    `;
  }

  /**
   * Render heading as plain text.
   */
  protected renderPlain() {
    return html` ${this.title} `;
  }

  /**
   * Render heading markup.
   */
  protected renderHeading() {
    const { headingLevel } = this;
    const hasHref = Boolean(this.href);
    switch (headingLevel) {
      case 3:
        return html`
          <h3 part="heading-h3" ?data-has-href="${hasHref}">
            ${this.renderHeadingInner()}
          </h3>
        `;
      case 4:
        return html`
          <h4 part="heading-h4" ?data-has-href="${hasHref}">
            ${this.renderHeadingInner()}
          </h4>
        `;
      case 5:
        return html`
          <h5 part="heading-h5" ?data-has-href="${hasHref}">
            ${this.renderHeadingInner()}
          </h5>
        `;
      case 6:
        return html`
          <h6 part="heading-h6" ?data-has-href="${hasHref}">
            ${this.renderHeadingInner()}
          </h6>
        `;
      default:
        return html`
          <h2 part="heading-h2" ?data-has-href="${hasHref}">
            ${this.renderHeadingInner()}
          </h2>
        `;
    }
  }

  /**
   * Render inner heading contents as link or plain text.
   */
  protected renderHeadingInner() {
    return this.href ? this.renderLink() : this.renderPlain();
  }

  protected _handleSlotChange(event) {
    const hasContent =
      (event.target as HTMLSlotElement)
        .assignedNodes()
        .filter((child) => child?.textContent?.trim()).length > 0;

    this.classList.toggle('has-content', hasContent);
  }

  render() {
    return html`
      ${this.renderHeading()}
      <span part="heading-span">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </span>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMegaMenuHeading;
