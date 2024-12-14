<script>
  import toast, { Toaster } from "svelte-french-toast";
</script>

<button
  aria-label="click para hola"
  on:click={() => {
    toast.success("hola mundo");
  }}
>
probar botob
</button>
