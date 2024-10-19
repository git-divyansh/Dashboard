<template>
  <div class="flex h-screen w-screen overflow-y-auto font-sans bg-purple-100">
    <div class="h-full w-fit">
      <SideBar />
    </div>
    <div class="flex sm:flex-row flex-col w-screen ml-16 md:ml-24">
      <main class="flex flex-col flex-1 gap-3 p-4">
        <header>
          <h1 class="text-3xl font-semibold leading-loose text-gray-700">POS System</h1>
        </header>
        <hr class="border-purple-800">
        <Card />
        <Table />
      </main>
      <aside class=" w-full flex flex-col items-center gap-y-6 pt-6 sm:pr-6 sm:w-96">
        <RightSideBar />  
      </aside>
    </div>
  </div>
</template>
<script setup>
  import SideBar from "./components/SideBar.vue";
  import RightSideBar from "./components/RightSideBar.vue";
  import Card from "./components/Card.vue";
  import Table from "./components/Table.vue";
</script>