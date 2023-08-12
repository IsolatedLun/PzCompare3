import { act, render, screen } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import TextInput from './TextInput.svelte';
import FileInput from './FileInput.svelte';

test('Render a <TextInput />', () => {
	render(TextInput, { props: 
        { 
            label: "Email address", 
            showLabel: true, 
            placeholder: 'Enter email address',
        } 
    });

	const inputEl = document.querySelector('.input');
    expect(inputEl).toBeTruthy();

    const label = document.querySelector('label');
    expect(label?.textContent).toEqual("Email address");
});

test('Render a <FileInput />', () => {
	render(FileInput, { props: 
        { 
            fileType: 'image'
        } 
    });

	const fileInputEl = document.querySelector('input[data-file-type="image"]');
    expect(fileInputEl).toBeTruthy();
});