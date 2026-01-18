// Simple looping dot-typing effect for the element with id="dots"
// Cycles from 0 to 3 dots, updating every 500ms.
function startDots() {
	const el = document.getElementById('dots');
	if (!el) return;

	const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
	if (reducedMotion) {
		el.textContent = '...';
		return;
	}

	let count = 0;
	const max = 3;
	const interval = 500; // ms
	setInterval(() => {
		count = (count + 1) % (max + 1);
		el.textContent = '.'.repeat(count);
	}, interval);
}

// Runs the intro animation: moves and scales the splash logo to the header logo position.
function runIntroAnimation() {
	const body = document.body;
	const splash = document.getElementById('splash');
	const splashLogo = document.getElementById('splashLogo');
	const headerLogo = document.querySelector('.header-logo');

	const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
	if (!splash || reducedMotion) {
		body.classList.remove('loading');
		body.classList.add('intro-finished');
		if (splash) splash.remove();
		return;
	}

	const start = () => {
		// Ensure initial centered splash is painted, measure target position, then kick off the move/shrink.
		requestAnimationFrame(() => {
			if (splashLogo && headerLogo) {
				const targetRect = headerLogo.getBoundingClientRect();
				const splashRect = splashLogo.getBoundingClientRect();

				const targetLeft = targetRect.left + targetRect.width / 2;
				const targetTop = targetRect.top + targetRect.height / 2;
				const targetScale = splashRect.width ? targetRect.width / splashRect.width : 0.34;

				body.style.setProperty('--target-left', `${targetLeft}px`);
				body.style.setProperty('--target-top', `${targetTop}px`);
				body.style.setProperty('--target-scale', `${targetScale}`);
			}

			requestAnimationFrame(() => {
				body.classList.add('intro-running');

				let finished = false;
				const finish = () => {
					if (finished) return;
					finished = true;
					body.classList.add('intro-finished');
					body.classList.remove('loading');
				};

				if (splashLogo) {
					splashLogo.addEventListener(
						'transitionend',
						finish,
						{ once: true }
					);
				}

				if (headerLogo) {
					headerLogo.addEventListener(
						'transitionend',
						() => {
							// Remove splash once the header logo transition ends
							splash?.remove();
						},
						{ once: true }
					);
				}
			});
		});
	}

	setTimeout(start, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
	startDots();
	runIntroAnimation();
});
