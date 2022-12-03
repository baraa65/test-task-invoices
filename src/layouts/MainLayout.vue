<template>
	<q-layout view="lHh Lpr lFf" dir="rtl">
		<q-header style="height: 80px; background: #ef5b0c">
			<q-toolbar>
				<div class="title">المستودعات</div>

				<div>أذون الإضافة</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MainLayout',

	components: {},

	setup() {
		return {}
	},
})
</script>
