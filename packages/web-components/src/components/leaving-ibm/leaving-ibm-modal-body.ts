/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import BXModalBody from 'carbon-web-components/es/components/modal/modal-body.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import 'carbon-web-components/es/components/link/link.js';
import styles from './leaving-ibm.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Leaving IBM Modal body.
 *
 * @element dds-leaving-ibm-modal-body
 */
@customElement(`${ddsPrefix}-leaving-ibm-modal-body`)
class DDSLeavingIbmModalBody extends StableSelectorMixin(BXModalBody) {
  /**
   * external url triggering the leaving ibm modal.
   */
  @property({ reflect: true })
  href = '';

  render() {
    const { href } = this;
    return html`
      <p><slot></slot></p>
      <slot name="supplemental"></slot>
      <bx-link size="lg" href="${ifNonNull(href)}"
        >${!href ? href : new URL(href).hostname}</bx-link
      >
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leaving-ibm-modal-body`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeavingIbmModalBody;
