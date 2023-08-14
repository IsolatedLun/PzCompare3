export function openModal(id: string) {
    (document.getElementById(id) as HTMLDialogElement).showModal();
}