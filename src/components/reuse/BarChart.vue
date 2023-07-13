<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
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

        onMounted(async () => {
            try {
                // Charger le thème
                const response = await fetch('../../../theme/echarts/custom.json');
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
                        data: props.data.labels,
                        axisLabel: {
                            rotate: 45, // Rotation à 45 degrés pour imiter la position 7h30
                            interval: 0, // Tous les noms seront affichés
                        },
                    },
                    yAxis: {},
                    series: props.data.datasets.map((dataset, index) => ({
                        name: 'Cumul',
                        type: 'bar',
                        data: dataset.data.map((value, index) => ({
                            value: value,
                            itemStyle: { color: colorList[index % colorList.length] }
                        })),
                    })),
                    ...props.options,
                });
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        });

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

  

  

  

  