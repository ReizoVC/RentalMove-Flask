const headerPopover = document.getElementById('header-popover');
if (headerPopover) {
    headerPopover.addEventListener('click', function() {
        const dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.style.display = dropdownContent.style.display === 'none' || dropdownContent.style.display === '' ? 'flex' : 'none';
    });

    headerPopover.addEventListener('blur', function() {
        const dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.style.display = 'none';
    });
}

const navPopover = document.getElementById('nav-popover');
const popoverContent = document.getElementById('popover-content');

if (navPopover && popoverContent) {
    navPopover.addEventListener('click', function(event) {
        event.stopPropagation();
        if (window.innerWidth < 1100) {
            popoverContent.style.display = popoverContent.style.display === 'none' || popoverContent.style.display === '' ? 'flex' : 'none';
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1100) {
            popoverContent.style.display = 'flex';
        } else {
            popoverContent.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (window.innerWidth < 1100 && (!navPopover.contains(event.target) && !popoverContent.contains(event.target) || event.target.tagName === 'BUTTON')) {
            popoverContent.style.display = 'none';
        }
        if (!headerPopover.contains(event.target) && !document.getElementById('dropdown-content').contains(event.target)) {
            const dropdownContent = document.getElementById('dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        }
    });

    popoverContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}
