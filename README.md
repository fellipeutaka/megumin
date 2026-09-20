<div align="center">
  <h1>Sileo</h1>
  <p>An opinionated, physics-based toast component for React.</p>
  <p><a href="https://sileo.aaryan.design">Try Out</a> &nbsp; / &nbsp; <a href="https://sileo.aaryan.design/docs">Docs</a></p>
  <video src="https://github.com/user-attachments/assets/a292d310-9189-490a-9f9d-d0a1d09defce"></video>
</div>

### Installation

```bash
npm i sileo
```

### Getting Started

```tsx
import { Toast, Toaster } from "sileo";

export default function App() {
	return (
			<Toast.Provider>
				<Toaster />
				<YourApp />
			</Toast.Provider>
		);
	}
```

Create notifications with the Base UI toast manager:

```tsx
import { Toast } from "sileo";

function SaveButton() {
	const toastManager = Toast.useToastManager();

	return (
		<button
			type="button"
			onClick={() =>
				toastManager.add({
					title: "Saved",
					description: "Your changes are up to date.",
					type: "success",
				})
			}
		>
			Save
		</button>
	);
}
```

`Toast.Provider` exposes Base UI's `timeout`, `limit`, global manager, update, close,
promise, and swipe behavior. `Toaster` only supplies Sileo's visual renderer and
animations.

For custom Sileo visuals, pass `data` through the Base UI toast options:

```tsx
toastManager.add({
	title: "Uploaded",
	type: "success",
	data: { fill: "#ffffff", roundness: 18 },
});
```

For detailed docs, click here: https://sileo.aaryan.design
