<template>
	<div class="tip-error">
		<img src="@/assets/images/error.png" class="bg" />
		<div class="tip-text">呃…页面呢？</div>
		<div class="tip-text" style="margin-top: 10px">返回首页看看其他好玩的吧</div>
	</div>
</template>

<style scoped lang="scss">
	.tip-error {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.tip-text {
			font-size: 15px;
			font-weight: 400;
			color: #5f667a;
		}
	}

	.bg {
		display: block;
		height: auto;
		max-width: 100%;
		margin-top: 150px;
	}
</style>