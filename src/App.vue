<script setup></script>

<template>
  <header class="site-header sticky-top py-1 bg-dark text-white">
    <nav class="container">
      <router-link to="/" class="py-2 nav-link d-flex align-items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2" role="img" viewBox="0 0 24 24">
          <title>Product</title>
          <circle cx="12" cy="12" r="10"></circle>
          <path
            d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94">
          </path>
        </svg>
        <span class="h3 mb-0"> RHResume </span>
      </router-link>
    </nav>
  </header>
  <div class="overflow-hidden">
    <router-view />
  </div>
</template>
