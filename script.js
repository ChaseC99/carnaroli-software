// Simple looping dot-typing effect for the element with id="dots"
// Cycles from 0 to 3 dots, updating every 500ms.
(() => {
	const el = document.getElementById('dots');
	if (!el) return;
	let count = 0;
	const max = 3;
	const interval = 500; // ms
	setInterval(() => {
		count = (count + 1) % (max + 1);
		el.textContent = '.'.repeat(count);
	}, interval);
})();
