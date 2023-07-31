<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch, reactive } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'BarChart',
    props: {
        title: String,
        data: Object,
        options: Object,
    },
    setup(props) {
        const chart = ref(null);
        const chartInstance = ref(null);
        const theme = reactive({ color: [] });  // Initialiser le thème comme un objet réactif

        onMounted(async () => {
            try {
                const response = await fetch('/custom.json');
                const themeData = await response.json();

                echarts.registerTheme('customTheme', themeData);
                chartInstance.value = echarts.init(chart.value, 'customTheme');

                // Mettre à jour le thème avec les données récupérées
                Object.assign(theme, themeData);

                chartInstance.value.setOption({
                    title: { text: props.title },
                    tooltip: {},
                    xAxis: {
                        data: props.data.labels,
                        axisLabel: { rotate: 45, interval: 0 },
                    },
                    yAxis: {},
                    series: props.data.datasets.map((dataset, index) => ({
                        name: 'Cumul',
                        type: 'bar',
                        stack: 'x',
                        data: dataset.data.map((value, index) => ({
                            value: value,
                            itemStyle: { color: theme.color[index % theme.color.length] }
                        })),
                    })),
                    ...props.options,
                });
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        });

        watch(() => props.data, (newData) => {
            if (chartInstance.value) {
                chartInstance.value.setOption({
                    xAxis: { data: newData.labels },
                    series: newData.datasets.map((dataset, index) => ({
                        name: 'Cumul',
                        type: 'bar',
                        data: dataset.data.map((value, index) => ({
                            value: value,
                            itemStyle: { color: theme.color[index % theme.color.length] }
                        })),
                    })),
                });
            }
        }, { deep: true });

        onUnmounted(() => {
            if (chartInstance.value) {
                chartInstance.value.dispose();
            }
        });

        return {
            chart,
        };
    },
};
</script>