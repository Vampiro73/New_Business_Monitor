document.addEventListener('DOMContentLoaded', function () {
    // --- CONFIGURACIÓN GLOBAL DE CHART.JS ---
    Chart.defaults.color = '#fff';
    Chart.defaults.borderColor = '#334155';

    // --- 1. GRÁFICA INDEX (DESEMPEÑO GLOBAL) ---
    const ctxIndex = document.getElementById('graficaIndex')?.getContext('2d');
    if (ctxIndex) {
        new Chart(ctxIndex, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Crecimiento AUM',
                    data: [1.1, 1.15, 1.18, 1.2, 1.22, 1.25],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // --- 2. GRÁFICA PRODUCTOS (MIX DE PRODUCTOS - DONA) ---
    // Esta es la que tiene el "100%" en el centro
    const ctxProd = document.getElementById('graficaProductos')?.getContext('2d');
    if (ctxProd) {
        new Chart(ctxProd, {
            type: 'doughnut',
            data: {
                labels: ['Fondos', 'Capitales', 'Créditos', 'Otros'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: ['#AA9BFF', '#6C5DD3', '#3F8CFF', '#00D4FF'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // --- 3. GRÁFICA ASESORES (PRODUCTIVIDAD VS SATISFACCIÓN) ---
    const ctxAsesores = document.getElementById('graficaValorAsesor')?.getContext('2d');
    if (ctxAsesores) {
        new Chart(ctxAsesores, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Asesores Elite',
                    data: [
                        { x: 85, y: 90 }, { x: 70, y: 75 }, { x: 95, y: 88 }, { x: 50, y: 60 }, { x: 80, y: 95 }
                    ],
                    backgroundColor: '#00d4ff',
                    pointRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: 'Productividad (%)' } },
                    y: { title: { display: true, text: 'Satisfacción Cliente' } }
                }
            }
        });
    }

    // --- 4. GRÁFICA SEGUROS (CALIDAD VS CANTIDAD) ---
    const ctxSeguros = document.getElementById('graficaValorSeguros')?.getContext('2d');
    if (ctxSeguros) {
        new Chart(ctxSeguros, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    type: 'line',
                    label: 'Calidad (Margen)',
                    data: [45, 50, 60, 75, 70, 85],
                    borderColor: '#fff',
                    borderWidth: 2,
                    fill: false
                }, {
                    label: 'Cantidad (Pólizas)',
                    data: [65, 75, 70, 85, 90, 95],
                    backgroundColor: '#6C5DD3',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- 5. GRÁFICA CUMPLIMIENTO (SÉMAFORO DE RIESGO) ---
    const ctxComp = document.getElementById('graficaCumplimiento')?.getContext('2d');
    if (ctxComp) {
        new Chart(ctxComp, {
            type: 'doughnut',
            data: {
                labels: ['Crítico', 'Preventivo', 'OK'],
                datasets: [{
                    data: [8, 15, 77],
                    backgroundColor: ['#ff4d4d', '#ffcc00', '#00ffcc'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // --- 6. GRÁFICA LEADS (FUNNEL DE VENTAS) ---
    const ctxFunnel = document.getElementById('graficaFunnel')?.getContext('2d');
    if (ctxFunnel) {
        new Chart(ctxFunnel, {
            type: 'bar',
            data: {
                labels: ['Leads', 'Perfilados', 'Citas', 'Cierres'],
                datasets: [{
                    label: 'Embudo de Ventas',
                    data: [8400, 4200, 1200, 342],
                    backgroundColor: '#AA9BFF',
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y', // Hace que las barras sean horizontales
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- LÓGICA RESPONSIVA PARA TABLET/MÓVIL ---
    window.addEventListener('resize', () => {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    });
});