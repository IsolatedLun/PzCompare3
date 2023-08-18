import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Card from './Card.svelte';

test('Render a <Card /> component', () => {
	render(Card, { props:   
        { 
            variant: 'muted-light', 
            padding: 2
        } 
    });

	const card = document.querySelector('.card[data-variant="muted-light"]');
    expect(card).toBeTruthy();
});