document.addEventListener('DOMContentLoaded', () => {
    // FECHA DE REFERENCIA
    let dateContext = new Date();
    const today = new Date(); // Esto tomará automáticamente el 17 de febrero de 2026

    // --- 1. CONFIGURACIÓN DEL MAPA (COLOR CLARO ÚNICO) ---
    const coordsUrales = [19.4319, -99.2132];
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView(coordsUrales, 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

    let currentMarker = L.marker(coordsUrales).addTo(map).bindPopup('Corporativo Montes Urales').openPopup();

    setTimeout(() => { map.invalidateSize(); }, 500);

    // --- 2. GRÁFICA: ONBOARDING POR CANAL (DONA CON 100%) ---
    const ctxDonut = document.getElementById('donutChart');
    if (ctxDonut) {
        new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['App Móvil', 'Portal Web', 'Sucursal', 'Mixto'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: ['#d1d1d1', '#ffffff', '#3f51b5'],
                    borderWidth: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#fff', font: { size: 10 }, usePointStyle: true } }
                }
            },
            plugins: [{
                id: 'centerText',
                afterDraw: (chart) => {
                    const { ctx, chartArea: { top, left, width, height } } = chart;
                    ctx.save();
                    ctx.font = 'bold 1.2rem Noto Sans';
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('100%', left + width / 2, top + height / 2);
                    ctx.restore();
                }
            }]
        });
    }

    // --- 3. GRÁFICA: ONBOARDING POR HORA (LÍNEA ANIMADA) ---
    const ctxLine = document.getElementById('lineChart');
    let lineChart;
    if (ctxLine) {
        lineChart = new Chart(ctxLine.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                datasets: [{
                    data: [12, 18, 48, 42, 78, 68, 88, 62, 42],
                    borderColor: '#00e5ff',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#fff', font: { size: 10 } } },
                    x: { grid: { display: false }, ticks: { color: '#fff', font: { size: 10 } } }
                }
            }
        });
    }

    // --- 4. GRÁFICA: SALDOS POR SUCURSAL (BARRAS) ---
    const ctxBar = document.getElementById('barChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Montes Urales', 'Monterrey', 'Guadalajara', 'Queretaro', 'Puebla'],
                datasets: [{
                    data: [950, 820, 650, 450, 250],
                    backgroundColor: [
                        '#004cff', // Montes Urales
                        '#5f04e8', // Monterrey
                        '#9b0a92', // Guadalajara
                        '#fa47fa', // Queretaro
                        '#d493c8'  // Puebla
                    ],
                    barThickness: 12
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                // --- NUEVO: Detectar clic ---
                onClick: (e, elements, chart) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const label = chart.data.labels[index];
                        // Redirige a detalle.html enviando el nombre de la sucursal
                        window.location.href = `detalle.html?sucursal=${encodeURIComponent(label)}`;
                    }
                },
                // --- NUEVO: Cambiar el cursor a una mano al pasar sobre las barras ---
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                },
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#fff', font: { size: 10 } } },
                    y: { grid: { display: false }, ticks: { color: '#fff', font: { size: 12 } } }
                }
            }
        });
    }

    // --- 5. LISTA DE 50 SUCURSALES (ROLLOVER + CLICK) ---
    const sucursalList = document.getElementById('sucursal-list');
    if (sucursalList) {
        sucursalList.innerHTML = '';

        // Datos reales: Nombre, Latitud y Longitud
        const sedesData = [
            { n: "Montes Urales (Corp)", lat: 19.4239, lng: -99.2081 },
            { n: "Monterrey San Pedro", lat: 25.6611, lng: -100.3531 },
            { n: "Guadalajara Américas", lat: 20.6921, lng: -103.3754 },
            { n: "Querétaro Quintana", lat: 20.5936, lng: -100.3928 },
            { n: "Puebla Angelópolis", lat: 19.0301, lng: -98.2325 },
            { n: "Mérida Montejo", lat: 20.9880, lng: -89.6171 },
            { n: "Cancún Bonampak", lat: 21.1522, lng: -86.8252 },
            { n: "León Campestre", lat: 21.1500, lng: -101.6961 },
            { n: "Tijuana Zona Río", lat: 32.5284, lng: -117.0210 },
            { n: "Toluca Metepec", lat: 19.2514, lng: -99.6053 },
            { n: "Polanco Homero", lat: 19.4397, lng: -99.1844 },
            { n: "Insurgentes Sur", lat: 19.3621, lng: -99.1822 },
            { n: "San Jerónimo Mty", lat: 25.6775, lng: -100.3744 },
            { n: "Zapopan Patria", lat: 20.7011, lng: -103.4150 },
            { n: "San Miguel de Allende", lat: 20.9142, lng: -100.7437 },
            { n: "Aguascalientes Nte", lat: 21.9083, lng: -102.2961 },
            { n: "San Luis Potosí", lat: 22.1447, lng: -101.0114 },
            { n: "Hermosillo Colosio", lat: 29.0888, lng: -110.9761 },
            { n: "Chihuahua Periférico", lat: 28.6419, lng: -106.1311 },
            { n: "Cuernavaca Río Mayo", lat: 18.9344, lng: -99.2169 },
            { n: "Boca del Río", lat: 19.1417, lng: -96.1042 },
            { n: "Torreón Independencia", lat: 25.5539, lng: -103.4258 },
            { n: "Saltillo V. Carranza", lat: 25.4501, lng: -100.9754 },
            { n: "Morelia Camelinas", lat: 19.6897, lng: -101.1642 },
            { n: "Culiacán Tres Ríos", lat: 24.8197, lng: -107.4003 },
            { n: "Mazatlán Malecón", lat: 23.2309, lng: -106.4251 },
            { n: "Xalapa Ánimas", lat: 19.5186, lng: -96.8797 },
            { n: "Villahermosa Tabasco", lat: 17.9961, lng: -92.9461 },
            { n: "Tuxtla Poniente", lat: 16.7561, lng: -93.1539 },
            { n: "Durango Lomas", lat: 24.0247, lng: -104.6622 },
            { n: "Pachuca Zona Plateada", lat: 20.0989, lng: -98.7758 },
            { n: "Ensenada", lat: 31.8667, lng: -116.6000 },
            { n: "Cd. Juárez Odore", lat: 31.7061, lng: -106.4061 },
            { n: "Metepec Izar", lat: 19.2589, lng: -99.6011 },
            { n: "Satélite", lat: 19.5106, lng: -99.2344 },
            { n: "Interlomas", lat: 19.4003, lng: -99.2742 },
            { n: "Irapuato Villas", lat: 20.6975, lng: -101.3711 },
            { n: "Celaya Campestre", lat: 20.5361, lng: -100.8261 },
            { n: "Oaxaca Reforma", lat: 17.0789, lng: -96.7111 },
            { n: "Tampico Lomas", lat: 22.2589, lng: -97.8611 },
            { n: "Coatzacoalcos", lat: 18.1389, lng: -94.4561 },
            { n: "Los Cabos", lat: 23.0611, lng: -109.7011 },
            { n: "Mexicali", lat: 32.6511, lng: -115.4611 },
            { n: "Colima Lomas", lat: 19.2611, lng: -103.7161 },
            { n: "Tepic Ciudad", lat: 21.5061, lng: -104.8961 },
            { n: "Campeche", lat: 19.8411, lng: -90.5361 },
            { n: "Zacatecas", lat: 22.7611, lng: -102.5761 },
            { n: "Puerto Vallarta", lat: 20.6536, lng: -105.2261 },
            { n: "Reynosa", lat: 26.0911, lng: -98.2961 },
            { n: "Nuevo Laredo", lat: 27.4811, lng: -99.5161 }
        ];

        sedesData.forEach((data, i) => {
            const item = document.createElement('div');
            item.className = `sucursal-item ${i === 0 ? 'active' : ''}`;

            // Mantengo el diseño de nombre y valor que tenías
            item.innerHTML = `
            <span>${i + 1}. ${data.n}</span>
            <span class="suc-val">${(3000 - (i * 45)).toLocaleString()}</span>
        `;

            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.sucursal-item').forEach(el => el.classList.remove('hover-effect'));
                item.classList.add('hover-effect');
            });

            item.addEventListener('click', () => {
                if (typeof currentMarker !== 'undefined' && currentMarker) {
                    map.removeLayer(currentMarker);
                }

                // Efecto de vuelo al punto exacto
                map.flyTo([data.lat, data.lng], 15, { duration: 1.5 });

                currentMarker = L.marker([data.lat, data.lng]).addTo(map)
                    .bindPopup(`<b>Sucursal:</b><br>${data.n}`)
                    .openPopup();

                document.querySelectorAll('.sucursal-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });

            sucursalList.appendChild(item);
        });
    }

    // --- 6. CALENDARIO DINÁMICO CORREGIDO ---
    const renderCalendar = (view = 'Mes') => {
        const container = document.getElementById('calendar');
        if (!container) return;
        container.innerHTML = '';
        container.style.display = 'grid';

        // Vista de un solo día (Hoy)
        if (view === 'Día') {
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.innerHTML = `<div class="cal-date"><span class="cal-today" style="padding:10px 15px; font-size:1.2rem">${today.getDate()}</span></div>`;
            return;
        }

        // Etiquetas de los días de la semana
        const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        labels.forEach(l => {
            const h = document.createElement('div');
            h.style.fontWeight = 'bold'; h.style.fontSize = '0.7rem'; h.innerText = l;
            container.appendChild(h);
        });

        if (view === 'Mes') {
            const y = dateContext.getFullYear(), m = dateContext.getMonth();
            const first = new Date(y, m, 1).getDay();
            const days = new Date(y, m + 1, 0).getDate();
            let offset = (first === 0) ? 6 : first - 1;
            for (let i = 0; i < offset; i++) container.appendChild(document.createElement('div'));
            for (let i = 1; i <= days; i++) {
                const d = document.createElement('div'); d.className = 'cal-date';
                if (i === today.getDate() && m === today.getMonth()) d.innerHTML = `<span class="cal-today">${i}</span>`;
                else d.innerText = i;
                container.appendChild(d);
            }
        } else {
            // --- CORRECCIÓN PARA VISTA SEMANAL ---
            // Usamos 'today' para centrar la semana en la fecha actual (17 de Feb)
            let curr = new Date(today);
            let dayOfWeek = curr.getDay(); // 0 es Domingo, 1 es Lunes...

            // Calculamos cuántos días restar para llegar al Lunes de esta semana
            let diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
            let monday = new Date(curr);
            monday.setDate(curr.getDate() - diffToMonday);

            for (let i = 0; i < 7; i++) {
                let d = new Date(monday);
                d.setDate(monday.getDate() + i);

                const el = document.createElement('div');
                el.className = 'cal-date';

                // Comparamos la fecha del calendario con la de hoy para poner el círculo
                if (d.toDateString() === today.toDateString()) {
                    el.innerHTML = `<span class="cal-today">${d.getDate()}</span>`;
                } else {
                    el.innerText = d.getDate();
                }
                container.appendChild(el);
            }
        }
    };

    // --- 7. QOPA: RESPUESTA INTEGRADA EN INPUT ---
    const qopaInput = document.querySelector('.asistente-input');
    if (qopaInput) {
        qopaInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = qopaInput.value.trim().toLowerCase();
                if (val) {
                    qopaInput.value = "";
                    qopaInput.placeholder = "Asistente está procesando...";

                    let resp = "Asistente: Todo en orden en la red actual.";
                    if (val.includes("saldo")) resp = "Asistente: Los saldos subieron 5.2%.";
                    if (val.includes("sucursal")) resp = "Asistente: Montes Urales es la más activa hoy.";
                    if (val.includes("toluca")) resp = "Asistente: Mucho frío pero avanzan las operaciones bursátiles.";
                    if (val.includes("monterrey")) resp = "Asistente: Algunas operaciones demuestran que amanecimos con cartera vencida.";
                    if (val.includes("montes urales")) resp = "Todo excelente en esta sucursal";
                    if (val.includes("toluca")) resp = "Los tracks y los fondos muy solicitados por los clientes";

                    setTimeout(() => {
                        // La respuesta aparece directamente como texto en el input
                        qopaInput.value = resp;
                        // Regresamos al estado inicial después de 3 segundos
                        setTimeout(() => {
                            qopaInput.value = "";
                            qopaInput.placeholder = "Escribe tu mensaje...";
                        }, 3000);
                    }, 800);
                }
            }
        });
    }

    // --- 8. NAVEGACIÓN Y CONFIGURACIÓN ---
    const updateHeader = () => {
        const title = document.querySelector('.card-custom .card-title.text-center');
        const yearDisp = document.querySelector('.card-custom .text-center.small');
        if (yearDisp) yearDisp.innerText = dateContext.getFullYear();
        if (title) {
            const mName = dateContext.toLocaleString('es-ES', { month: 'long' });
            title.innerHTML = `<span id="prev" style="cursor:pointer; padding: 0 10px;"> &lt; </span> ${mName.toUpperCase()} <span id="next" style="cursor:pointer; padding: 0 10px;"> &gt; </span>`;
            document.getElementById('prev').onclick = () => { dateContext.setMonth(dateContext.getMonth() - 1); updateHeader(); renderCalendar(); };
            document.getElementById('next').onclick = () => { dateContext.setMonth(dateContext.getMonth() + 1); updateHeader(); renderCalendar(); };
        }
    };

    document.querySelectorAll('.btn-cal, .nav-btn-custom').forEach(btn => {
        btn.onclick = function () {
            this.parentElement.querySelectorAll('.btn-cal, .nav-btn-custom').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (this.classList.contains('btn-cal')) renderCalendar(this.innerText.trim());
        };
    });

    updateHeader();
    renderCalendar();

    setInterval(() => {
        if (lineChart) {
            lineChart.data.datasets[0].data = lineChart.data.datasets[0].data.map(v => Math.max(10, Math.min(95, v + (Math.floor(Math.random() * 11) - 5))));
            lineChart.update({ duration: 1000 });
        }
    }, 3000);
});

