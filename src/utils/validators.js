export const isRequired = (value) => {
	return !!value || 'هذا الحقل مطلوب'
}

export const minValue = (min) => {
	return (value) => {
		return value >= min || `قيمة هذا الحقل يجب ان تكون اكبر من ${min - 1}`
	}
}
