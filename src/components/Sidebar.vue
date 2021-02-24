<template>
  <div class="hidden md:block md:p-10 md:w-1/4 md:h-screen md:fixed md:ml-10">
    <div class="text-xl ml-5 md:ml-0 mt-5">Topics</div>
    <div class="grid grid-cols-1 divide-y text-xl overflow-y-auto">
      <div class="text-center p-5 text-base">Vue</div>
      <div class="text-center p-5 text-base">React</div>
      <div class="text-center p-5 text-base">Angular</div>
      <div class="text-center p-5 text-base">Tailwind CSS</div>
      <div class="text-center p-5 text-base">Python</div>
    </div>
  </div>
</template>

<script>
    export default{
        name : "Sidebar"
    }
</script>
