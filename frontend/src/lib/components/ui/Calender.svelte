<script lang="ts">
	import Card from './Card.svelte';
	import type { Snippet } from 'svelte';

	export interface DayMarker {
		dots?: ('primary' | 'accent')[];
		emoji?: string;
	}

	interface Props {
		namaBulan: string;
		days: (number | null)[];
		filledDay?: number; 
		ringDay?: number;  
		getMarkers?: (day: number) => DayMarker;
		legend?: Snippet;
	}

	let { namaBulan, days, filledDay, ringDay, getMarkers, legend }: Props = $props();
</script>

<h2 class="calendar-title">{namaBulan}</h2>
<Card>
	<div class="calendar-weekdays">
		<span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
	</div>

	<div class="calendar-grid">
		{#each days as day, i (i)}
			{#if day === null}
				<div></div>
			{:else}
				{@const marker = getMarkers?.(day) ?? {}}
				<div class="calendar-day">
					<span
						class="day-number"
						class:filled={day === filledDay}
						class:ringed={day === ringDay && day !== filledDay}
					>
						{day}
					</span>
					<div class="day-markers">
                        {#if marker.emoji}
                            <span class="day-emoji">{marker.emoji}</span>
                        {/if}
                        {#each marker.dots ?? [] as dot, i (i)}
                            <span class="day-dot {dot}"></span>
                        {/each}
                    </div>
				</div>
			{/if}
		{/each}
	</div>

	{#if legend}
		<div class="calendar-legend">
			{@render legend()}
		</div>
	{/if}
</Card>

<style>
	.calendar-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
		text-transform: capitalize;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.calendar-weekdays,
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		row-gap: 0.5rem;
		text-align: center;
	}

	.calendar-weekdays {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
	}

	.calendar-grid {
		font-size: 0.875rem;
	}

	.calendar-day {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.day-number {
		width: 1.75rem;
		height: 1.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		transition: background-color 0.2s ease;
	}

	.day-number.filled {
		background-color: var(--color-primary);
		color: var(--color-white);
		font-weight: 500;
	}

	.day-number.ringed {
		box-shadow: 0 0 0 2px var(--color-primary);
		color: var(--color-primary);
		font-weight: 500;
	}

	.day-markers {
		display: flex;
		align-items: center;
		gap: 0.125rem;
		height: 0.5rem;
	}

	.day-emoji {
		font-size: 9px;
		line-height: 1;
	}

	.day-dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 9999px;
	}

	.day-dot.primary {
		background-color: var(--color-primary);
	}

	.day-dot.accent {
		background-color: var(--color-accent);
	}

	.calendar-legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		column-gap: 1rem;
		row-gap: 0.25rem;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-surface-muted);
		font-size: 10px;
		color: var(--color-text-muted);
	}
</style>