<template>
  <div id="app">
    <div
      style="
        margin-bottom: 50px;
        padding-bottom: 50px;
        font-family: Arial Black;
        color: #0f52ba;
      "
    >
      <h1 class="glowing-text">
        Happy Bornday ❤🎊🎉🎉!
      </h1>
      <h1 class="glowing-text">
       The genie will grant you one wish.
      </h1>
      <h1 class="glowing-text">Spin 3 times and choose</h1>
    </div>

    <div class="container">
      <div class="left">
        <img
          src="../assets/genieAladin.png"
          alt="Genie Image"
          class="genie-image"
        />
        <div class="description">
          <h3
            style="line-height: 2; color: #28282b"
            v-for="(prize, index) in prizeDescriptions"
            :key="index"
          >
            <strong>Price {{ index + 1 }}:</strong> {{ prize }}
          </h3>
        </div>
      </div>

      <div class="right">
        <Roulette
          ref="wheel"
          :key="rouletteKey"
          :items="items"
          centered-indicator
          indicator-position="top"
          display-shadow
          display-border
          base-display
          base-display-indicator
          base-background="#dedede"
          base-display-shadow
          easing="bounce"
          @wheel-start="wheelStartedCallback"
          @wheel-end="wheelEndedCallback"
          @click="launchWheel"
        >
          <template #baseContent>
            <div style="color: #2c3e50">Spin, Baby!</div>
          </template>
        </Roulette>
      </div>
    </div>

    <div v-if="winnerMessage" class="winner-message">
      <p style="font-size: 30px">{{ winnerMessage }}</p>
    </div>
  </div>
</template>

<script>
import { Roulette } from "vue3-roulette";
export default {
  name: "App",
  components: {
    Roulette,
  },
  data() {
    return {
      rouletteKey: 0,
      winnerMessage: "",
      selectedItemIndex: null,
      prizeDescriptions: [
        "a Trip to Japan",
        "home Date home made cuisine",
        "a Date at Bao bar",
        "a Date at Hard Rock",
        "Airpods Pro 2",
        "a ThinkPad P16s G3 16",
      ],
      items: [
        {
          id: 1,
          name: "price 1",
          htmlContent: "Price 1",
          textColor: "#2c3e50",
          background: "#E1EBEE",
        },
        {
          id: 2,
          name: "price 2",
          htmlContent: "Price 2",
          textColor: "#2c3e50",
          background: "#87CEFA",
        },
        {
          id: 3,
          name: "price 3",
          htmlContent: "Price 3",
          textColor: "#2c3e50",
          background: "#CF9FFF",
        },
        {
          id: 4,
          name: "price 4",
          htmlContent: "Price 4",
          textColor: "#2c3e50",
          background: "#E6E6FA",
        },
        {
          id: 5,
          name: "price 5",
          htmlContent: "Price 5",
          textColor: "#2c3e50",
          background: "#FDF0D5",
        },
        {
          id: 6,
          name: "price 6",
          htmlContent: "Price 6",
          textColor: "#2c3e50",
        },
      ],
    };
  },
  methods: {
    launchWheel() {
      this.selectedItemIndex = Math.floor(Math.random() * this.items.length);
      this.rouletteKey += 1;

      // Detect Safari and add a slight delay if Safari is detected
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        setTimeout(() => {
          this.$refs.wheel.launchWheel({
            selectedItemIndex: this.selectedItemIndex,
          });
        }, 100); // Adjust delay as needed
      } else {
        this.$refs.wheel.launchWheel({
          selectedItemIndex: this.selectedItemIndex,
        });
      }
    },
    wheelEndedCallback(evt) {
      const selectedPrize = this.prizeDescriptions[evt.id - 1];
      this.winnerMessage = `Your price is: ${selectedPrize}!`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  width: 100%;
}

.glowing-text {
  color: #0f52ba;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #add8e6, 0 0 15px #87ceeb,
    0 0 20px #0f52ba, 0 0 25px #0f52ba, 0 0 30px #0f52ba;
  font-size: 40px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: whitesmoke;
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

h1 {
  font-size: 40px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px;
}

.left,
.right {
  flex: 1;
  min-width: 300px;
}

.genie-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.description {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  min-height: 200px;
}

/* Hardware acceleration and will-change for Safari */
.roulette, .roulette-piece {
  transform: translateZ(0);
  will-change: transform;
}

.winner-message {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}

.roulette {
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
