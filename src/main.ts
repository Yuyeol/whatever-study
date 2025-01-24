import App from "@/app";
import { render } from "@/utils/core/render";
import { setupEventDelegation } from "@/utils/core/eventSystem";
import { createRoot } from "@/utils/core/root";

// console.log(App());
const container = document.getElementById("app");
if (!container) throw new Error("Root element not found");

createRoot(App, container);
render(App(), container);
setupEventDelegation();
