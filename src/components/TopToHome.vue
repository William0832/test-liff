<template lang="pug">
.position-absolute.top-0.end-0.opacity-50.ms-1
  span.btn.badge.rounded-pill.text-bg-dark(@click="$router.push({ name: 'Home' })")
    Icon(:icon="['fas', 'fa-xmark']")
</template>
