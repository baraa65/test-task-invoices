<template>
	<div dir="ltr" :style="containerStyle" :class="`text-${color} flex justify-center items-center`">
		<inline-svg
			@loaded="showLoader = false"
			:src="src"
			:height="size ? size : height ? height : 50"
			:width="size ? size : width ? width : 50"
			:class="[
				{ border, round, 'circle-svg': circle },
				classes,
				removeSvgPadding ? '' : 'q-pa-sm',
				mappedBackgroundColor,
			]"
		/>
		<q-circular-progress
			v-if="showLoader"
			:thickness="loaderThickness"
			:size="loaderSize"
			indeterminate
			color="primary"
		/>
	</div>
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
	name: 'svg-icon',
	props: {
		src: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: '',
		},
		backgroundColor: {
			type: String,
			default: '',
		},
		size: {
			type: [Number, String],
		},
		height: {
			type: [Number, String],
		},
		width: {
			type: [Number, String],
		},
		border: {
			type: Boolean,
			default: false,
		},
		round: {
			type: Boolean,
			default: false,
		},
		circle: {
			type: Boolean,
			default: false,
		},
		classes: {
			type: [String, Array],
			default: '',
		},
		removeSvgPadding: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		InlineSvg,
	},
	data() {
		return {
			showLoader: true,
		}
	},
	computed: {
		mappedBackgroundColor() {
			const color = this.backgroundColor.split(' ')[0]
			if (color) {
				return 'bg-' + color
			}
			return ''
		},
		loaderSize() {
			let sizeOrHeight = this.size ?? this.height
			if (typeof sizeOrHeight === 'string') {
				if (sizeOrHeight?.includes('px')) {
					sizeOrHeight = sizeOrHeight.replace('px', '')
				}
			}

			return (sizeOrHeight ? (sizeOrHeight / 5 > 15 ? sizeOrHeight / 5 : 15) : '50') + 'px'
		},
		loaderThickness() {
			let sizeOrHeight = this.size ?? this.height
			if (typeof sizeOrHeight === 'string') {
				if (sizeOrHeight?.includes('px')) {
					sizeOrHeight = sizeOrHeight.replace('px', '')
				}
			}
			return sizeOrHeight < 25 ? 0.15 : 0.3
		},
		containerStyle() {
			let sizeOrHeight = this.size ?? this.height
			let sizeOrWidth = this.size ?? this.width
			if (typeof sizeOrHeight === 'string') {
				if (sizeOrHeight?.includes('px')) {
					sizeOrHeight = sizeOrHeight.replace('px', '')
				}
			}
			if (typeof sizeOrWidth === 'string') {
				if (sizeOrWidth?.includes('px')) {
					sizeOrWidth = sizeOrWidth.replace('px', '')
				}
			}
			return `
				height: ${sizeOrHeight}px;
				width: ${sizeOrWidth}px;
			`
		},
	},
}
</script>

<style lang="scss" scoped>
.border {
	border: 1px solid $primary;
}

.round {
	border-radius: 5px;
}

.circle-svg {
	border-radius: 50%;
}
</style>
