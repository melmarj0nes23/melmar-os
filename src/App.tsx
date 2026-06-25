/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OSProvider } from "./context/OSContext";
import BootScreen from "./components/system/BootScreen";
import Desktop from "./components/system/Desktop";

export default function App() {
  return (
    <OSProvider>
      <BootScreen />
      <Desktop />
    </OSProvider>
  );
}
