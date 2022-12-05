<template>
	<q-popup-proxy>
		<q-card dir="rtl">
			<q-card-section>
				<div class="q-pb-sm">
					<div class="q-pb-sm">
						<div class="q-pb-xs">رقم الاذن التسلسلي</div>
						<Field v-model="filter.billNumber" style="width: 250px" />
					</div>
					<div class="q-pb-sm">
						<div class="q-pb-xs">تاريخ</div>
						<div class="date-field">
              <Field v-model="filter.billDate" name="validityDate" style="flex: 1" />
							<q-icon color="primary" name="event" class="cursor-pointer" size="24px">
								<q-popup-proxy cover transition-show="scale" transition-hide="scale">
									<q-date v-model="filter.billDate" mask="DD-MM-YYYY">
										<div class="row items-center justify-end">
											<q-btn v-close-popup label="Close" color="primary" flat />
										</div>
									</q-date>
								</q-popup-proxy>
							</q-icon>
						</div>
					</div>
				</div>

				<div class="row justify-start" style="gap: 8px">
					<q-btn
						unelevated
						class="btn"
						v-close-popup
						label="تطبيق"
						dense
						color="primary"
						@click="handleApply()"
					/>
					<q-btn class="btn" v-close-popup label="الغاء" dense flat @click="handleReset()" />
				</div>
			</q-card-section>
		</q-card>
	</q-popup-proxy>
</template>

<script>
import { Field } from 'vee-validate'
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
	components: { Field },
})
</script>