const ctxArea = document.getElementById('areaChart');
if (ctxArea) {
    new Chart(ctxArea, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                data: [30, 55, 40, 75, 60, 90],
                fill: true,
                backgroundColor: 'rgba(0, 76, 255, 0.2)', /* Azul transparente */
                borderColor: '#004cff', /* Azul */
                tension: 0.4,
                pointBackgroundColor: '#00ffcc', /* Aqua */
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#fff' } },
                x: { grid: { display: false }, ticks: { color: '#fff' } }
            }
        }
    });
}





// Lógica del Reloj
setInterval(() => {
    const reloj = document.getElementById('reloj');
    if (reloj) reloj.innerText = new Date().toLocaleTimeString();
}, 1000);

// Lógica para capturar la sucursal de la URL y actualizar la página
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sucursalNom = urlParams.get('sucursal') || 'Sucursal General';

    // Actualizar título
    document.getElementById('nombreSucursal').innerText = sucursalNom;

    // Simulación de datos dinámicos según la sucursal
    const saldosSimulados = {
        'Montes Urales': '$950,000',
        'Monterrey': '$820,000',
        'Guadalajara': '$650,000',
        'Queretaro': '$450,000',
        'Puebla': '$250,000'
    };

    if (saldosSimulados[sucursalNom]) {
        document.getElementById('saldoTotal').innerText = saldosSimulados[sucursalNom];
    } else {
        document.getElementById('saldoTotal').innerText = '$1,250,000'; // Valor por defecto
    }
});

