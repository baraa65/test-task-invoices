<template>
	<q-popup-proxy>
		<q-card>
			<q-card-section>
				<div class="q-pb-sm">
					<div class="q-pb-sm">
						<div class="q-pb-xs">رقم الاذن التسلسلي</div>
						<q-input v-model="filter.billNumber" dense outlined style="width: 250px" />
					</div>
					<div class="q-pb-sm">
						<div class="q-pb-xs">تاريخ</div>
						<q-input
							dense
							outlined
							v-model="filter.billDate"
							mask="date"
							:rules="['date']"
							style="width: 250px"
						>
							<template v-slot:append>
								<q-icon color="primary" name="event" class="cursor-pointer">
									<q-popup-proxy cover transition-show="scale" transition-hide="scale">
										<q-date v-model="filter.billDate">
											<div class="row items-center justify-end">
												<q-btn v-close-popup label="Close" color="primary" flat />
											</div>
										</q-date>
									</q-popup-proxy>
								</q-icon>
							</template>
						</q-input>
					</div>
				</div>

				<div class="row justify-start" style="gap: 8px">
					<q-btn
						v-close-popup
						label="تطبيق"
						class="q-px-md"
						dense
						color="primary"
						@click="handleApply()"
					/>
					<q-btn
						v-close-popup
						label="الغاء"
						class="q-px-md"
						dense
						flat
						@click="handleReset()"
					/>
				</div>
			</q-card-section>
		</q-card>
	</q-popup-proxy>
</template>

<script>
import { defineComponent } from 'vue'

const filter = () => ({ billNumber: '', billDate: null })

export default defineComponent({
	data: () => ({ filter: filter() }),
	methods: {
		handleApply() {
			this.$emit('filter-change', this.filter)
		},
		handleReset() {
			this.filter = filter()
			this.$emit('filter-change', this.filter)
		},
	},
})
</script>
