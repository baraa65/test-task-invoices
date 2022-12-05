<template>
	<div class="row items-center justify-between" style="background: white; padding: 0 30px 0 24px; height: 50px;">
		<div class="subtitle text-bold">{{ title }}</div>
		<div>
			<slot />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: String,
	},
})
</script>
