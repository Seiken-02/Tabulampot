<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<nav class="bg-primary-light px-4 py-3 rounded-b-2xl">
	<h1 class="text-primary-dark font-bold">{title}</h1>
</nav>