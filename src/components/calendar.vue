<template>
  <div>
    <b-form-datepicker v-model="value" :min="min" :max="max" locale="es" :start-weekday=1></b-form-datepicker>
  </div>
</template>

<script>
  export default {
    name: "calendar",
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 6)
      maxDate.setDate(15)

      return {
        value: '',
        min: minDate,
        max: maxDate
      }
    }
  }
</script>