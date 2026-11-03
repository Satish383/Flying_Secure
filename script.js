/* ============================================================
   FLYING SAUCER – PREMIUM 3D RESTAURANT WEBSITE
   js/script.js
   ============================================================ */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

    /* ============================================================
       1. PAGE LOADER
       ============================================================ */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => loader.classList.add('hidden'), 700);
        }
        revealOnScroll();
    });

    /* ============================================================
       2. NAVBAR – SCROLL & ACTIVE LINK
       ============================================================ */
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-fs .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavbarScroll() {
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Active link
        let current = '';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 140;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // Close mobile nav on link click
    document.querySelectorAll('.navbar-collapse .nav-link, .navbar-collapse .btn').forEach((el) => {
        el.addEventListener('click', () => {
            const collapse = document.getElementById('navMenu');
            if (collapse && collapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    /* ============================================================
       3. HERO PARTICLES
       ============================================================ */
    function createParticles() {
        if (prefersReducedMotion) return;
        const container = document.getElementById('heroParticles');
        if (!container) return;
        const count = isMobile ? 14 : 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = Math.random() * 30 + '%';
            p.style.animationDuration = (7 + Math.random() * 9) + 's';
            p.style.animationDelay = (Math.random() * 8) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            if (Math.random() > 0.65) {
                p.style.background = '#9B6DFF';
                p.style.boxShadow = '0 0 8px 2px rgba(155,109,255,0.4)';
            }
            container.appendChild(p);
        }
    }
    createParticles();

    /* ============================================================
       4. HERO MOUSE PARALLAX
       ============================================================ */
    if (!prefersReducedMotion && !isMobile) {
        const hero = document.getElementById('home');
        const heroBg = document.getElementById('heroBg');
        const floats = document.querySelectorAll('.hero-float');
        if (hero && heroBg) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                heroBg.style.transform = `scale(1.08) translate(${x * -18}px, ${y * -18}px)`;
                floats.forEach((f, i) => {
                    const depth = (i + 1) * 8;
                    f.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
                });
            });
            hero.addEventListener('mouseleave', () => {
                heroBg.style.transform = '';
                floats.forEach((f) => (f.style.transform = ''));
            });
        }
    }

    /* ============================================================
       5. REVEAL ON SCROLL (Intersection Observer)
       ============================================================ */
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || prefersReducedMotion) {
            reveals.forEach((el) => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        reveals.forEach((el) => observer.observe(el));
    }
    revealOnScroll();

    /* ============================================================
       6. 3D TILT EFFECT
       ============================================================ */
    function initTilt() {
        if (prefersReducedMotion || isMobile) return;
        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 14;
                const rotateX = (0.5 - y) * 14;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            });
        });
    }

    /* ============================================================
       7. MENU DATA
       ============================================================ */
    const menuData = [
        {
            category: 'Soups & Salad',
            items: [
                { name: 'Chicken The Caesar Salad', price: 463.25, desc: 'Fresh lettuce, croutons, olives, parmesan cheese, caesar dressing.', type: 'nonveg' },
                { name: 'Veg The Caesar Salad', price: 434.91, desc: 'Fresh lettuce, croutons, olives, parmesan cheese, caesar dressing.', type: 'veg' },
                { name: 'Green Salad', price: 216.91 },
                { name: 'Smoked Chicken Salad', price: 434.91, desc: 'Smoked chicken, mix green, mustard vinaigrette.', type: 'nonveg' },
                { name: 'The Fattoush Salad', price: 434.91, desc: 'Aromatic vegetables, kalamata olive, classic vinaigrette, crispy pita.', type: 'veg' },
                { name: 'Cream Of Mushroom Soup', price: 380.41, desc: 'Creamed mushroom puree, chilli oil essence.', type: 'veg' },
                { name: 'Minestrone Soup', price: 380.41, desc: 'Classic Italian tomato broth with aromatic vegetables.', type: 'veg' }
            ]
        },
        {
            category: 'Bar Bites',
            items: [
                { name: 'Beiruti Falafel Sesame Hummus', price: 467.61, desc: 'Classic chickpea fritters, hummus, pickled beet.', type: 'veg' },
                { name: 'Chopatti Keema Pav', price: 434.91, desc: 'Classic Parsi-style egg akuri, bun maska, spiced keema.', type: 'nonveg' },
                { name: 'Non Veg Dragon Roll', price: 434.91, desc: 'Thai-style stuffed rolls, sweet chilli ponzu.', type: 'nonveg' },
                { name: 'Veg Dragon Rolls', price: 380.41, desc: 'Thai-style stuffed rolls, sweet chilli ponzu.', type: 'veg' },
                { name: 'Melton Garlic Cheese Bread', price: 380.41, desc: 'Garlic bread topped with cheese cooked till melted.', type: 'veg' }
            ]
        },
        {
            category: 'Northern Plates',
            items: [
                { name: 'Black Dal Makhani', price: 489.41, popular: true, type: 'veg' },
                { name: 'Chicken Changezi', price: 652.91, type: 'nonveg' },
                { name: 'Chicken Do Pyaaza', price: 642.01, type: 'nonveg' },
                { name: 'Chicken Tikka Masala', price: 642.01, type: 'nonveg' },
                { name: 'Dogery Mutton Rogan Josh', price: 674.71, desc: 'Our version of Kashmiri mutton rogan josh.', type: 'nonveg' },
                { name: 'Egg Curry [2 Eggs]', price: 467.61, type: 'nonveg' },
                { name: 'Egg Masala [2 Eggs]', price: 500.31, type: 'nonveg' },
                { name: 'Ghee Infused Yellow Dal Tadka', price: 489.41, desc: 'Simmered yellow lentils tempered with desi ghee and whole red chilli.', type: 'veg' },
                { name: 'Gourmet Vegetable', price: 489.41, desc: 'Assorted vegetables, sundried tomato, onion and tomato tawa masala.', type: 'veg' },
                { name: 'Hari Mirchi Chicken Curry', price: 598.41, desc: 'Classic slow-cooked chicken in rich spiced grounded gravy.', type: 'nonveg' },
                { name: 'Lazeez Butter Chicken', price: 642.01, desc: 'Dum ka chicken, makhani classic gravy, kasuri methi, tempered with ghee and red chilli.', type: 'nonveg', popular: true },
                { name: 'Mushroom Masala', price: 489.41, type: 'veg' },
                { name: 'Mutton Rara', price: 707.41, type: 'nonveg' },
                { name: 'Palak Corn', price: 467.61, type: 'veg' },
                { name: 'Palak Paneer', price: 489.41, type: 'veg' },
                { name: 'Paneer Do Pyaaza', price: 489.41, type: 'veg' },
                { name: 'Paneer Kolhapuri', price: 489.41, type: 'veg' },
                { name: 'Paneer Lababdar', price: 489.41, desc: 'Old-time favourite velvety rich tomato cashew gravy with bell peppers and cottage cheese.', type: 'veg' },
                { name: 'Paneer Makhani', price: 489.41, type: 'veg' },
                { name: 'Paneer Pasanda', price: 489.41, type: 'veg' },
                { name: 'Paneer Tikka Masala', price: 489.41, type: 'veg', popular: true },
                { name: 'Pind Da Kadhai Paneer', price: 489.41, desc: 'Cottage cheese, rich onion and tomato gravy.', type: 'veg' },
                { name: 'Soya Chaap Masala', price: 478.51, type: 'veg' }
            ]
        },
        {
            category: 'Kebabs',
            items: [
                { name: 'Awadhi Vegetable Seekh', price: 533.01, desc: 'Aromatic vegetable minced with spice.', type: 'veg' },
                { name: 'Double Wood Fired Fish Tikka', price: 674.71, desc: 'Fish tikka, special ketchup, sirka onion.', type: 'nonveg' },
                { name: 'Laham Adana Kebab', price: 642.01, desc: 'Arabic-spiced mutton mince kebab.', type: 'nonveg' },
                { name: 'Old School Chicken Seekh Kebab', price: 576.61, desc: 'Subtly spiced, blackened smoked seekh kebab.', type: 'nonveg' },
                { name: 'Old School Mutton Seekh Kebab', price: 652.91, type: 'nonveg' },
                { name: 'Persian Joojeh Kebab', price: 576.61, desc: 'Persian spice-marinated chicken, house relishes, salad.', type: 'nonveg' },
                { name: 'Pineapple Churrasco', price: 489.41, desc: 'Spiced and brown sugar-marinated chargrilled pineapple.', type: 'veg' }
            ]
        },
        {
            category: 'Platters',
            items: [
                { name: 'Non Veg The Classic Indian Platter', price: 1415.91, desc: 'Fine Indian appetizers, house relishes and masala onion, including mutton seekh kebab, chicken seekh kebab, fish tikka, malai tikka and chicken tikka.', type: 'nonveg' },
                { name: 'Veg The Classic Indian Platter', price: 1197.91, desc: 'Fine Indian appetizers, house relishes and masala onion, including cheese malai broccoli, paneer tikka, seekh kebab, dahi kebab and apricot corn seekh.', type: 'veg' }
            ]
        },
        {
            category: 'Flying Wings & Fries',
            items: [
                { name: 'Chicken Barbeque Wings', price: 652.91, desc: 'Jalapeno, crispy smoked chicken wings, garlic mayonnaise, cilantro.', type: 'nonveg' },
                { name: 'Sriracha Chilli Wings', price: 576.61, desc: 'Smoked chicken wings, fresh jalapeno and scallion.', type: 'nonveg' },
                { name: 'Wings In Heaven Sauce', price: 576.61, desc: 'Sichuan sauce tossed chicken wings with scallion.', type: 'nonveg' }
            ]
        },
        {
            category: 'Dimsums',
            items: [
                { name: 'Chicken Gyoza [5 Pieces]', price: 543.91, type: 'nonveg', popular: true }
            ]
        },
        {
            category: 'Pizza',
            items: [
                { name: 'Chicken Jalapeno Pizza [12 Inches]', price: 620.21, desc: 'Fresh mozzarella, chilli roast chicken, fresh arugula leaves and jalapenos.', type: 'nonveg' },
                { name: 'Greek Lamb And Mint Pizza [12 Inches]', price: 620.21, desc: 'Lamb mince, roasted jeera, mint and feta cheese.', type: 'nonveg' },
                { name: 'Paneer Tikka Paprika [12 Inches]', price: 620.21, desc: 'Paneer tikka, sirka onion, bell pepper and chilli paprika.', type: 'veg' },
                { name: 'Pulled Barbeque Chicken Pizza [12 Inches]', price: 674.71, desc: 'Smoked barbecued chicken, melted chilli mozzarella and coriander.', type: 'nonveg' },
                { name: 'Rocket And Bocconcini Pizza [12 Inches]', price: 620.21, desc: 'Tomato, basil, bocconcini, mozzarella cheese and rocket.', type: 'veg' },
                { name: 'Sufiyana Chicken Tikka Pizza [12 Inches]', price: 674.71, desc: 'Chicken tikka, onion, makhani mayo, bell pepper and fresh cilantro.', type: 'nonveg' },
                { name: 'TFS Margherita Pizza', price: 565.71, desc: 'Tomato, basil and mozzarella cheese.', type: 'veg' }
            ]
        },
        {
            category: 'Pasta',
            items: [
                { name: 'Aglio Olio Pasta', price: 543.91, desc: 'Garlic, chilli flakes, olive, olive oil, spaghetti.', type: 'veg' },
                { name: 'Penne Alfredo', price: 543.91, desc: 'Parmesan, rich creamy sauce, olive, extra olive oil.', type: 'veg' },
                { name: 'Penne Arrabbiata', price: 543.91, desc: 'Spicy tomato sauce, extra virgin olive oil.', type: 'veg' },
                { name: 'Penne Pesto', price: 543.91, desc: 'Walnut basil pesto, olives, sundried tomato.', type: 'veg' }
            ]
        },
        {
            category: 'Biryani, Rice & Noodles',
            items: [
                { name: 'Chicken Dum Biryani', price: 643.10, type: 'nonveg', popular: true },
                { name: 'Chicken Chilli Garlic Noodles', price: 467.61, desc: 'Onion, carrot, cabbage, spring onion, bell pepper.', type: 'nonveg' },
                { name: 'Chicken Hakka Noodles', price: 467.61, desc: 'Bell pepper, onion, spring onion.', type: 'nonveg' },
                { name: 'Chicken Noodles', price: 467.61, desc: 'Onion, carrot, cabbage, spring onion, bell pepper.', type: 'nonveg' },
                { name: 'Chicken Schezwan Fried Rice', price: 467.61, type: 'nonveg' },
                { name: 'Chicken Schezwan Noodles', price: 467.61, type: 'nonveg' },
                { name: 'Chilli Garlic Chicken Fried Rice', price: 467.61, type: 'nonveg' },
                { name: 'Chilli Garlic Fried Rice', price: 434.91, type: 'veg' },
                { name: 'Vegetable Chilli Garlic Noodles', price: 434.91, desc: 'Onion, carrot, cabbage, spring onion, bell pepper.', type: 'veg' },
                { name: 'Egg Biryani [2 Eggs]', price: 522.11, type: 'nonveg' },
                { name: 'Vegetable Hakka Noodles', price: 434.91, desc: 'Bell pepper, onion, spring onion.', type: 'veg' },
                { name: 'Jeera Rice', price: 271.41, type: 'veg' },
                { name: 'Mutton Dum Biryani', price: 707.41, type: 'nonveg' },
                { name: 'Steamed Rice', price: 238.71, type: 'veg' },
                { name: 'Vegetable Dum Biryani', price: 543.91, type: 'veg' },
                { name: 'Veg Fried Rice', price: 434.91, type: 'veg' },
                { name: 'Veg Schezwan Fried Rice', price: 434.91, type: 'veg' },
                { name: 'Veg Schezwan Noodles', price: 434.91, type: 'veg' },
                { name: 'Vegetable Noodles', price: 434.91, desc: 'Onion, carrot, cabbage, spring onion, bell pepper.', type: 'veg' }
            ]
        },
        {
            category: 'Flying Combos',
            groups: [
                {
                    title: 'Dal Makhani Combos',
                    items: [
                        { name: '2 Aloo Kulcha With Dal Makhani', price: 434.91, type: 'veg' },
                        { name: '2 Aloo Pyaaz Kulcha With Dal Makhani', price: 434.91, type: 'veg' },
                        { name: '2 Butter Naan With Dal Makhani', price: 434.91, type: 'veg' },
                        { name: '2 Paneer Amritsari Kulcha With Dal Makhani', price: 467.61, type: 'veg' }
                    ]
                },
                {
                    title: 'Flying Paneer Combos',
                    items: [
                        { name: '2 Butter Naan With Paneer Tikka Masala', price: 467.61, type: 'veg' },
                        { name: '2 Garlic Naan With Paneer Do Pyaaza', price: 467.61, type: 'veg' },
                        { name: '2 Laccha Paratha With Paneer Pasanda', price: 467.61, type: 'veg' }
                    ]
                },
                {
                    title: 'Flying Chicken Combos',
                    items: [
                        { name: '2 Garlic Naan With Butter Chicken', price: 467.61, type: 'nonveg' },
                        { name: '2 Naan With Chicken Kali Mirch', price: 467.61, type: 'nonveg' },
                        { name: '2 Tandoori Roti With Chicken Gharwala', price: 467.61, type: 'nonveg' },
                        { name: 'Egg Curry With Tandoori Roti', price: 434.91, type: 'nonveg' }
                    ]
                },
                {
                    title: 'Veg Chinese Combos',
                    items: [
                        { name: 'Bullet Chilli Paneer With Fried Rice', price: 467.61, type: 'veg' },
                        { name: 'Veg Fried Rice With Thai Curry', price: 467.61, type: 'veg' },
                        { name: 'Veg Manchurian With Fried Rice', price: 467.61, type: 'veg' },
                        { name: 'Veg Noodles With Bullet Chilli Paneer', price: 467.61, type: 'veg' },
                        { name: 'Veg Noodles With Veg Manchurian', price: 467.61, type: 'veg' }
                    ]
                },
                {
                    title: 'Non-Veg Chinese Combos',
                    items: [
                        { name: 'Calcutta Chilli Chicken With Fried Rice', price: 489.41, type: 'nonveg' },
                        { name: 'Chicken Hot Garlic Sauce With Fried Rice', price: 489.41, type: 'nonveg' },
                        { name: 'Noodles With Calcutta Chilli Chicken', price: 489.41, type: 'nonveg' },
                        { name: 'Thai Curry With Fried Rice [Non-Veg]', price: 489.41, type: 'nonveg' }
                    ]
                }
            ]
        },
        {
            category: 'North Indian Main Course',
            items: [
                { name: 'Achari Soya Chaap [8 Pieces]', price: 467.61, type: 'veg' },
                { name: 'Malai Soya Chaap [8 Pieces]', price: 489.41, type: 'veg' },
                { name: 'Tandoori Mushroom [8 Pieces]', price: 500.31, type: 'veg' },
                { name: 'Tandoori Soya Chaap [8 Pieces]', price: 467.61, type: 'veg' }
            ]
        },
        {
            category: 'Small Plates',
            items: [
                { name: 'Amritsari Fish Finger', price: 576.61, desc: 'Crusted fish finger, mint relish, masala onion.', type: 'nonveg' },
                { name: 'Apricot Corn Seekh', price: 467.61, desc: 'Apricot, corn, cottage cheese and Indian herb mix.', type: 'veg' },
                { name: 'Basil Malai Chicken Tikka', price: 543.91, desc: 'Basil-infused malai tikka, basil, garlic and salsa.', type: 'nonveg' },
                { name: 'Beijing Chicken', price: 522.11, desc: 'Beijing chilli sauce, bell pepper, onion, peanut, spring onion and dry chilli.', type: 'nonveg', popular: true },
                { name: 'Calcutta Chilli Chicken', price: 522.11, type: 'nonveg' },
                { name: 'Cheese Malai Broccoli', price: 511.21, desc: 'Rich creamy marinated broccoli.', type: 'veg' },
                { name: 'Chicken Dragon Spring Rolls', price: 380.41, type: 'nonveg' },
                { name: 'Chilli Paneer', price: 424.01, type: 'veg' },
                { name: 'Chilli Sambal Mushroom', price: 434.91, type: 'veg' },
                { name: 'Chipotle Paneer Tikka', price: 511.21, desc: 'Fresh cottage cheese, chipotle chilli marinade, avocado chutney.', type: 'veg' },
                { name: 'Classic Chicken Tikka', price: 511.21, type: 'nonveg', popular: true },
                { name: 'Corn Salt And Pepper', price: 467.61, type: 'veg' },
                { name: 'Dahi Kebab [6 Pieces]', price: 511.21, desc: 'Served with chilli mint curd and fruit chutney.', type: 'veg' },
                { name: 'Dragon Spring Rolls', price: 380.41, type: 'veg' },
                { name: 'Drums Of Heaven', price: 543.91, desc: 'Served with onion, bell pepper and Schezwan sauce.', type: 'nonveg' },
                { name: 'Hari Mirch Chicken Tikka [8 Pieces]', price: 500.31, type: 'nonveg' },
                { name: 'Honey Chilli Fries', price: 467.61, desc: 'Honey, chilli roots, onion and sesame.', type: 'veg' },
                { name: 'Malai Chicken Tikka', price: 511.21, type: 'nonveg' },
                { name: 'Traditional Mushroom Galouti', price: 511.21, desc: 'Creamy smoked traditional galouti kebab with ulta tawa ka paratha.', type: 'veg' }
            ]
        },
        {
            category: 'Sharing Plates',
            items: [
                { name: 'Classic Chicken Manchurian', price: 380.41, type: 'nonveg' },
                { name: 'Classic Manchurian', price: 358.61, type: 'veg' },
                { name: 'Grilled Cous Cous Veggie', price: 609.31, desc: 'Mix greens, charred peppers, chickpeas, chimichurri.', type: 'veg' },
                { name: 'Grilled Fish Fillet', price: 761.91, desc: 'Saffron couscous, lemon butter garlic sauce, sauteed vegetables.', type: 'nonveg' },
                { name: 'Peri Peri Grilled Chicken', price: 663.81, desc: 'Grilled chicken, parsley rice, butter vegetables.', type: 'nonveg' },
                { name: 'Thai Basil Black Pepper Sauce', price: 587.51, desc: 'Garlic, cashew, corn, water chestnuts.', type: 'veg' },
                { name: 'Thai Curry', price: 434.91, type: 'veg' }
            ]
        },
        {
            category: 'Breads',
            items: [
                { name: 'Cheese Garlic Naan', price: 140.61, type: 'veg' },
                { name: 'Butter Laccha Paratha', price: 118.81, type: 'veg' },
                { name: 'Chilli Laccha Paratha', price: 140.61, type: 'veg' },
                { name: 'Plain Tandoori Roti', price: 75.21, type: 'veg' },
                { name: 'Butter Tandoori Roti', price: 86.11, type: 'veg' },
                { name: 'Butter Tandoori Naan', price: 97.01, type: 'veg' },
                { name: 'Garlic Tandoori Naan', price: 107.91, type: 'veg' },
                { name: 'Plain Tandoori Naan', price: 86.11, type: 'veg' },
                { name: 'Chilli Tandoori Roti', price: 97.01, type: 'veg' }
            ]
        },
        {
            category: 'Desserts',
            items: [
                { name: 'Blueberry Cheesecake', price: 380.41, type: 'veg' },
                { name: 'Gulab Jamun Mix Nuts Rabri', price: 380.41, type: 'veg' },
                { name: 'Phirni', price: 358.61, type: 'veg' }
            ]
        }
    ];

    /* ============================================================
       8. PRICE FORMAT
       ============================================================ */
    function formatPrice(num) {
        return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    /* ============================================================
       9. BUILD MENU TABS & GRID
       ============================================================ */
    const menuTabsEl = document.getElementById('menuTabs');
    const menuGridEl = document.getElementById('menuGrid');
    const menuSearchEl = document.getElementById('menuSearch');
    const menuEmptyEl = document.getElementById('menuEmpty');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let activeCategory = 'all';
    let searchTerm = '';
    let activeFilter = 'all';

    function buildTabs() {
        if (!menuTabsEl) return;
        let html = '<button class="menu-tab active" data-cat="all">All Items</button>';
        menuData.forEach((cat) => {
            html += `<button class="menu-tab" data-cat="${cat.category}">${cat.category}</button>`;
        });
        menuTabsEl.innerHTML = html;

        menuTabsEl.querySelectorAll('.menu-tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                menuTabsEl.querySelectorAll('.menu-tab').forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.dataset.cat;
                renderMenu();
            });
        });
    }

    function typeBadge(type) {
        if (type === 'veg') return '<span class="badge-veg"><span class="veg-dot"></span>Veg</span>';
        if (type === 'nonveg') return '<span class="badge-nonveg"><span class="nonveg-dot"></span>Non-Veg</span>';
        return '';
    }

    function menuItemHTML(item, idx) {
        const typeClass = item.type || '';
        let html = `<div class="menu-item" style="animation-delay:${Math.min(idx * 30, 400)}ms">
      <div class="menu-item-top">
        <h4 class="menu-item-name">${item.name}</h4>
        <span class="menu-item-price">${formatPrice(item.price)}</span>
      </div>`;
        if (item.desc) html += `<p class="menu-item-desc">${item.desc}</p>`;
        const badges = [];
        if (item.type === 'veg') badges.push('<span class="badge-veg"><span class="veg-dot"></span>Veg</span>');
        if (item.type === 'nonveg') badges.push('<span class="badge-nonveg"><span class="nonveg-dot"></span>Non-Veg</span>');
        if (item.popular) badges.push('<span class="badge-pop"><i class="bi bi-star-fill me-1"></i>Popular</span>');
        if (badges.length) html += `<div class="menu-item-badges">${badges.join('')}</div>`;
        html += '</div>';
        return html;
    }

    function matchesFilters(item) {
        // Filter by veg/nonveg
        if (activeFilter === 'veg' && item.type !== 'veg') return false;
        if (activeFilter === 'nonveg' && item.type !== 'nonveg') return false;
        // Search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const inName = item.name.toLowerCase().includes(term);
            const inDesc = item.desc ? item.desc.toLowerCase().includes(term) : false;
            if (!inName && !inDesc) return false;
        }
        return true;
    }

    function renderMenu() {
        if (!menuGridEl) return;
        let html = '';
        let visibleCount = 0;

        menuData.forEach((cat) => {
            if (activeCategory !== 'all' && activeCategory !== cat.category) return;

            if (cat.groups) {
                // Grouped combos
                cat.groups.forEach((group) => {
                    const groupItems = group.items.filter(matchesFilters);
                    if (groupItems.length) {
                        html += `<div class="menu-subgroup">${group.title}</div>`;
                        groupItems.forEach((item, i) => {
                            html += menuItemHTML(item, visibleCount + i);
                        });
                        visibleCount += groupItems.length;
                    }
                });
            } else if (cat.items) {
                const items = cat.items.filter(matchesFilters);
                if (items.length) {
                    // Show category label when viewing "all"
                    if (activeCategory === 'all' && !searchTerm) {
                        html += `<div class="menu-subgroup">${cat.category}</div>`;
                    }
                    items.forEach((item, i) => {
                        html += menuItemHTML(item, visibleCount + i);
                    });
                    visibleCount += items.length;
                }
            }
        });

        menuGridEl.innerHTML = html;

        if (menuEmptyEl) {
            menuEmptyEl.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        // Re-init tilt for dynamically added items (optional, keep lightweight)
        if (!prefersReducedMotion && !isMobile) {
            menuGridEl.querySelectorAll('.menu-item').forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-4px)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }
    }

    // Search
    if (menuSearchEl) {
        menuSearchEl.addEventListener('input', (e) => {
            searchTerm = e.target.value.trim();
            renderMenu();
        });
    }

    // Veg / Non-veg filters
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderMenu();
        });
    });

    buildTabs();
    renderMenu();

    /* ============================================================
       10. SIGNATURE DISHES
       ============================================================ */
    const signatureDishes = [
        { name: 'Dimsums', desc: 'Delicate, handcrafted dumplings steamed to perfection.', price: 543.91, type: 'nonveg', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80', tag: 'Guest Favourite' },
        { name: 'Dal Makhani', desc: 'Black lentils slow-simmered overnight with butter and cream.', price: 489.41, type: 'veg', img: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SfB4f9V7N46SFnpZuduywBIaJOJcMD0hs4BQJzuwvOWulLDumlOAsNtV5TwdWlMM5J3Bg_MYrVcTfB_JpulxHsYWM6jE4PwGXEcvsryXkIPnkRznRUFzap6FN9zn1TqifZQ0JyrScVyj0=w222-h370-n-k-no-nu', tag: 'Signature' },
        { name: 'Beijing Chicken', desc: 'Wok-tossed chicken in Beijing chilli sauce with peanuts.', price: 522.11, type: 'nonveg', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', tag: 'Popular' },
        { name: 'Dahi Kebab', desc: 'Creamy hung-curd kebabs with chilli mint curd and fruit chutney.', price: 511.21, type: 'veg', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80', tag: 'Chef Special' },
        { name: 'Butter Chicken', desc: 'Tandoor-charred chicken in velvety makhani gravy.', price: 642.01, type: 'nonveg', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80', tag: 'Best Seller' },
        { name: 'Chicken Dum Biryani', desc: 'Fragrant basmati rice layered with spiced chicken, cooked on dum.', price: 643.10, type: 'nonveg', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', tag: 'Signature' },
        { name: 'Paneer Tikka Masala', desc: 'Tandoori paneer simmered in a rich, smoky tomato gravy.', price: 489.41, type: 'veg', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80', tag: 'Popular' },
        { name: 'Chicken Tikka', desc: 'Classic char-grilled chicken tikka with smoky spices.', price: 511.21, type: 'nonveg', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', tag: 'Guest Favourite' }
    ];

    function renderSignature() {
        const grid = document.getElementById('signatureGrid');
        if (!grid) return;
        let html = '';
        signatureDishes.forEach((d) => {
            const badgeClass = d.type === 'veg' ? 'veg' : 'nonveg';
            const badgeText = d.type === 'veg' ? 'Veg' : 'Non-Veg';
            html += `
        <div class="col-sm-6 col-lg-3 reveal">
          <div class="dish-card tilt-card">
            <div class="dish-img-wrap">
              <span class="dish-badge ${badgeClass}"><span class="${badgeClass === 'veg' ? 'veg-dot' : 'nonveg-dot'}"></span>${badgeText}</span>
              <img src="${d.img}" alt="${d.name}" loading="lazy">
            </div>
            <div class="dish-body">
              <h4 class="dish-name">${d.name}</h4>
              <p class="dish-desc">${d.desc}</p>
              <div class="dish-footer">
                <span class="dish-price">${formatPrice(d.price)}</span>
                <span class="dish-tag">${d.tag}</span>
              </div>
            </div>
          </div>
        </div>`;
        });
        grid.innerHTML = html;
    }
    renderSignature();

    /* ============================================================
       11. GALLERY
       ============================================================ */
    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80', alt: 'Luxury restaurant interior', cls: 'wide' },
        { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80', alt: 'Elegant dining table setup', cls: '' },
        { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&q=80', alt: 'Lounge ambience', cls: 'tall' },
        { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80', alt: 'Social dining experience', cls: '' },
        { src: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=700&q=80', alt: 'Premium food presentation', cls: '' },
        { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=700&q=80', alt: 'Cocktails and drinks', cls: '' },
        { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=80', alt: 'Restaurant décor and lighting', cls: 'wide' },
        { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80', alt: 'Beautifully plated dish', cls: '' },
        { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80', alt: 'Dining arrangement', cls: '' },
        { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=700&q=80', alt: 'Food and drinks spread', cls: '' }
    ];

    function renderGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        let html = '';
        galleryImages.forEach((img, i) => {
            html += `<div class="gallery-item ${img.cls} reveal" data-index="${i}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      </div>`;
        });
        grid.innerHTML = html;
    }
    renderGallery();

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        const idx = parseInt(item.dataset.index, 10);
        const img = galleryImages[idx];
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
    });

    /* ============================================================
       12. TESTIMONIAL CAROUSEL
       ============================================================ */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;
    let autoplayTimer = null;

    function showSlide(idx) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        currentSlide = idx;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoplay() {
        if (prefersReducedMotion) return;
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 5500);
    }
    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.slide, 10));
            startAutoplay();
        });
    });

    const carouselEl = document.querySelector('.testimonial-carousel');
    carouselEl?.addEventListener('mouseenter', stopAutoplay);
    carouselEl?.addEventListener('mouseleave', startAutoplay);

    if (slides.length) {
        showSlide(0);
        startAutoplay();
    }

    /* ============================================================
       13. RESERVATION FORM → WHATSAPP
       ============================================================ */
    const reservationForm = document.getElementById('reservationForm');
    const RESTAURANT_PHONE = '919669009132';

    if (reservationForm) {
        // Set min date to today
        const dateInput = document.getElementById('resDate');
        const today = new Date().toISOString().split('T')[0];
        if (dateInput) dateInput.setAttribute('min', today);

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('resName');
            const mobile = document.getElementById('resMobile');
            const email = document.getElementById('resEmail');
            const date = document.getElementById('resDate');
            const time = document.getElementById('resTime');
            const guests = document.getElementById('resGuests');
            const requests = document.getElementById('resRequests');

            // Reset validation
            [name, mobile, email, date, time, guests].forEach((f) => f.classList.remove('is-invalid'));

            let valid = true;
            if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
            if (!mobile.value.trim() || !/^[0-9+\s-]{7,15}$/.test(mobile.value.trim())) { mobile.classList.add('is-invalid'); valid = false; }
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('is-invalid'); valid = false; }
            if (!date.value) { date.classList.add('is-invalid'); valid = false; }
            if (!time.value) { time.classList.add('is-invalid'); valid = false; }
            if (!guests.value) { guests.classList.add('is-invalid'); valid = false; }

            if (!valid) {
                // Focus first invalid
                const firstInvalid = reservationForm.querySelector('.is-invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Format date nicely
            const dateObj = new Date(date.value + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

            const message =
                `*New Table Reservation Request – Flying Saucer Bhopal*\n\n` +
                `👤 *Name:* ${name.value.trim()}\n` +
                `📞 *Mobile:* ${mobile.value.trim()}\n` +
                `📧 *Email:* ${email.value.trim()}\n` +
                `📅 *Date:* ${formattedDate}\n` +
                `⏰ *Time:* ${time.value}\n` +
                `👥 *Guests:* ${guests.value}\n` +
                `📝 *Special Requests:* ${requests.value.trim() || 'None'}\n\n` +
                `Please confirm my reservation. Thank you!`;

            const waUrl = `https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ============================================================
       14. SCROLL TO TOP
       ============================================================ */
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ============================================================
       15. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });

    /* ============================================================
       16. YEAR IN FOOTER
       ============================================================ */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ============================================================
       17. INIT TILT FOR STATIC CARDS
       ============================================================ */
    // Run after signature render
    setTimeout(initTilt, 100);

    /* ============================================================
       18. PREMIUM CURSOR (Desktop only)
       ============================================================ */
    if (!prefersReducedMotion && !isMobile && window.matchMedia('(hover: hover)').matches) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
      position: fixed;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(214,180,119,0.9), rgba(155,109,255,0.4));
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
      box-shadow: 0 0 14px rgba(214,180,119,0.6);
      mix-blend-mode: screen;
    `;
        document.body.appendChild(cursor);

        let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        let tx = cx, ty = cy;

        window.addEventListener('mousemove', (e) => {
            tx = e.clientX; ty = e.clientY;
        });

        function animateCursor() {
            cx += (tx - cx) * 0.22;
            cy += (ty - cy) * 0.22;
            cursor.style.left = cx + 'px';
            cursor.style.top = cy + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow on interactive elements
        document.querySelectorAll('a, button, .gallery-item, .dish-card, .feature-card, .menu-item').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '28px';
                cursor.style.height = '28px';
                cursor.style.background = 'radial-gradient(circle, rgba(155,109,255,0.85), rgba(214,180,119,0.4))';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '10px';
                cursor.style.height = '10px';
                cursor.style.background = 'radial-gradient(circle, rgba(214,180,119,0.9), rgba(155,109,255,0.4))';
            });
        });
    }

})();