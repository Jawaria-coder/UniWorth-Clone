document.addEventListener('DOMContentLoaded', () => {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});
