<template>
    <div ref="chart"></div>
</template>
  
<script>
import * as echarts from 'echarts';
import { ref, onMounted, watch, onUnmounted } from 'vue';

export default {
    name: 'LinearChart',
    props: {
        title: String,
        data: Object,
        options: Object,
    },
    setup(props) {
        const chartInstance = ref(null);
        const chart = ref(null);

        onMounted(async () => {
            try {
                // Charger le thème
                const response = await fetch('/custom.json');
                const theme = await response.json();

                // Enregistrer le thème
                echarts.registerTheme('customTheme', theme);

                // Initialiser le graphique avec le thème
                chartInstance.value = echarts.init(chart.value, 'customTheme');
                // Obtenir une liste de couleurs
                const colorList = theme.color;

                chartInstance.value.setOption({
                    title: {
                        text: props.title,
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'time',
                        data: props.data.labels,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: props.data.datasets.map((dataset, index) => ({
                        name: 'sales',
                        type: 'line',
                        data: dataset.data.map((value, index) => [props.data.labels[index], value]),
                    })),
                    ...props.options,
                });
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        });
        onUnmounted(() => {
            chartInstance.value.dispose();
        });

        return {
            chart,
        };
    },
};
</script>
  
<style scoped>
div {
    height: 400px;
    width: 100%;
}
</style>
  