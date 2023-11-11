<script setup>
import { loadStytch } from '@stytch/stytch-js';
import { onMounted } from 'vue';

const setup = async () => {
  const Stytch = await loadStytch();

  let stytch = Stytch('public-token-test-c0408a84-4270-4bcb-9f9c-086384eff4f5').mount({
    elementId: '#gtap',
    loginOrSignupView: {
      products: ['oauth'],
      oauthOptions: {
        providers: [{ type: 'google', one_tap: true, position: 'embedded' }],
      },
    },
    style: {
        width: 'calc(100% - 20px)',
    }
  });
};

onMounted(() => {
    setup()
})
</script>

<template>
  <main class="login min-h-screen bg-gradient-to-br from-green-500 to-cyan-400">
    <section class="container mx-auto pt-16 pb-4 px-4">
      <h1 class="text-4xl mb-8 text-center font-black uppercase">G-Tap Login</h1>

      <div class="bg-gray-700 max-w-md mx-auto rounded-lg p-4">
        <div id="gtap"></div>
      </div>
    </section>
  </main>
</template>
