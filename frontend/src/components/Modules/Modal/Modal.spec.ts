import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Modal from './Modal.svelte';
import { openModal } from './utils';

test('Render a <Numeric /> that is 158890 => 158.89K', () => {
	const { getByText } = render(Modal, { props: { id: 'modal' } });

    const modal = document.querySelector('dialog#modal') as HTMLDialogElement;
	expect(modal.getAttribute('open')).toBeFalsy();

    openModal('modal');
    expect(modal.getAttribute('open')).toBe('');
});