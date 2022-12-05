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
		invoices: [],
	},
	getters: {
		warehousesOptions: (state) => state.warehousesOptions,
		itemsOptions: (state) => state.itemsOptions,
		unitsOptions: (state) => state.unitsOptions,
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
