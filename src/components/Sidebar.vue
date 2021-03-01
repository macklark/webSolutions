<template>
  <div class="hidden md:block md:p-10 md:w-1/4 md:h-screen md:fixed md:ml-10 md:pl-20">
    <div class="text-xl md:ml-0 font-bold">Topics</div>
    <div class="grid grid-cols-1 text-xl overflow-y-auto">
      <div class="text-left p-3 text-base">Vue</div>
      <div class="text-left p-3 text-base">React</div>
      <div class="text-left p-3 text-base">Angular</div>
      <div class="text-left p-3 text-base">Tailwind CSS</div>
      <div class="text-left p-3 text-base">Python</div>
    </div>
  </div>
</template>

<script>
    export default{
        name : "Sidebar"
    }
</script>
