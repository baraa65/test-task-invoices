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
					<q-table :columns="columns" :rows="rows">
						<template v-slot:bottom> <div></div> </template>
						<template v-slot:body-cell-settings="props">
							<q-td align="center">
								<div>test</div>
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

export default defineComponent({
	name: 'invoices-list',
	components: { SubHeader, SvgIcon },
	data: () => ({
		AddIcon,
		FilterIcon,
		rows: [
			{ supply: 'المورد', supplier: 'المورد', billNumber: 'SR 000001', billDate: '01-01-2022' },
			{ supply: 'المورد', supplier: 'المورد', billNumber: 'SR 000001', billDate: '01-01-2022' },
			{ supply: 'المورد', supplier: 'المورد', billNumber: 'SR 000001', billDate: '01-01-2022' },
		],
	}),
	computed: {
		columns() {
			return [
				{ name: 'supply', label: 'المورد', field: 'supply' },
				{ name: 'supplier', label: 'المورد', field: 'supplier' },
				{ name: 'billNumber', label: 'رقم الفاتورة', field: 'billNumber' },
				{ name: 'billDate', label: 'تاريخ الفاتورة', field: 'billDate' },
				{ name: 'settings', label: 'الاعدادات', align: 'center' },
			]
		},
	},
})
</script>
