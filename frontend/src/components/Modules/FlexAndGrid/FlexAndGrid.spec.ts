import { act, render } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import Flex from './Flex.svelte';
import Grid from './Grid.svelte';

test('Render a <Flex /> component', () => {
	render(Flex, { props: 
        { 
            justify: 'start', align: 'center', tag: 'section', alignCenterOnMobile: true
        } 
    });

	const flexEl = document.querySelector('section[data-center-on-mobile=true]');
    expect(flexEl).toBeTruthy();
});

test('Render a <Grid /> component', () => {
	render(Grid, { props: 
        { 
            tag: 'main', columns: 5
        } 
    });

	const gridEl = document.querySelector('main[data-center-on-mobile=true]')!;
    expect(gridEl).toBeTruthy();

    const contains5Columns = gridEl.classList.contains('grid-template-columns-5');
    expect(contains5Columns).toBe(true);
});