// --- 7. LÓGICA DE CRECIMIENTO TRANSVERSAL Y CÁLCULO DE SALDOS ---

function calcularCrecimientoTransversal() {
    // Datos reales extraídos de tu estrategia de sucursales
    const sucursalesData = [
        { nombre: 'Montes Urales', captacion: 45200000, inversion: 32100000 },
        { nombre: 'Monterrey', captacion: 28500000, inversion: 14250000 },
        { nombre: 'Guadalajara', captacion: 35000000, inversion: 21700000 },
        { nombre: 'Queretaro', captacion: 12000000, inversion: 5400000 }
    ];

    let totalCaptacionBanco = 0;
    let totalInversionCasaBolsa = 0;

    sucursalesData.forEach(s => {
        totalCaptacionBanco += s.captacion;
        totalInversionCasaBolsa += s.inversion;
    });

    // Calcular el Ratio de Venta Cruzada Global
    const ratioGlobal = (totalInversionCasaBolsa / totalCaptacionBanco) * 100;

    // Inyectar en la pantalla de Sinergia (si el usuario está ahí)
    const ratioElement = document.getElementById('ratioVentaCruzada');
    const aumElement = document.getElementById('totalAUM');

    if (ratioElement) {
        ratioElement.innerText = ratioGlobal.toFixed(1) + '%';
        // Animación de color si supera el 60% (Meta Actinver)
        if (ratioGlobal > 60) ratioElement.style.color = '#00ffcc';
    }

    if (aumElement) {
        // Convertir a formato millones (ej. $73.4M)
        aumElement.innerText = '$' + (totalInversionCasaBolsa / 1000000).toFixed(1) + 'M';
    }
}

