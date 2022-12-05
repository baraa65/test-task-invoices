<template>
	<q-layout view="lHh Lpr lFf" dir="rtl">
		<q-header class="row justify-between" style="padding: 20px 30px 20px 50px; background: #ef5b0c">
			<div class="row items-center">
				<div class="title text-bold" style="padding-left: 24px">المستودعات</div>

				<div class="text-medium">أذون الإضافة</div>
			</div>

      <div class="user">
        <span>S</span>
      </div>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MainLayout',

	components: {},

	setup() {
		return {}
	},
})
</script>

<style lang="scss" scoped>
.user {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #FFFFFF1F 0% 0% no-repeat padding-box;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>
