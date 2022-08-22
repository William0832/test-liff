<template lang="pug">
.container.mt-2
  .top-action
    button.btn.btn-secondary.btn-sm(@click="router.push({ name: 'Home' })") 返回
  //- .itemInfo.p-2
  //-   .title {{ title }}
  //-   .info {{ info }}
  //-   .price {{ price }}
  .form-floating.my-2
    input.form-control#amount-input(type="number", v-model="amount" min=1, max=4)
    label(for="amount-input") 數量
  .form-floating.my-2
    select.form-control#spicy-level
      option(value="完全不辣") 完全不辣
      option(value="原味(微辣)" selected) 原味(微辣)
      option(value="加辣)") 加辣
    label(for="spicy-level") 辣度
  .my-2
    .form-control
      label 加料
      .form-check
        input.form-check-input(type="checkbox" id="check1" value="加麵" 
          v-model="selectedAddItems"
        )
        label.form-check-label(for="check1").d-flex 加麵
          .price.ms-2 $20
      .form-check
        input.form-check-input(type="checkbox" id="check2" value="加菇菇" 
          v-model="selectedAddItems"
        )
        label.form-check-label(for="check2" ).d-flex 加菇菇
          .price.ms-2 $20


</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)
console.log(id.value)
const amount = ref(1)

const addItemOptions = []
const addItems = ref(null)
const selectedAddItems = ref([])
</script>

<style lang="sass">
</style>
