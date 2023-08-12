import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Icon from './Icon.svelte';

test('Render a trash <Icon /> that has an aria label of "Remove item"', () => {
	render(Icon, { props: { ariaLabel: "Remove item" } });

	const ariaLabel = document.querySelector('[aria-label="Remove item"]');
    expect(ariaLabel).toBeTruthy();
});