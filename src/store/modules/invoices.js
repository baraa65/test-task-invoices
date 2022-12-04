export default {
	namespaced: true,
	state: {
		filter: { billNumber: '', billDate: null },
		warehousesOptions: [
			{ id: 1, name: 'warehouse 1' },
			{ id: 2, name: 'warehouse 2' },
			{ id: 3, name: 'warehouse 3' },
		],
		itemsOptions: [
			{ id: 1, name: 'item 1' },
			{ id: 2, name: 'item 2' },
			{ id: 3, name: 'item 3' },
		],
		unitsOptions: [
			{ id: 1, name: 'unit 1' },
			{ id: 2, name: 'unit 2' },
			{ id: 3, name: 'unit 3' },
		],
		invoices: [
			{
				supplier: 'المورد',
				billNumber: 'SR 000001',
				billDate: '01-01-2022',
				notes: 'asxasxa sax x',
				items: [
					{
						warehouse: { id: 1, name: 'مخزن' },
						item: { id: 1, name: 'item' },
						unit: { id: 1, name: 'unit' },
						qty: 100,
						validityDate: '01-01-2022',
						notes: 'notes',
					},
					{
						warehouse: { id: 1, name: 'مخزن' },
						item: { id: 1, name: 'item' },
						unit: { id: 1, name: 'unit' },
						qty: 100,
						validityDate: '01-01-2022',
						notes: 'axsxaaxas',
					},
				],
			},
		],
		items: [
			{
				warehouse: { id: 1, name: 'مخزن' },
				item: { id: 1, name: 'item' },
				unit: { id: 1, name: 'unit' },
				qty: 100,
				validityDate: '01-01-2022',
				notes: 'notes',
			},
			{
				warehouse: { id: 1, name: 'مخزن' },
				item: { id: 1, name: 'item' },
				unit: { id: 1, name: 'unit' },
				qty: 100,
				validityDate: '01-01-2022',
				notes: 'axsxaaxas',
			},
		],
	},
	getters: {
		warehousesOptions: (state) => state.warehousesOptions,
		itemsOptions: (state) => state.itemsOptions,
		unitsOptions: (state) => state.unitsOptions,
		items: (state) => state.items,
		invoices: (state) =>
			state.invoices.filter((invoice) => {
				const { billNumber, billDate } = state.filter

				if (billNumber && invoice.billNumber != billNumber) return false
				if (billDate && invoice.billDate != billDate) return false

				return true
			}),
	},
	mutations: {
		setFilter(state, val) {
			state.filter = { ...val }
		},
		addRow(state, val) {
			state.items.push(val)
		},
		addInvoice(state, val) {
			state.invoices.push(val)
		},
		editInvoice(state, val) {
			state.invoices = state.invoices.map((invoice) =>
				invoice.billNumber == val.billNumber ? val : invoice,
			)
		},
	},
	actions: {
		setFilter({ commit }, filter) {
			commit('setFilter', filter)
		},
		generateBillNumber({ state }) {
			const { invoices } = state

			if (invoices.length) {
				let lastBillNumber = invoices[invoices.length - 1].billNumber
				let numberStr = (parseInt(lastBillNumber.slice(2)) + 1).toString()

				return `SR ${new Array(6 - numberStr.length).fill('0').join('')}${numberStr}`
			} else {
				return 'SR 000001'
			}
		},
		saveRow({ commit }, form) {
			commit('addRow', form)
		},
		getInvoice({ state }, billNumber) {
			const { invoices } = state

			let invoice = invoices.find((invoice) => invoice.billNumber == billNumber)

			return invoice ? { ...invoice } : null
		},
		addInvoice({ commit }, form) {
			commit('addInvoice', form)
		},
		editInvoice({ commit }, form) {
			commit('editInvoice', form)
		},
	},
}
