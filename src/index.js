/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';
import './styles/main.css';
import { Dropdown } from 'carbon-components';
import '@carbon/layout/scss/breakpoint';

Dropdown.create(document.getElementById('my-dropdown'));
alert('connected!');
