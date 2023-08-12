<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import type { FileInputTypes, FileInputVariants } from './types';

	onMount(() => {
		id = crypto.randomUUID();
		use(inputEl!);
	});

	function handleInput() {
		if (inputEl.files) {
			fileName = inputEl.files[0].name;

			if (fileType === 'image') {
				dispatch('preview', URL.createObjectURL(inputEl.files[0]));
			}

			dispatch('input', inputEl);
			dispatch('file', inputEl.files[0]);
		}
	}

	export let id: string = '';
	export let use: (_this: HTMLElement) => void = () => null;
	export let cls = cubeCss('', '', '');
	export let fileType: FileInputTypes = 'any';
	export let variant: FileInputVariants = 'primary';
	export let disabled = false;

	let inputEl: HTMLInputElement;
	let fileName = 'Empty file';

	const _class = cls.extend(
		'',
		'input-container drag-drop-input-container',
		'pos-relative width-100'
	);
	const dispatch = createEventDispatcher();
</script>

<div class={_class.toString()} data-variant={variant} data-disabled={disabled}>
	<label for={id} class="[ display-block input ]">
        <input
            bind:this={inputEl}
            {id}
            on:input={handleInput}
            type="file"
			data-file-type={fileType} 
        />
	</label>
</div>