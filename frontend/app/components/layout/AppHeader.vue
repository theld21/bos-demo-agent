<template>
  <header class="h-16 min-h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between fixed top-0 left-0 right-0 z-40 shadow-sm shadow-slate-200/60">
    <!-- Left: Menu Button + Logo -->
    <div class="flex items-center gap-3">
      <HeaderMenuDrawer />
      
      <div class="flex items-center gap-2">
        <img src="/assets/images/logo.svg" alt="BOS Logo" class="w-24" />
      </div>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-3">
      <!-- Language -->
      <LanguageSwitcher />

      <!-- User Profile Dropdown -->
      <HeaderUserDropdown />
    </div>
  </header>
</template>

<script setup>
import HeaderMenuDrawer from './header/MenuDrawer.vue'
import HeaderUserDropdown from './header/UserDropdown.vue'
import LanguageSwitcher from '~/components/ui/LanguageSwitcher.vue'
</script>
