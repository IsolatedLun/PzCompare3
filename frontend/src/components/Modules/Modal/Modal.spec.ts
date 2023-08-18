import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Modal from './Modal.svelte';
import { openModal } from './utils';

test('Render a <Modal />', () => {
	const { getByText } = render(Modal, { props: { id: 'modal' } });

    const modal = document.querySelector('dialog') as HTMLDialogElement;
	expect(modal.getAttribute('open')).toBeFalsy();

    modal.showModal();
    expect(modal.getAttribute('open')).toBe('');
});