// Función para la tabla de Asesores con enfoque en Operaciones (Onboarding)
function renderizarTablaAsesores() {
    const contenedor = document.getElementById('tablaAsesoresBody');
    if (!contenedor) return;

    const asesores = [
        { nombre: 'Carlos Rodríguez', sucursal: 'Montes Urales', ok: 42, tiempo: '1.2 días', cross: '82%', total: '$5.4M' },
        { nombre: 'Elena Morales', sucursal: 'Monterrey', ok: 35, tiempo: '2.4 días', cross: '65%', total: '$3.2M' },
        { nombre: 'Ricardo Slim', sucursal: 'Guadalajara', ok: 29, tiempo: '1.9 días', cross: '74%', total: '$4.1M' }
    ];

    contenedor.innerHTML = asesores.map(a => `
        <tr>
            <td class="text-start ps-4">${a.nombre}</td>
            <td>${a.sucursal}</td>
            <td><span class="badge bg-dark border border-info text-info">${a.ok}</span></td>
            <td><i class="bi bi-speedometer2"></i> ${a.tiempo}</td>
            <td class="fw-bold" style="color: #00ffcc;">${a.cross}</td>
            <td class="fw-bold">${a.total}</td>
        </tr>
    `).join('');
}

// RE-VINCULACIÓN DEL DOM: Asegura que todo corra sin romper la IA existente
const originalDOMContentLoaded = document.addEventListener('DOMContentLoaded', () => {
    calcularCrecimientoTransversal();
    renderizarTablaAsesores();

    // El Asistente IA sigue escuchando aquí sus eventos originales
    console.log("Sistema Transversal Actinver: Operativo y Blindado.");
});

