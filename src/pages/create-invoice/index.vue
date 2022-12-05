<template>
	<div>
		<sub-header :title="isEdit ? 'تعديل الاذن' : 'إضافة جديد'">
			<div>
				<q-btn
					:label="isEdit ? 'تعديل' : 'إضافة'"
					color="primary"
					@click="$refs['form-btn'].click()"
				/>
			</div>
		</sub-header>

		<div class="q-pa-xl">
			<q-card flat>
				<q-card-section>
					<Form @submit="handleSubmit()" class="row" style="gap: 8px">
						<button v-show="false" type="submit" ref="form-btn" />
						<div class="col">
							<div>رقم الاذن التسلسلي</div>
							<div>
								<Field
									v-model="invoiceForm.billNumber"
									name="billNumber"
									class="full-width"
									readonly
								/>
							</div>
						</div>
						<div class="col">
							<div>التاريخ</div>
							<div>
								<div class="date-field">
									<Field
										v-model="billDateModel"
										name="billDate"
										style="flex: 1"
										:rules="[isRequired]"
									/>
									<q-icon color="primary" name="event" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-date v-model="billDateModel" mask="DD-MM-YYYY">
												<div class="row items-center justify-end">
													<q-btn v-close-popup label="Close" color="primary" flat />
												</div>
											</q-date>
										</q-popup-proxy>
									</q-icon>
								</div>
								<ErrorMessage name="billDate" />
							</div>
						</div>
						<div class="col">
							<div>اسم المورد</div>
							<div>
								<Field
									v-model="invoiceForm.supplier"
									class="full-width"
									name="supplier"
									:rules="[isRequired]"
								/>
								<ErrorMessage name="supplier" />
							</div>
						</div>
						<div class="col">
							<div>ملاحظات</div>
							<div>
								<Field v-model="invoiceForm.notes" class="full-width" name="notes" />
							</div>
						</div>
					</Form>
				</q-card-section>
				<q-card-section>
					<div>جدول الأصناف</div>
					<Form @submit="handleSaveRow()">
						<q-table :columns="columns" :rows="rows">
							<template v-slot:bottom> <div></div> </template>
							<template v-slot:body-cell-warehouse="{ row }">
								<q-td>
									<div v-if="row.form">
										<Field
											v-model="warehouseModel"
											name="warehouse"
											as="select"
											:rules="[isRequired]"
											v-slot="{ value }"
                      style="width: 150px"
										>
											<option
												v-for="w in warehousesOptions"
												:key="w.id"
												:value="w.id"
												:selected="value && value.id == w.id"
											>
												{{ w.name }}
											</option>
										</Field>
										<div>
											<ErrorMessage name="warehouse" />
										</div>
									</div>
									<div v-else>{{ row.warehouse.name }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-item="{ row }">
								<q-td>
									<div v-if="row.form">
										<Field
											v-model="itemModel"
											name="item"
											as="select"
											:rules="[isRequired]"
											v-slot="{ value }"
                      style="width: 150px"
										>
											<option
												v-for="w in itemsOptions"
												:key="w.id"
												:value="w.id"
												:selected="value && value.id == w.id"
											>
												{{ w.name }}
											</option>
										</Field>
										<div>
											<ErrorMessage name="item" />
										</div>
									</div>
									<div v-else>{{ row.item.name }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-unit="{ row }">
								<q-td>
									<div v-if="row.form">
										<Field
											v-model="unitModel"
											name="unit"
											as="select"
											:rules="[isRequired]"
											v-slot="{ value }"
                      style="width: 150px"
										>
											<option
												v-for="w in unitsOptions"
												:key="w.id"
												:value="w.id"
												:selected="value && value.id == w.id"
											>
												{{ w.name }}
											</option>
										</Field>
										<div>
											<ErrorMessage name="unit" />
										</div>
									</div>
									<div v-else>{{ row.unit.name }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-qty="{ row }">
								<q-td>
									<div v-if="row.form">
										<Field
											v-model="form.qty"
											name="qty"
											type="number"
											:rules="[isRequired, minValue]"
										/>
										<div>
											<ErrorMessage name="qty" />
										</div>
									</div>
									<div v-else>{{ row.qty }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-validity-date="{ row }">
								<q-td>
									<div v-if="row.form">
										<div class="date-field">
											<Field
												v-model="validityDateModel"
												name="validityDate"
												style="flex: 1"
												:rules="[isRequired]"
											/>
											<q-icon color="primary" name="event" class="cursor-pointer">
												<q-popup-proxy
													cover
													transition-show="scale"
													transition-hide="scale"
												>
													<q-date v-model="validityDateModel" mask="DD-MM-YYYY">
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
										</div>
										<ErrorMessage name="validityDate" />
									</div>
									<div v-else>{{ formatDate(row.validityDate) }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-notes="{ row }">
								<q-td>
									<div v-if="row.form">
										<Field v-model="form.notes" name="notes" />
									</div>
									<div v-else>{{ row.notes }}</div>
								</q-td>
							</template>
							<template v-slot:body-cell-delete="{ row }">
								<q-td align="center">
									<div v-if="row.form">
										<q-btn flat round icon="save" type="submit" />
									</div>
									<div v-else>
										<q-btn flat round icon="delete" />
									</div>
								</q-td>
							</template>
						</q-table>
					</Form>

					<div class="q-pt-lg">
						<q-btn dense outline color="primary" class="q-px-md" @click="mode = 'add'">
							<svg-icon :src="AddIcon" remove-svg-padding size="20px" />
							<span>إضافة جديد</span>
						</q-btn>
					</div>
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
import { Form, ErrorMessage, Field } from 'vee-validate'
import { isRequired, minValue } from 'src/utils/validators'

const rowForm = () => ({
	warehouse: null,
	item: null,
	unit: null,
	qty: 1,
	validityDate: new Date().toISOString(),
	notes: '',
})

const invoiceForm = () => ({
	supplier: '',
	billNumber: '',
	billDate: '',
	notes: '',
	items: [],
})

export default defineComponent({
	name: 'invoices-list',
	props: {
		billNumber: String,
	},
	components: { SubHeader, SvgIcon, Form, ErrorMessage, Field },
	data: () => ({
		AddIcon,
		FilterIcon,
		mode: 'view',
		form: rowForm(),
		invoiceForm: invoiceForm(),
	}),
	async created() {
		if (this.billNumber) {
			let form = await this.getInvoice(this.billNumber)

			if (form) this.invoiceForm = form
			else this.$router.push('/')
		} else {
			this.invoiceForm.billNumber = await this.generateBillNumber()
		}
	},
	computed: {
		...mapGetters('Invoices', ['warehousesOptions', 'itemsOptions', 'unitsOptions', 'items']),
		isEdit() {
			return !!this.billNumber
		},
		validityDateModel: {
			get() {
				return date.formatDate(this.form.validityDate, 'DD-MM-YYYY')
			},
			set(val) {
				this.form.validityDate = date.extractDate(val, 'DD-MM-YYYY').toISOString()
			},
		},
		billDateModel: {
			get() {
				return date.formatDate(this.invoiceForm.billDate, 'DD-MM-YYYY')
			},
			set(val) {
				this.invoiceForm.billDate = date.extractDate(val, 'DD-MM-YYYY').toISOString()
			},
		},
		warehouseModel: {
			get() {
				return this.form.warehouse?.id || null
			},
			set(val) {
				this.form.warehouse = this.warehousesOptions.find((w) => w.id == val)
			},
		},
		itemModel: {
			get() {
				return this.form.item?.id || null
			},
			set(val) {
				this.form.item = this.itemsOptions.find((w) => w.id == val)
			},
		},
		unitModel: {
			get() {
				return this.form.unit?.id || null
			},
			set(val) {
				this.form.unit = this.unitsOptions.find((w) => w.id == val)
			},
		},
		columns() {
			return [
				{ name: 'delete', label: 'حذف', align: 'center' },
				{ name: 'warehouse', label: 'المخزن', field: 'warehouse' },
				{ name: 'item', label: 'اسم الصنف', field: 'item' },
				{ name: 'unit', label: 'الوحدة', field: 'unit' },
				{ name: 'qty', label: 'الكمية', field: 'qty' },
				{ name: 'validity-date', label: 'تاريخ الصلاحية' },
				{ name: 'notes', label: 'الملاحظات', field: 'notes' },
			]
		},
		rows() {
			return [...this.invoiceForm.items, { form: this.mode == 'add' }].filter(
				(item) => item.form !== false,
			)
		},
	},
	methods: {
		isRequired,
		minValue: minValue(1),
		...mapActions('Invoices', [
			'generateBillNumber',
			'saveRow',
			'addInvoice',
			'getInvoice',
			'editInvoice',
		]),
		handleSaveRow() {
			this.invoiceForm.items.push(this.form)
			this.form = rowForm()
			this.mode = 'view'
		},
		async handleAddInvoice() {
			if (this.isEdit) {
				await this.editInvoice(this.invoiceForm)
			} else {
				await this.addInvoice(this.invoiceForm)
			}
			this.$router.push('/')
		},
		formatDate(d) {
			return date.formatDate(d, 'DD-MM-YYYY')
		},
		async handleSubmit() {
			if (this.isEdit) {
				await this.editInvoice(this.invoiceForm)
			} else {
				await this.addInvoice(this.invoiceForm)
			}
			this.$router.push('/')
		},
	},
})
</script>
