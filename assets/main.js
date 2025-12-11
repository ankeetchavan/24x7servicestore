document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Navigation Logic ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.nav-backdrop');

    if (burger && nav && backdrop) {
        function toggleNav() {
            nav.classList.toggle('active');
            backdrop.classList.toggle('active');
            burger.classList.toggle('active');
        }
        burger.addEventListener('click', toggleNav);
        backdrop.addEventListener('click', toggleNav);
    }

    // --- Google Ads Conversion Tracking ---
    // This function handles the click, sends the event to Google, and then follows the link.
    function gtag_report_conversion(url) {
        var callback = function () {
            if (typeof(url) != 'undefined') {
                window.location = url;
            }
        };

        // Safety timeout: If Google Ads takes too long or is blocked, proceed anyway after 500ms
        var safetyTimer = setTimeout(function() {
            callback();
        }, 500);

        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17617922277', // <--- IMPORTANT: If you have a Conversion Label (e.g., /AbCdEfG), add it here like 'AW-17617922277/AbCdEfG'
                'event_callback': function() {
                    clearTimeout(safetyTimer);
                    callback();
                }
            });
        } else {
            clearTimeout(safetyTimer);
            callback();
        }
        return false;
    }

    // Attach tracking to all Call and WhatsApp buttons
    const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp.com"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the link from opening immediately
            gtag_report_conversion(this.href); // Report conversion, then open link
        });
    });

});
