<template>
	<div>
		<sub-header title="أذون الإضافة" />

		<div class="q-pa-xl">
			<q-card flat>
				<q-card-section>
					<div class="row justify-end">
						<div class="row" style="gap: 8px">
							<q-btn dense outline color="primary" style="padding: 0 5px">
								<q-img :src="FilterIcon" width="20px" />

								<search-form @filter-change="setFilter($event)" />
							</q-btn>
							<q-btn
								dense
								outline
								color="primary"
								class="q-px-md"
								@click="$router.push('/create')"
							>
								<svg-icon :src="AddIcon" remove-svg-padding size="20px" />
								<span>إضافة جديد</span>
							</q-btn>
						</div>
					</div>
				</q-card-section>
				<q-card-section>
					<q-table :columns="columns" :rows="invoices">
						<template v-slot:bottom> <div></div> </template>
						<template v-slot:body-cell-settings="{ row }">
							<q-td align="center">
								<div>
									<q-btn round dense flat @click="$router.push(`/edit/${row.billNumber}`)">
										<svg-icon :src="EditIcon" remove-svg-padding size="20px" />
									</q-btn>
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
import EditIcon from 'src/assets/icons/edit.svg'
import FilterIcon from 'src/assets/icons/filter.png'
import SvgIcon from 'src/components/svg-icon.vue'
import SearchForm from 'src/components/search-form.vue'
import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'

export default defineComponent({
	name: 'invoices-list',
	components: { SubHeader, SvgIcon, SearchForm },
	data: () => ({
		AddIcon,
		EditIcon,
		FilterIcon,
	}),
	computed: {
		...mapGetters('Invoices', ['invoices']),
		columns() {
			return [
				{ name: 'supplier', label: 'المورد', field: 'supplier' },
				{ name: 'billNumber', label: 'رقم الفاتورة', field: 'billNumber' },
				{
					name: 'billDate',
					label: 'تاريخ الفاتورة',
					field: (row) => date.formatDate(row.billDate, 'DD-MM-YYYY'),
				},
				{ name: 'settings', label: 'الاعدادات', align: 'center' },
			]
		},
	},
	methods: {
		...mapActions('Invoices', ['setFilter']),
	},
})
</script>
