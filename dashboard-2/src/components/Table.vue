<template>
  <div class="w-full p-4 lg:p-6 bg-purple-800 rounded-lg md:w-92">
    <div class="flex flex-col md:flex-row justify-between items-center pb-4 space-y-4 md:space-y-0">
      <h2 class="text-lg md:text-xl lg:text-2xl font-semibold leading-loose text-white">Order Report</h2>
      <button class="flex py-2 px-3 md:py-3 md:px-4 lg:py-4 lg:px-6 rounded-lg border border-gray-200 gap-x-2.5">
        <OptionsIcon />
        <span class="text-sm md:text-base lg:text-lg text-white">Filter</span>
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full md:w-fit lg:w-full">
        <thead>
          <tr class="text-xs md:text-sm lg:text-base font-semibold text-white">
            <td class="py-2 md:py-4 lg:py-5 border-b border-gray-200">Customer</td>
            <td class="py-2 md:py-4 lg:py-5 border-b border-gray-200">Menu</td>
            <td class="py-2 md:py-4 lg:py-5 border-b border-gray-200 text-right">Total Payment</td>
            <td class="py-2 md:py-4 lg:py-5 border-b border-gray-200 text-center">Status</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.name" class="text-xs md:text-sm lg:text-base text-gray-200">
            <td class="py-2 md:py-4 lg:py-5">
              <div class="flex gap-2 md:gap-4 items-center">
                <img width="24" md:width="32" lg:width="40" :src="`/img/${order.avatar}`" alt="" />
                <span> {{ order.name }} </span>
              </div>
            </td>
            <td class="py-2 md:py-4 lg:py-5">{{ order.menu }}</td>
            <td class="py-2 md:py-4 lg:py-5 tabular-nums text-right">{{ order.total }}</td>
            <td class="py-2 md:py-4 lg:py-5 flex justify-center">
              <span
                class="flex justify-center py-1 w-20 md:w-24 lg:w-28 font-medium capitalize rounded-full"
                :class="{
                  'bg-accent-green/20 text-accent-green': order.status === 'completed',
                  'bg-accent-purple/20 text-accent-purple': order.status === 'preparing',
                  'bg-accent-blue/20 text-accent-blue': order.status === 'pending',
                }"
              >
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import OptionsIcon from "../icons/options.svg";

const orders = [
  {
    avatar: "avatar-1.png",
    name: "AAE IdeaPro",
    menu: "Burger King Halloween Whopper",
    total: "$50",
    status: "completed",
  },
  {
    avatar: "avatar-2.png",
    name: "Robert Braunn",
    menu: "King Whopper Sandwich Hamburger",
    total: "$185",
    status: "preparing",
  },
  {
    avatar: "avatar-3.png",
    name: "Levi Ackerman",
    menu: "Red Robin Gourmet Burger",
    total: "$70",
    status: "pending",
  },
  {
    avatar: "avatar-4.png",
    name: "Historia Reiss",
    menu: "Hot spicy fried rice with omelet",
    total: "$145",
    status: "completed",
  },
];
</script>
