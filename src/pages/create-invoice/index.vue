<template>
	<div>
		<sub-header title="أذون الإضافة" />

		<div class="q-pa-xl">
			<q-card flat>
				<q-card-section>
					<div class="row" style="gap: 8px">
						<div class="col">
							<div>رقم الاذن التسلسلي</div>
							<div>
								<q-input class="full-width" dense outlined readonly />
							</div>
						</div>
						<div class="col">
							<div>التاريخ</div>
							<div>
								<q-input class="full-width" dense outlined />
							</div>
						</div>
						<div class="col">
							<div>اسم المورد</div>
							<div>
								<q-input class="full-width" dense outlined />
							</div>
						</div>
						<div class="col">
							<div>ملاحظات</div>
							<div>
								<q-input class="full-width" dense outlined />
							</div>
						</div>
					</div>
				</q-card-section>
				<q-card-section>
					<div>جدول الأصناف</div>
					<q-table :columns="columns" :rows="rows">
						<template v-slot:bottom> <div></div> </template>
						<template v-slot:body-cell-warehouse="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-select
										v-model="form.warehouse"
										:options="warehousesOptions"
										option-label="name"
										option-value="id"
										dense
										outlined
										:rules="['']"
										style="min-width: 120px"
									/>
								</div>
								<div v-else>{{ row.warehouse.name }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-item="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-select
										v-model="form.item"
										:options="itemsOptions"
										option-label="name"
										option-value="id"
										dense
										outlined
										:rules="['']"
										style="min-width: 120px"
									/>
								</div>
								<div v-else>{{ row.item.name }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-unit="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-select
										v-model="form.unit"
										:options="unitsOptions"
										option-label="name"
										option-value="id"
										dense
										outlined
										:rules="['']"
										style="min-width: 120px"
									/>
								</div>
								<div v-else>{{ row.unit.name }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-qty="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-input v-model="form.qty" type="number" dense outlined :rules="['']" />
								</div>
								<div v-else>{{ row.qty }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-validity-date="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-input
										dense
										outlined
										v-model="form.validityDate"
										mask="date"
										:rules="['date']"
										style="min-width: 120px"
									>
										<template v-slot:append>
											<q-icon color="primary" name="event" class="cursor-pointer">
												<q-popup-proxy
													cover
													transition-show="scale"
													transition-hide="scale"
												>
													<q-date v-model="form.validityDate">
														<div class="row items-center justify-end">
															<q-btn
																v-close-popup
																label="Close"
																color="primary"
																flat
															/>
														</div>
													</q-date>
												</q-popup-proxy>
											</q-icon>
										</template>
									</q-input>
								</div>
								<div v-else>{{ row.validityDate }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-notes="{ row }">
							<q-td>
								<div v-if="row.form">
									<q-input v-model="form.notes" dense outlined :rules="['']" />
								</div>
								<div v-else>{{ row.notes }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-delete="{ row }">
							<q-td align="center">
								<div v-if="row.form">
									<q-btn flat round icon="save" @click="handleSaveRow()" />
								</div>
								<div v-else>
									<q-btn flat round icon="delete" />
								</div>
							</q-td>
						</template>
					</q-table>
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import SubHeader from 'src/components/sub-header.vue'
import AddIcon from 'src/assets/icons/add.svg'
import FilterIcon from 'src/assets/icons/filter.png'
import SvgIcon from 'src/components/svg-icon.vue'
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'

const rowForm = () => ({
	warehouse: null,
	item: null,
	unit: null,
	qty: 1,
	validityDate: date.formatDate(new Date(), 'YYYY/MM/DD'),
	notes: '',
})

export default defineComponent({
	name: 'invoices-list',
	components: { SubHeader, SvgIcon },
	data: () => ({
		AddIcon,
		FilterIcon,
		mode: 'add',
		form: rowForm(),
	}),
	computed: {
		...mapGetters('Invoices', ['warehousesOptions', 'itemsOptions', 'unitsOptions', 'items']),
		columns() {
			return [
				{ name: 'delete', label: 'حذف', align: 'center' },
				{ name: 'warehouse', label: 'المخزن', field: 'warehouse' },
				{ name: 'item', label: 'اسم الصنف', field: 'item' },
				{ name: 'unit', label: 'الوحدة', field: 'unit' },
				{ name: 'qty', label: 'الكمية', field: 'qty' },
				{ name: 'validity-date', label: 'تاريخ الصلاحية', field: 'validityDate' },
				{ name: 'notes', label: 'الملاحظات', field: 'notes' },
			]
		},
		rows() {
			return [...this.items, { form: true }]
		},
	},
	methods: {
		...mapActions('Invoices', ['saveRow']),
		handleSaveRow() {
			this.saveRow(this.form)
		},
		resetRowForm() {
			this.form = rowForm()
		},
	},
})
</script>
