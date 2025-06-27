// --- IMAGENES Y SCROLL (solo para index.html) ---
const textBlocks = document.querySelectorAll('.text-block');
const image = document.getElementById('main-image');

const edgardoContainer = document.querySelector('.edgardo-container');
const edgardoImages = ['img6.png', 'img7.png', 'img8.png'];

const agensContainer = document.querySelector('.agens-container');
const agensImages = ['img9.png', 'img13.png'];

const updateImageOnScroll = () => {
  if (!image) return;
  let imageUpdated = false;
  const viewportHeight = window.innerHeight;
  const centerY = viewportHeight / 2;

  if (edgardoContainer) {
    const rect = edgardoContainer.getBoundingClientRect();
    const totalHeight = rect.height;
    const distanceScrolled = Math.min(Math.max(centerY - rect.top, 0), totalHeight);
    const progress = distanceScrolled / totalHeight;

    if (progress > 0 && progress < 1) {
      const index = Math.min(Math.floor(progress * edgardoImages.length), edgardoImages.length - 1);
      const newImg = edgardoImages[index];
      if (!image.src.includes(newImg)) {
        image.style.opacity = 0;
        setTimeout(() => {
          image.src = `images/${newImg}`;
          image.style.opacity = 1;
        }, 300);
      }
      imageUpdated = true;
    }
  }

  if (!imageUpdated && agensContainer) {
    const rect = agensContainer.getBoundingClientRect();
    const totalHeight = rect.height;
    const distanceScrolled = Math.min(Math.max(centerY - rect.top, 0), totalHeight);
    const progress = distanceScrolled / totalHeight;

    if (progress > 0 && progress < 1) {
      const index = Math.min(Math.floor(progress * agensImages.length), agensImages.length - 1);
      const newImg = agensImages[index];
      if (!image.src.includes(newImg)) {
        image.style.opacity = 0;
        setTimeout(() => {
          image.src = `images/${newImg}`;
          image.style.opacity = 1;
        }, 300);
      }
      imageUpdated = true;
    }
  }

  if (!imageUpdated) {
    textBlocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      const isInCenter = rect.top < centerY && rect.bottom > centerY;

      if (isInCenter) {
        const newImg = block.getAttribute('data-img');
        if (!image.src.includes(newImg)) {
          image.style.opacity = 0;
          setTimeout(() => {
            image.src = `images/${newImg}`;
            image.style.opacity = 1;
          }, 300);
        }
      }
    });
  }
};

window.addEventListener('scroll', updateImageOnScroll);
window.addEventListener('load', updateImageOnScroll);

// --- MENÚ PESTAÑAS SIN ANIMACION ---
const menuTabs = document.querySelectorAll('.menu-tab');
const currentPage = location.pathname.split('/').pop() || 'index.html';

menuTabs.forEach(tab => {
  const target = tab.getAttribute('data-target');
  if (target === currentPage) {
    tab.classList.add('current');
    tab.style.pointerEvents = 'none';
  }
});

menuTabs.forEach(tab => {
  const target = tab.getAttribute('data-target');
  if (target && target !== currentPage) {
    tab.addEventListener('click', () => {
      window.location.href = target;
    });
  }
});

// --- INTERACTIVOS ---
const nombresImagenes = [
  'auto.png',
  'flor.png',
  'banco.png',
  'pelota.png',
  'botella.png',
  'remera.png',
  'mano.png',
  'zapato.png',
  'ventilador.png',
  'cartel.png',
  'vestido.png',
  'silla.png',
  'fibra.png',
  'obelisco.png',
  'edificio.png'
];

const container = document.getElementById('interactivos-container');

nombresImagenes.forEach((nombre, index) => {
  const div = document.createElement('div');
  div.className = 'objeto-interactivo';

  // Posición inicial más arriba y a la derecha
  div.style.left = `${700 + index * 40}px`;
  div.style.top = `${-20 + (index % 3) * 100}px`;

  // Ajustes de escala específicos
  let scale = 1;
  if (nombre === 'botella.png') scale = 0.8;
  if (nombre === 'cartel.png') scale = 0.8;
  if (nombre === 'pelota.png') scale = 0.9;
  if (nombre === 'edificio.png') scale = 0.94;
  if (nombre === 'mano.png') scale = 0.80;
  if (nombre === 'vestido.png') scale = 0.90;

  div.style.transform = `scale(${scale})`;

  const img = document.createElement('img');
  img.src = `images/interactivos/${nombre}`;
  img.style.width = '80%';
  img.draggable = false;

  div.appendChild(img);
  container.appendChild(div);

  hacerArrastrable(div);
});

// --- Función para hacer arrastrables los objetos ---
function hacerArrastrable(elemento) {
  let offsetX, offsetY, dragging = false;

  elemento.addEventListener('mousedown', (e) => {
    dragging = true;
    offsetX = e.clientX - elemento.offsetLeft;
    offsetY = e.clientY - elemento.offsetTop;
    elemento.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    elemento.style.left = `${e.clientX - offsetX}px`;
    elemento.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    elemento.style.cursor = 'grab';
  });
}