// AQUI VA LO NUEVO DE LA GRAFICA DE SINERGIA  

const canvasSinergia = document.getElementById('graficaSinergia');

if (canvasSinergia) {
    const ctxSinergia = canvasSinergia.getContext('2d');

    new Chart(ctxSinergia, {
        type: 'bar',
        data: {
            // SUCURSALES EN EL EJE Y (VERTICAL)
            labels: ['Montes Urales', 'Monterrey', 'Guadalajara', 'Queretaro'],
            datasets: [{
                label: 'Captación Banco (MDP)',
                data: [45.2, 28.5, 35.0, 12.0],
                backgroundColor: '#87ADFA', // Azul Actinver
                borderRadius: 5
            }, {
                label: 'Conversión Inversión (MDP)',
                data: [32.1, 14.2, 21.7, 5.4],
                backgroundColor: '#9B67F6', // Otro tono
                borderRadius: 5
            }]

        },
        options: {
            indexAxis: 'y', // CLAVE: Hace la gráfica horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#fff', font: { family: 'Inter', size: 12 } }
                }
            },
            scales: {
                x: { // Eje X ahora muestra los montos
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#fff',
                        callback: function (value) { return '$' + value + 'M'; }
                    }
                },
                y: { // Eje Y ahora muestra las sucursales
                    grid: { display: false },
                    ticks: { color: '#fff' }
                }
            }
        }
    });
}

//grafica de asesores  

const ctxValor = document.getElementById('graficaValorAsesor');

