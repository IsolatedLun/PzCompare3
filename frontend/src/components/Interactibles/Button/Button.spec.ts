import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Button from './Button.svelte';

test('Render a <Button />', () => {
	render(Button, { props: 
        { 
            attachments: ['hologram', 'big-pad']
        } 
    });

	const buttonEl = document.querySelector('button[data-attachments="hologram,big-pad"]');
    expect(buttonEl).toBeTruthy();
});