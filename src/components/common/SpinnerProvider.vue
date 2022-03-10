<template>
  <div>
    <div
      v-show="isSpinnerVisible"
      class="spinner z-40 min-h-screen min-w-screen bg-gray-900 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    >
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import { ref, readonly, provide, inject } from 'vue'

// Use symbols as a unique identifiers.
export const spinnerStateSymbol = Symbol('spinner provider state identifier')

export const useSpinner = () => {
  const value = inject(spinnerStateSymbol)

  if (!value) {
    throw new Error('spinner should be used inside of the <SpinnerProvider /> component.')
  }

  return value
}

export default {
  setup() {
    const isSpinnerVisible = ref(false)

    // Methods
    const setSpinnerOn = () => {
      isSpinnerVisible.value = true
    }
    const setSpinnerOff = () => (isSpinnerVisible.value = false)

    // Provide the state and methods to change it
    provide(spinnerStateSymbol, {
      isSpinnerVisible: readonly(isSpinnerVisible),
      setSpinnerOn,
      setSpinnerOff
    })

    return {
      isSpinnerVisible
    }
  }
}
</script>
<style>
.spinner {
  background: rgba(255, 255, 255, 0.7) !important;
  z-index: 99999 !important;
}
.orbit-spinner,
.orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid #ff1d5e;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
