<template>
	<div>
		<sub-header :title="isEdit ? 'تعديل الاذن' : 'إضافة جديد'">
			<div>
				<q-btn
					class="btn"
					unelevated
					:label="isEdit ? 'تعديل' : 'إضافة'"
					color="primary"
					@click="$refs['form-btn'].click()"
					style="padding: 5px 40px"
				/>
			</div>
		</sub-header>

		<div style="padding: 25px">
			<q-card flat style="border-radius: 12px">
				<q-card-section style="padding: 24px">
					<Form @submit="handleSubmit()" class="row" style="gap: 8px; padding-top: 10px">
						<button v-show="false" type="submit" ref="form-btn" />
						<div class="col">
							<div class="text-bold" style="padding-bottom: 8px; font-size: 14px">
								رقم الاذن التسلسلي
							</div>
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
							<div class="text-bold" style="padding-bottom: 8px; font-size: 14px">
								التاريخ
							</div>
							<div>
								<div class="date-field">
									<Field
										v-model="billDateModel"
										name="billDate"
										style="flex: 1"
										:rules="[isRequired]"
									/>
									<q-icon color="primary" name="event" class="cursor-pointer" size="24px">
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
							<div class="text-bold" style="padding-bottom: 8px; font-size: 14px">
								اسم المورد
							</div>
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
							<div class="text-bold" style="padding-bottom: 8px; font-size: 14px">
								ملاحظات
							</div>
							<div>
								<Field v-model="invoiceForm.notes" class="full-width" name="notes" />
							</div>
						</div>
					</Form>
				</q-card-section>
				<q-card-section style="padding: 20px 24px">
					<div class="subtitle text-bold" style="padding-bottom: 25px">جدول الأصناف</div>
					<Form @submit="handleSaveRow()">
						<q-table flat :columns="columns" :rows="rows">
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
											<q-icon
												color="primary"
												name="event"
												class="cursor-pointer"
												size="24px"
											>
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
										<q-btn dense flat round icon="save" type="submit" />
									</div>
									<div v-else>
										<q-btn dense flat round @click="deleteItem(row)">
											<SvgIcon :src="DeleteIcon" size="24px" remove-svg-padding />
										</q-btn>
									</div>
								</q-td>
							</template>

							<template v-slot:no-data>
								<div class="text-center q-py-md full-width" style="font-size: 14px">لا توجد بيانات</div>
							</template>
						</q-table>
					</Form>

					<div class="q-pt-lg">
						<q-btn class="btn" dense outline color="primary" @click="mode = 'add'">
							<svg-icon :src="AddIcon" remove-svg-padding size="24px" />
							<span>إضافة صنف</span>
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
import DeleteIcon from 'src/assets/icons/delete.svg'
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
		DeleteIcon,
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
		...mapGetters('Invoices', ['warehousesOptions', 'itemsOptions', 'unitsOptions']),
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
				{ name: 'notes', label: 'ملاحظات', field: 'notes' },
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
		deleteItem(row) {
			this.invoiceForm.items = this.invoiceForm.items.filter((item) => item != row)
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
