<template>
	<div style="background: white">
		<div>{{ title }}</div>
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
