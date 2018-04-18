<template>
<div class="list-group list-group-underline list-group-lg">
	<router-link v-for="rv in list" :key="rv.id" :to="{ name: 'rv_detail', params: { id: rv.id}}" class="list-group-item" >
	  <div class="pull-left thumb-md m-r"><img :src="rv.img_cover"></div>
	  <div class="clear">
	    <div class="title">{{rv.title}}</div>
	    <div class="text-muted m-b-sm">{{rv.sub_title}}</div>
	    <div class="thumb-sm"><img :src="rv.logo" alt="..."></div>
	  <div class="right text-lg">
	    123123<span class="text-default">{{rv.fee_currency}}{{rv.price}}</span>/{{rv.fee_unit}}
	  </div>
		</div>
	</router-link>
</div>
</template>
<script>
export default {
  props: {
    list: {}
  }
}
</script>
<style>
</style>
