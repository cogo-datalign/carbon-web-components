/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './tag-group.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Tag Group
 *
 * @element dds-tag-group
 */
@customElement(`${ddsPrefix}-tag-group`)
class DDSTagGroup extends StableSelectorMixin(LitElement) {
  /**
   * Handler for @slotchange, ensure that the only elements being rendered are BXTag and DDSTagLink
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement).assignedNodes();

    const carbonTags = childItems.filter((elem) =>
      (elem as HTMLElement).matches?.(
        (this.constructor as typeof DDSTagGroup).selectorTag
      )
    );

    const carbonReactTags = childItems.filter((elem) =>
      (elem as HTMLElement).classList?.contains?.(
        (this.constructor as typeof DDSTagGroup).selectorReactTag
      )
    );

    // Handle color setting differently depending on Carbon WC or Carbon React
    carbonTags.forEach((elem) => {
      if (
        !(elem as HTMLElement).hasAttribute('type') ||
        (elem as HTMLElement).getAttribute('type') === 'gray'
      ) {
        (elem as HTMLElement).setAttribute('type', 'green');
      }
    });
    carbonReactTags.forEach((elem) => {
      if (
        !(elem as HTMLElement).className
          .split(' ')
          .some((c) => /^bx--tag--/.test(c))
      ) {
        (elem as HTMLElement).classList?.add(`${prefix}--tag--green`);
      }
    });
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  /**
   * A selector that will return the DDSTagLink child items.
   */
  static get selectorTagLink() {
    return `${ddsPrefix}-tag-link`;
  }

  /**
   * A selector that will return the BXTag child items.
   */
  static get selectorTag() {
    return `${prefix}-tag`;
  }

  /**
   * A selector that will return the BXTag child items.
   */
  static get selectorReactTag() {
    return `${prefix}--tag`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tag-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTagGroup;
