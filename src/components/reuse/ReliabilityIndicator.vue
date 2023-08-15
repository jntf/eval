<template>
    <div class="reliability-container">
        <div class="reliability-bar rounded-xl">
            <div class="reliability-indicator rounded-l-xl"
                :style="{ width: reliabilityWidth, backgroundImage: reliabilityGradient }"></div>
            <div class="percentage-indicator" :style="{ left: reliabilityWidth }">
                <div class="triangle"></div>
                {{ percentageLabel }}
            </div>
        </div>
        <div class="slider-labels">
            <span class="value" v-for="n in 11" :key="n">{{ (n - 1) * 10 }}</span>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        r2: {
            type: Number,
            required: true
        }
    },
    computed: {
        reliabilityWidth() {
            return `${Math.round(this.r2 * 100)}%`;
        },
        reliabilityGradient() {
            const percentage = Math.round(this.r2 * 100);
            const gradient = `linear-gradient(to right, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 70%, rgba(255, 165, 0, 1) 80%, rgba(0, 255, 0, 1) 100%)`;
            return percentage >= 70 ? gradient : '';
        },
        percentageLabel() {
            return `${Math.round(this.r2 * 100)}%`;
        }
    }
};
</script>
  
<style scoped>
.reliability-container {
    position: relative;
}

.reliability-bar {
    width: 100%;
    height: 20px;
    background: rgba(200, 200, 200, 0.2);
    position: relative;
}

.reliability-indicator {
    height: 100%;
    position: absolute;
}

.percentage-indicator {
    position: absolute;
    top: -30px;
    transform: translateX(-50%);
    background: #fff;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 12px;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}

.slider-labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
}

.value {
    font-size: 12px;
}
</style>
  
