import App from "@/app";
import { render } from "@/utils/core/render";

// console.log(App());
const container = document.getElementById("app");
if (!container) throw new Error("Root element not found");

render(App(), container);
