import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Numeric from './Numeric.svelte';

test('Render a <Numeric /> that is 158890 => 158.89K', () => {
	const { getByText } = render(Numeric, { props: { value: 158890 } });

	expect(getByText('158.89K')).toBeTruthy();
});