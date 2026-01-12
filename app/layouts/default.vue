<template>
  <div class="min-h-screen bg-zinc-900 text-white flex flex-col font-sans">
    <CustomCursor />
    <AppHeader />
    <main class="grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