if (ctxValor) {
    new Chart(ctxValor, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Asesor A',
                    data: [{ x: 18, y: 35, r: 25 }], // r es el tamaño del círculo
                    backgroundColor: '#00f2ff', // Cian
                },
                {
                    label: 'Asesor B',
                    data: [{ x: 28, y: 15, r: 15 }],
                    backgroundColor: '#9ab9ff', // Azul claro
                },
                {
                    label: 'Asesor C',
                    data: [{ x: 42, y: 45, r: 45 }],
                    backgroundColor: '#e619c3', // Rosa mexicano
                },
                {
                    label: 'Asesor D',
                    data: [{ x: 68, y: 42, r: 20 }],
                    backgroundColor: '#9d66ff', // Morado
                },
                {
                    label: 'Asesor E',
                    data: [{ x: 92, y: 48, r: 40 }],
                    backgroundColor: '#ffffff', // Blanco
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // Ocultamos la leyenda para que se vea como el diseño
            },
            scales: {
                x: {
                    title: { display: true, text: 'Volúmen de Cartera', color: '#00f2ff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#fff' },
                    min: 0,
                    max: 100
                },
                y: {
                    title: { display: true, text: 'Rentabilidad Real (%)', color: '#00f2ff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#fff',
                        callback: function (value) { return value + '%'; }
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

//Grafica Seguros

// --- NUEVA GRÁFICA PARA SEGUROS ---
const ctxSegurosTrend = document.getElementById('graficaValorSeguros');

if (ctxSegurosTrend) {
    new Chart(ctxSegurosTrend, {
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    // LÍNEA DE TENDENCIA (Calidad)
                    type: 'line',
                    label: 'Calidad (Promedio)',
                    data: [25, 35, 30, 50, 65, 80],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#0725e4',
                    pointBorderWidth: 4,
                    pointRadius: 8,
                    tension: 0.1, // Línea casi recta como tu imagen
                    zIndex: 2
                },
                {
                    // BARRA SUPERIOR (Rosa claro)
                    type: 'bar',
                    label: 'Venta Nueva',
                    data: [15, 20, 25, 30, 35, 40],
                    backgroundColor: '#87ADFA',
                    borderRadius: 0,
                },
                {
                    // BARRA INFERIOR (Rosa fuerte)
                    type: 'bar',
                    label: 'Renovaciones',
                    data: [40, 50, 45, 60, 75, 90],
                    backgroundColor: '#9B67F6',
                    borderRadius: 0,
                }
            ]

        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // En tu imagen no se ve leyenda
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#fff', font: { family: 'Inter' } }
                },
                y: {
                    stacked: true, // Esto mantiene las barras una sobre otra
                    beginAtZero: true,
                    min: 0,
                    max: 100, // Escala de 0 a 100%
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#00f2ff', // Color cian para que combine
                        font: { size: 12 },
                        callback: function (value) {
                            return value + '%'; // Añade el símbolo de porcentaje
                        }
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // MAPA ACTINVER URALES
    const coordsUrales = [19.4319, -99.2132];
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map', { zoomControl: false }).setView(coordsUrales, 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
        L.marker(coordsUrales).addTo(map).bindPopup('Corporativo Montes Urales').openPopup();
        setTimeout(() => { map.invalidateSize(); }, 500);
    }

    // REDIMENSIONAMIENTO AUTOMÁTICO
    window.addEventListener('resize', () => {
        Chart.instances.forEach(chart => chart.resize());
    });
});

// Gráfica para la sección de Compliance
const ctxCompliance = document.getElementById('graficaCompliance');

if (ctxCompliance) {
    new Chart(ctxCompliance, {
        type: 'bar', // Tipo de barra para comparar porcentajes
        data: {
            labels: ['KYC/PLD', 'Cert. AMIB', 'Reportes CNBV', 'Auditoría'],
            datasets: [{
                label: 'Porcentaje de Avance',
                data: [98, 85, 70, 45], // Valores alineados con la tabla
                backgroundColor: [
                    'rgba(5, 20, 123, 0.99)', // Verde
                    'rgba(7, 11, 255, 0.97)', // Amarillo
                    'rgb(145, 13, 240)', // Cyan
                    'rgb(235, 1, 247)'   // Rojo
                ],
                borderColor: 'transparent',
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#fff',
                        // Esta función agrega el signo de % a los números del eje Y
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#fff' }
                }
            }
        }
    });
}

//GRAFICA BENCHMARK //
const ctxBenchmark = document.getElementById('graficaBenchmark');

if (ctxBenchmark) {
    new Chart(ctxBenchmark, {
        type: 'doughnut',
        data: {
            labels: ['Actinver (15.4%)', 'BBVA (22.1%)', 'Banorte (18.5%)', 'Santander (14.2%)', 'Otros (29.8%)'],
            datasets: [{
                data: [15.4, 22.1, 18.5, 14.2, 29.8],
                backgroundColor: [
                    'rgb(0, 255, 55)', // Verde Actinver
                    '#0a65ef',
                    '#a200a0',
                    '#e464ed',
                    '#400ac9'
                ],
                borderWidth: 0,
                borderColor: 'transparent'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%', // Esto hace el centro más grande para el texto
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: 'white', font: { size: 12 } }
                }
            }
        },
        // Bloque para dibujar el "100%" al centro
        plugins: [{
            id: 'centerText',
            beforeDraw: function (chart) {
                const width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                ctx.restore();
                const fontSize = (height / 150).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "white";

                const text = "100%",
                    textX = Math.round((chart.chartArea.left + chart.chartArea.right) / 2 - ctx.measureText(text).width / 2),
                    textY = Math.round((chart.chartArea.top + chart.chartArea.bottom) / 2);

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

// Gráfica para la sección de Marketing - SPINE FUNNEL (6 PASOS)
const ctxMarketing = document.getElementById('graficaMarketing');

if (ctxMarketing) {
    new Chart(ctxMarketing, {
        type: 'bar',
        data: {
            labels: [
                'Impresiones (1.2M)', 
                'Clics (85K)', 
                'Leads (2.8K)', 
                'Citas (1.1K)', 
                'Contratos (620)', 
                'Cuentas Activas (450)' // Esta es la etiqueta larga
            ],
            datasets: [{
                label: 'Volumen',
                data: [1200, 950, 700, 450, 250, 120], 
                backgroundColor: [
                    'rgba(66, 5, 117, 0.65)', 
                    'rgba(0, 25, 191, 0.59)',   
                    'rgba(5, 143, 255, 0.92)',   
                    'rgba(13, 202, 240, 0.73)',   
                    'rgba(0, 253, 131, 0.8)',   
                    '#00ff4c'                    
                ],
                borderWidth: 0,
                borderRadius: 5,
                barPercentage: 0.8 
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                // *** ESTO ES LO QUE ARREGLA EL PROBLEMA ***
                // Agregamos espacio extra a la izquierda para las etiquetas
                padding: {
                    left: 20 
                }
            },
            plugins: {
                legend: { display: false }
            },
            scales: {
    x: { display: false },
    y: {
        grid: { display: false },
        ticks: { 
            color: 'white', 
            font: { size: 12, family: 'Inter' }
        },
        // *** ESTA ES LA SOLUCIÓN DEFINITIVA ***
        afterFit: (axis) => {
            axis.width = 150; // Forzamos el ancho del área de texto a 150px
        }
    }
}
        }
    });
}

// Lógica para la sección de Loyalty
if (document.getElementById('graficaLoyalty')) {
    const ctxLoyalty = document.getElementById('graficaLoyalty').getContext('2d');
    new Chart(ctxLoyalty, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Retención de Clientes (%)',
                data: [92, 88, 85, 89, 91, 94],
                borderColor: '#0dcaf0', 
                backgroundColor: 'rgba(13, 202, 240, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00e5ff',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { 
                        color: '#0dcaf0',
                        callback: function(value) { return value + '%'; }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}

// Empieza loyalty

$(document).ready(function() {

    // 1. Inicializar Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s'
    });

    // 2. Lógica de Filtrado
    $('.filter-button-group').on('click', 'button', function() {
        // Obtener el valor del filtro (ej: .deuda, .variable o *)
        var filterValue = $(this).attr('data-filter');
        
        // Aplicar el filtro en el grid
        $grid.isotope({ filter: filterValue });

        // 3. Cambiar la clase "active" visualmente
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
    });

    // Opcional: Asegurar que el grid se acomode al cargar todas las imágenes
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

});

$(document).ready(function() {
    // Inicializa Isotope en el contenedor .grid
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Re-acomoda cuando carguen las imágenes
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    // Configura el clic de los botones
    $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        
        // Estilo visual de botón activo
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
    });
});