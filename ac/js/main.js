/**
 * AC Landing Page Dynamic Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // List of supported brands strictly as requested.
    const supportedBrands = [
        "IFB",
        "Whirlpool",
        "Blue Star",
        "Hitachi",
        "Mitsubishi",
        "O general",
        "Daikin",
        "Carrier", // Updated typo 'Career' to 'Carrier'
        "Voltas",
        "LG",
        "Samsung",
        "Panasonic",
        "Haier", // Updated typo 'Hiar' to 'Haier'
        "Godrej"
    ];

    // Helper to format string for comparison (lowercase, trimmed)
    const normalizeBrand = (brandStr) => {
        return brandStr.toLowerCase().replace(/\s+/g, '').replace('career', 'carrier').replace('hiar', 'haier');
    }

    // Get URL Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const requestedBrandParam = urlParams.get('brand');

    // Elements to mutate
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const brandLogoImg = document.getElementById('brand-logo');
    const heroBigLogoImg = document.getElementById('hero-big-logo');
    const brandTextLogoContainer = document.getElementById('brand-text-logo');
    const brandsSection = document.getElementById('brands-section');
    const allBrandsGrid = document.getElementById('all-brands-grid');

    let activeBrand = null;

    // Determine if requested brand is in our supported list
    if (requestedBrandParam) {
        const normalizedParam = normalizeBrand(requestedBrandParam);
        const match = supportedBrands.find(b => normalizeBrand(b) === normalizedParam);

        if (match) {
            activeBrand = match;
        } else {
            // Optional: If someone types ?brand=sony, we can just treat it as generic or still customize.
            // For a landing page, it's safer to customize to whatever they typed for max relevance, 
            // but let's stick to user prompt matching first. We will capitalize their input.
            activeBrand = requestedBrandParam.charAt(0).toUpperCase() + requestedBrandParam.slice(1);
        }
    }

    if (activeBrand) {
        // 1. DYNAMIC PAGE: SPECIFIC BRAND REQUESTED

        // Update document title
        document.title = `Authorized ${activeBrand} AC Service Center`;

        // Update Hero Text
        heroTitle.innerHTML = `Expert <span class="highlight">${activeBrand} AC Repair</span> at Your Doorstep`;
        heroSubtitle.innerText = `Fast, reliable, and professional ${activeBrand} certified service within 60 minutes. Book your trustworthy technician today.`;

        // Update Logo Setup. Assuming assets are named like `voltas-logo.png`
        const safeBrandName = activeBrand.toLowerCase().replace(/\s+/g, '-');
        const logoPath = `assets/${safeBrandName}-logo.png`;

        brandLogoImg.src = logoPath;
        if (heroBigLogoImg) heroBigLogoImg.src = logoPath;

        // When the logo loads, make sure text is hidden
        brandLogoImg.onload = () => {
            brandTextLogoContainer.style.display = 'none';
            brandLogoImg.style.display = 'block';
        };

        // When the logo fails, show text fallback with the brand name
        brandLogoImg.onerror = () => {
            brandLogoImg.style.display = 'none';
            brandTextLogoContainer.style.display = 'block';
            brandTextLogoContainer.innerText = `${activeBrand.toUpperCase()} SERVICE`;
        };

        if (heroBigLogoImg) {
            heroBigLogoImg.onerror = () => {
                heroBigLogoImg.parentElement.style.display = 'none'; // Hide the whole box if image fails
            };
        }

        // ** CRITICAL REQUIREMENT **: Hide other brands.
        // We completely hide the multi-brand section as requested.
        brandsSection.style.display = 'none';

    } else {
        // 2. GENERIC PAGE: NO BRAND REQUESTED (OR CATCH ALL)

        document.title = `Authorized Multi-Brand AC Service Center`;
        if (heroBigLogoImg) {
            heroBigLogoImg.src = 'assets/default-logo.png';
        }

        // Inject all supported brand badges into the grid
        allBrandsGrid.innerHTML = '';
        supportedBrands.forEach(brand => {
            const safeName = brand.toLowerCase().replace(/\s+/g, '-');
            const el = document.createElement('div');
            el.className = 'brand-badge';
            // We use an image with a text fallback using alt.
            el.innerHTML = `<img src="assets/${safeName}-logo.png" alt="${brand}" onerror="this.onerror=null; this.parentElement.innerText='${brand}'">`;
            allBrandsGrid.appendChild(el);
        });

        // The Brands section remains visible.
        brandsSection.style.display = 'block';
    }

    // Add sticky header behavior on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
