/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../button/button';
import { CHAT_BUTTON_SIZE, CHAT_BUTTON_KIND } from './defs';
import styles from './chat-button.scss';

export { CHAT_BUTTON_SIZE, CHAT_BUTTON_KIND };

/**
 * Icon Button
 *
 */
@customElement(`${prefix}-chat-button`)
class CDSChatButton extends LitElement {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    this._hasIcon = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this.requestUpdate();
  }

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   *  Specify whether the `ChatButton` should be disabled
   */
  @property({ reflect: true })
  kind = CHAT_BUTTON_KIND.PRIMARY;

  /**
   * Chat button size.
   */
  @property({ reflect: true })
  size = CHAT_BUTTON_SIZE.LARGE;

  /**
   * Specify whether the `ChatButton` should be rendered as a quick action button
   */
  @property({ attribute: 'is-quick-action', type: Boolean })
  isQuickAction = false;

  /**
   * Specify whether the quick action `ChatButton` should be rendered as selected. This disables the input
   */
  @property({ attribute: 'is-selected', type: Boolean })
  isSelected = false;

  render() {
    const allowedSizes = [
      CHAT_BUTTON_SIZE.SMALL,
      CHAT_BUTTON_SIZE.MEDIUM,
      CHAT_BUTTON_SIZE.LARGE,
    ];

    if (this.isQuickAction) {
      this.kind = CHAT_BUTTON_KIND.GHOST;
      this.size = CHAT_BUTTON_SIZE.SMALL;
    } else {
      // Do not allow size larger than `lg`
      this.size = allowedSizes.includes(this.size)
        ? this.size
        : CHAT_BUTTON_SIZE.LARGE;
    }

    let classes = `${prefix}--chat-btn`;
    classes += this._hasIcon ? ` ${prefix}--chat-btn--with-icon` : '';
    classes += this.isQuickAction ? ` ${prefix}--chat-btn--quick-action` : '';
    classes += this.isSelected
      ? ` ${prefix}--chat-btn--quick-action--selected`
      : '';

    return html`
      <cds-button
        button-class-name="${classes}"
        size="${this.size}"
        kind="${this.kind}"
        ?disabled="${this.disabled}">
        <slot></slot
        ><slot
          name="icon"
          slot="icon"
          @slotchange="${this._handleSlotChange}"></slot>
      </cds-button>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSChatButton;
