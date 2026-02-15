@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

body {
    font-family: 'Inter', sans-serif;
}

.fade-in {
    animation: fadeIn 1s ease-in;
}

.slide-up {
    animation: slideUp 0.8s ease-out;
}

.scale-hover {
    transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.scale-hover:hover {
    transform: scale(1.03);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.gradient-text {
    background: linear-gradient(90deg, #60a5fa, #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

::selection {
    background: #60a5fa;
    color: #fff;
}