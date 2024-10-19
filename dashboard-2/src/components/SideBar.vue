<template>
  <div
    class="flex flex-col gap-y-4 items-center py-8 w-16 sm:w-20 md:w-24 bg-purple-800 h-full fixed absolute"
  >
    <button
      class="p-1 sm:p-2 md:p-3 bg-opacity-10 text-gray-200 rounded-xl bg-white"
    >
      <!-- Icon size will scale based on screen size -->
      <FoodIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    </button>

    <div class="flex flex-col gap-y-2 items-end self-end">
      <div
        v-for="menu in menus"
        :key="menu.name"
        :class="
          activeMenu === menu.name
            ? 'bg-gray-100 rounded-l-xl relative before:absolute before:w-4 before:h-6 sm:before:w-4 sm:before:h-8 before:-top-6 sm:before:-top-8 before:rounded-br-xl before:right-0 before:shadow-inverse-top after:absolute after:w-4 after:h-6 sm:after:w-4 sm:after:h-8 after:-bottom-6 sm:after:-bottom-8 after:rounded-tr-xl after:right-0 after:shadow-inverse-bottom'
            : ''
        "
      >
        <button
          class="p-2 sm:p-3 md:p-4 my-2 mr-2 sm:mr-3 md:mr-4 ml-2 sm:ml-3 md:ml-4 rounded-xl"
          @click="activeMenu = menu.name"
          :class="
            activeMenu === menu.name
              ? 'text-white shadow-error bg-purple-800'
              : 'bg-purple-100'
          "
        >
          <!-- Dynamic icon size for responsiveness -->
          <Component :is="menu.icon" class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FoodIcon from "../icons/food.svg";
import HomeIcon from "../icons/home.svg";
import ShoppingIcon from "../icons/shopping.svg";
import GraphIcon from "../icons/graph.svg";
import MessageIcon from "../icons/message.svg";
import NotificationIcon from "../icons/notification.svg";
import SettingsIcon from "../icons/settings.svg";
import LogoutIcon from "../icons/logout.svg";

const activeMenu = ref("Graph");

const menus = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Shopping", icon: ShoppingIcon },
  { name: "Graph", icon: GraphIcon },
  { name: "Messages", icon: MessageIcon },
  { name: "Notifications", icon: NotificationIcon },
  { name: "Settings", icon: SettingsIcon },
  { name: "Logout", icon: LogoutIcon },
];
</script>
