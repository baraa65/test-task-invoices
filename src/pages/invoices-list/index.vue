<template>
	<div>
		<sub-header title="أذون الإضافة" />

		<div style="padding: 25px">
			<q-card flat style="border-radius: 12px;">
				<q-card-section style="padding: 24px">
					<div class="row justify-end" style="padding-top: 10px">
						<div class="row" style="gap: 8px">
							<q-btn class="btn" dense outline color="primary" style="padding: 0 7px">
								<q-img :src="FilterIcon" width="20px" />

								<search-form @filter-change="setFilter($event)" />
							</q-btn>
							<q-btn
                class="btn"
								dense
								outline
								color="primary"
								@click="$router.push('/create')"
							>
								<svg-icon :src="AddIcon" remove-svg-padding size="24px" style="margin-left: 4px"/>
								<span>إضافة جديد</span>
							</q-btn>
						</div>
					</div>
				</q-card-section>
				<q-card-section>
					<q-table flat :columns="columns" :rows="invoices">
						<template v-slot:bottom> <div></div> </template>
						<template v-slot:body-cell-settings="{ row }">
							<q-td align="center">
								<div>
									<q-btn class="btn" round dense flat @click="$router.push(`/edit/${row.billNumber}`)">
										<svg-icon :src="EditIcon" remove-svg-padding size="24px" />
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
