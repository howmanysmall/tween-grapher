import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<NextUIProvider key="NextUIProvider">
			<div className="w-screen h-screen p-8 flex items-start justify-center" key="Main">
				<App key="App" />
			</div>
		</NextUIProvider>
	</React.StrictMode>,
);
