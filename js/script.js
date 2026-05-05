// Hapus hash fragment di URL dan paksa scroll ke atas saat direfresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.pathname);
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan scroll benar-benar di atas saat halaman selesai dimuat
    window.scrollTo(0, 0);
    
    // --- 1. PRELOADER (Loading Screen) ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('.main-content');
    const bar = document.getElementById('preloader-bar');
    const statusText = document.getElementById('preloader-text');

    const stages = [
        { width: '30%',  text: 'Memuat aset...' },
        { width: '60%',  text: 'Menyiapkan tampilan...' },
        { width: '85%',  text: 'Hampir selesai...' },
        { width: '100%', text: 'Selamat datang! 🎉' },
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < stages.length) {
            bar.style.width = stages[i].width;
            statusText.textContent = stages[i].text;
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    mainContent.classList.add('show');
                    typeWriter();
                }, 700);
            }, 400);
        }
    }, 500);

    // --- 1.5. TYPING EFFECT ---
    const typingElement = document.getElementById('typing-text');
    const textToType = "Hi, saya Noval Surya Herawan";
    let charIndex = 0;

    function typeWriter() {
        if (typingElement && charIndex < textToType.length) {
            typingElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 120); // Kecepatan ketik (120ms agar tidak terlalu cepat)
        }
    }


    // --- 2. HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu saat icon hamburger di-klik
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Ganti icon dari bars (garis tiga) ke times (silang)
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu otomatis jika salah satu link di-klik (hanya berlaku di mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Kembalikan icon hamburger
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    // --- 3. ACTIVE MENU ON SCROLL ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Deteksi section mana yang sedang berada di layar
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Setel class 'active' ke link navbar yang sesuai
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- 4. ANIMASI SAAT SCROLL (Intersection Observer) ---
    // Elemen akan muncul (fade-in & slide-up) saat di-scroll
    const observerOptions = {
        threshold: 0.1, // Trigger aktif ketika 10% elemen sudah terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Tambahkan class .visible (dari CSS)
                
                // Opsional: Jika ingin animasi hanya terjadi sekali, uncomment baris ini:
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Terapkan observer ke semua element <section>
    sections.forEach(section => {
        observer.observe(section);
    });


    // --- 5. SIMPLE FORM SUBMIT ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form untuk merefresh halaman
            
            // Logika pengiriman pesan, bisa diganti dengan fetch() ke backend
            alert('Pesan Anda berhasil dikirim! Terima kasih.');
            contactForm.reset(); // Kosongkan form setelah sukses
        });
    }
});
