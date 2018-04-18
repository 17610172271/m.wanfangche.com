<template>
  <div>
    <div class="wrapper">
      <label>
        <input type="checkbox" v-model="isChecked" value="Jianbo" class="input-value-checkbox" style="-webkit-appearance: checkbox;"> Jianbo
      </label>
      <label>
        <input type="checkbox" v-model="isChecked" value="Yoko" class="input-value-checkbox" style="-webkit-appearance: checkbox;"> Yoko
      </label>
      <label>
        <input type="checkbox" v-model="isChecked" value="Heisengerg" class="input-value-checkbox" style="-webkit-appearance: checkbox;"> Heisengerg
      </label>
    </div>
    <div class="wrapper">Result: {{isChecked}}</div>

  </div>
</template>

<script>
export default {
  data: () => ({
    isChecked: []
  })
}
</script>
<style>
  .input-value-checkbox {
    margin: 0 0;
    width: auto;
    height: auto;
    appearance: normal;
  }
</style>
