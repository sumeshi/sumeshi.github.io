<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    id: string;
    labelledBy: string;
    className?: string;
    onClose: () => void;
    children: Snippet;
  };

  let { open, id, labelledBy, className = '', onClose, children }: Props = $props();
  let dialog: HTMLDialogElement;

  $effect(() => {
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  });

  function closeFromBackdrop(event: MouseEvent): void {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const insideDialog =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (!insideDialog) dialog.close();
  }

  function trapTab(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

<dialog
  bind:this={dialog}
  {id}
  tabindex="-1"
  aria-labelledby={labelledBy}
  class={`site-dialog m-auto w-[calc(100%-2rem)] p-6 text-left ${className}`}
  onclose={onClose}
  onclick={closeFromBackdrop}
  onkeydown={trapTab}
>
  {@render children()}
</dialog>
