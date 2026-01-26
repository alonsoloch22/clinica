document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE NAVEGACIÓN (SPA) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-header-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Quitar clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 2. Agregar clase active al link clickeado
            this.classList.add('active');

            // 3. Obtener el target (ej: 'clientes', 'dashboard')
            const targetId = this.getAttribute('data-target');

            // 4. Actualizar Título de la página
            const iconHTML = this.querySelector('i').outerHTML;
            const textHTML = this.childNodes[1].textContent; // Obtiene el texto después del icono
            pageTitle.innerHTML = `${iconHTML} ${textHTML}`;

            // 5. Ocultar todas las secciones y mostrar la correcta
            sections.forEach(section => {
                section.classList.remove('active');
                if(section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // --- GRÁFICO (Solo se inicializa una vez) ---
    const ctx = document.getElementById('cashFlowChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Saldo',
                    data: [35, 50, 60, 40, 50, 80],
                    backgroundColor: '#1e88e5',
                    borderRadius: 4,
                    order: 2
                },
                {
                    type: 'line',
                    label: 'Ingresos',
                    data: [60, 40, 55, 65, 75, 65],
                    borderColor: '#00897b',
                    borderWidth: 2,
                    tension: 0.4,
                    order: 1
                },
                {
                    type: 'line',
                    label: 'Gastos',
                    data: [40, 30, 50, 45, 60, 85],
                    borderColor: '#e53935',
                    borderWidth: 2,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true } }
        }
    });

    console.log("Sistema ERP cargado. Navegación activa.");
});