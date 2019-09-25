/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement, LitElement } from 'lit-element';
import Close20 from '@carbon/icons/lib/close/20';
import Menu20 from '@carbon/icons/lib/menu/20';
import FocusMixin from '../../globals/mixins/focus';
import { forEach } from '../../globals/internal/collection-helpers';
import styles from './header.scss';

const { prefix } = settings;

/**
 * The trigger button for side nav in header nav.
 */
@customElement(`${prefix}-header-menu-button`)
class BXHeaderMenuButton extends FocusMixin(LitElement) {
  private _handleClick() {
    const active = !this.active;
    this.active = !active;
    forEach(this.querySelectorAll((this.constructor as typeof BXHeaderMenuButton).selectorNav), nav => {
      // TODO: Cast to the right class
      (nav as any).open = active;
    });
  }

  /**
   * `true` if the button should represent its active state. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * The `aria-label` attribute for the button in its active state. Corresponds to `button-label-active` attribute.
   */
  @property()
  buttonLabelActive!: string;

  /**
   * The `aria-label` attribute for the button in its active state. Corresponds to `button-label-inactive` attribute.
   */
  @property()
  buttonLabelInactive!: string;

  /**
   * `true` if the button should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { active, buttonLabelActive, buttonLabelInactive, disabled, _handleClick: handleClick } = this;
    const buttonLabel = active ? buttonLabelActive : buttonLabelInactive;
    const classes = classnames(`${prefix}--header__action ${prefix}--header__menu-trigger ${prefix}--header__menu-toggle`, {
      [`${prefix}--header__action--active`]: active,
    });
    return html`
      <button class="${classes}" ?disabled=${disabled} aria-label="${ifDefined(buttonLabel)}" @click=${handleClick}>
        ${active ? Close20() : Menu20()}
      </button>
    `;
  }

  /**
   * A selector that will return the navs whose open state is controlled by this button.
   */
  static get selectorNav() {
    return `${prefix}-side-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXHeaderMenuButton;
