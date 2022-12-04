export default {
	namespaced: true,
	state: {
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
	},
	mutations: {
		addRow(state, val) {
			state.items.push(val)
		},
	},
	actions: {
		saveRow({ commit }, form) {
			commit('addRow', form)
		},
	},
}
