// ============================================================================
// SAÚDE & FORMA - Script Principal
// ============================================================================

// Estado global da aplicação
const appState = {
    cart: {
        items: [],
        total: 0
    },
    favorites: [],
    currentProduct: {
        id: 1,
        name: 'Creatina 100% Pura 120 Cápsulas Hardcore',
        price: 44.74,
        originalPrice: 53.90,
        quantity: 1,
        size: '120',
        flavor: 'sem-sabor',
        image: 'images/produtos/creatina_hardcore_integralmedica.webp'
    }
};

let elements = {};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando aplicação...');
    
    elements = {
        searchInput: document.getElementById('searchInput'),
        searchBtn: document.getElementById('searchBtn'),
        cartBtn: document.getElementById('cartBtn'),
        cartBadge: document.getElementById('cartBadge'),
        quantityDisplay: document.getElementById('quantity'),
        increaseBtn: document.getElementById('increaseBtn'),
        decreaseBtn: document.getElementById('decreaseBtn'),
        addToCartBtn: document.getElementById('addToCartBtn'),
        sizeSelect: document.getElementById('sizeSelect'),
        flavorSelect: document.getElementById('flavorSelect'),
        mobileMenuOverlay: document.getElementById('mobileMenuOverlay'),
        closeMenuBtn: document.getElementById('closeMenuBtn'),
        categoriasDropdownBtn: document.getElementById('categoriasDropdownBtn'),
        categoriasMenu: document.getElementById('categoriasMenu'),
        wheySubmenuToggle: document.getElementById('wheySubmenuToggle'),
        wheySubmenuItems: document.getElementById('wheySubmenuItems')
    };

    initializeEventListeners();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    initializeProductOptions();
    updateQuantityDisplay();
    updateCartDisplay();
    initializeLazyLoading();
    initializeSmoothScroll();
    initThemeToggle();
    
    console.log('✅ Aplicação inicializada com sucesso');
});

// ============================================================================
// EVENT LISTENERS
// ============================================================================
function initializeEventListeners() {
    // Busca
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', handleSearch);
    }
    if (elements.searchInput) {
        elements.searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // Quantidade do produto
    if (elements.increaseBtn) {
        elements.increaseBtn.addEventListener('click', increaseQuantity);
    }
    if (elements.decreaseBtn) {
        elements.decreaseBtn.addEventListener('click', decreaseQuantity);
    }

    // Carrinho
    if (elements.addToCartBtn) {
        elements.addToCartBtn.addEventListener('click', addToCart);
    }
    if (elements.sizeSelect) {
        elements.sizeSelect.addEventListener('change', updateProductSize);
    }
    if (elements.flavorSelect) {
        elements.flavorSelect.addEventListener('change', updateProductFlavor);
    }
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', showCart);
    }
    if (elements.closeMenuBtn) {
        elements.closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    if (elements.mobileMenuOverlay) {
        elements.mobileMenuOverlay.addEventListener('click', e => {
            if (e.target === elements.mobileMenuOverlay) closeMobileMenu();
        });
    }

    // DROPDOWN DE CATEGORIAS - PRINCIPAL
    if (elements.categoriasDropdownBtn) {
        console.log('✓ Configurando dropdown de categorias');
        elements.categoriasDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Clique no botão de categorias detectado');
            toggleCategoriasMenu();
        });
    } else {
        console.warn('⚠️  Botão categoriasDropdownBtn não encontrado!');
    }

    // Submenu Wheys
    if (elements.wheySubmenuToggle) {
        elements.wheySubmenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWheySubmenu();
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (elements.categoriasMenu && elements.categoriasDropdownBtn) {
            if (!e.target.closest('.c-header__categorias-dropdown')) {
                elements.categoriasMenu.classList.remove('active');
                elements.categoriasDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Carousel "Adicionar ao carrinho"
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-comprar');
        if (btn && btn.closest('.swiper-slide')) {
            addToCartCarousel(btn);
        }

        const favBtn = e.target.closest('.c-produto__favorito-btn');
        if (favBtn) toggleFavorite(favBtn);
    });

    // Fechar resultados de busca
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.c-busca')) {
            const resultsDiv = document.querySelector('.search-results');
            if (resultsDiv) resultsDiv.remove();
        }
    });
}

// ============================================================================
// GERENCIAMENTO DO CARRINHO
// ============================================================================
function addToCart() {
    const p = { ...appState.currentProduct };
    const product = {
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        size: p.size,
        flavor: p.flavor,
        image: p.image
    };

    const existingIndex = appState.cart.items.findIndex(
        item => item.id === product.id && item.size === product.size && item.flavor === product.flavor
    );
    
    if (existingIndex > -1) {
        appState.cart.items[existingIndex].quantity += product.quantity;
    } else {
        appState.cart.items.push(product);
    }

    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    showAddToCartAnimation();
    showNotification('✓ Produto adicionado ao carrinho!');
}

function addToCartCarousel(button) {
    const slide = button.closest('.swiper-slide');
    if (!slide) return;

    const titleEl = slide.querySelector('.produto-titulo');
    const priceEl = slide.querySelector('.preco');
    const imgEl = slide.querySelector('img');

    const title = titleEl ? titleEl.textContent.trim() : 'Produto';
    let price = 0;
    if (priceEl) {
        price = parseFloat(priceEl.textContent.replace('R$','').replace('.', '').replace(',', '.')) || 0;
    }
    const image = imgEl ? imgEl.src : '';

    const product = {
        id: 'p_' + Math.random().toString(36).slice(2, 9),
        name: title,
        price: price,
        quantity: 1,
        size: 'padrão',
        flavor: 'padrão',
        image: image
    };

    appState.cart.items.push(product);
    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    showNotification('✓ Produto adicionado ao carrinho!');
}

function updateCartTotal() {
    appState.cart.total = appState.cart.items.reduce((t, it) => t + (it.price * it.quantity), 0);
}

function updateCartDisplay() {
    const totalItems = appState.cart.items.reduce((t, it) => t + it.quantity, 0);
    if (elements.cartBadge) {
        elements.cartBadge.textContent = totalItems;
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('saudeFormaCart', JSON.stringify(appState.cart.items));
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
    }
}

function loadCartFromStorage() {
    try {
        const stored = localStorage.getItem('saudeFormaCart');
        if (stored) {
            appState.cart.items = JSON.parse(stored);
            updateCartTotal();
        }
    } catch (e) {
        console.error('Erro ao carregar carrinho:', e);
    }
}

function showCart() {
    if (appState.cart.items.length === 0) {
        showNotification('Seu carrinho está vazio');
        return;
    }

    let html = '<div class="cart-modal"><div class="cart-content"><h3>Seu Carrinho</h3>';
    
    appState.cart.items.forEach((item, idx) => {
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Tamanho: ${item.size} | Sabor: ${item.flavor}</p>
                    <div class="quantity-controls">
                        <span>Quantidade:</span>
                        <div class="quantity-buttons">
                            <button class="quantity-btn" data-action="dec" data-index="${idx}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-action="inc" data-index="${idx}">+</button>
                        </div>
                    </div>
                    <p class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>`;
    });
    
    html += `
        <div class="cart-total"><strong>Total: R$ ${appState.cart.total.toFixed(2)}</strong></div>
        <div class="cart-actions">
            <button class="btn-secondary" id="cart-continue">Continuar Comprando</button>
            <a href="checkout.html"><button class="btn-primary" id="cart-checkout">Finalizar Compra</button></a>
        </div>
    </div></div>`;

    showModal(html);

    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = btn.getAttribute('data-action');
            const index = Number(btn.getAttribute('data-index'));
            if (action === 'inc') increaseCartItemQuantity(index);
            if (action === 'dec') decreaseCartItemQuantity(index);
        });

        const continueBtn = modal.querySelector('#cart-continue');
        if (continueBtn) continueBtn.addEventListener('click', closeModal);
    }
}

function increaseCartItemQuantity(i) {
    if (appState.cart.items[i]) {
        appState.cart.items[i].quantity++;
        updateCartTotal();
        saveCartToStorage();
        updateCartDisplay();
        showCart();
    }
}

function decreaseCartItemQuantity(i) {
    if (!appState.cart.items[i]) return;
    if (appState.cart.items[i].quantity > 1) {
        appState.cart.items[i].quantity--;
    } else {
        appState.cart.items.splice(i, 1);
    }
    updateCartTotal();
    saveCartToStorage();
    updateCartDisplay();
    showCart();
}

// ============================================================================
// FAVORITOS
// ============================================================================
function toggleFavorite(button) {
    const slide = button.closest('.swiper-slide');
    if (!slide) return;
    
    const nameEl = slide.querySelector('.produto-titulo');
    const name = nameEl ? nameEl.textContent.trim() : 'Produto';
    const icon = button.querySelector('i');
    
    if (!icon) return;
    
    const isFav = icon.classList.contains('fas');
    if (isFav) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        appState.favorites = appState.favorites.filter(n => n !== name);
        showNotification(name + ' removido dos favoritos');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        if (!appState.favorites.includes(name)) {
            appState.favorites.push(name);
        }
        showNotification(name + ' adicionado aos favoritos');
    }
    
    saveFavoritesToStorage();
}

function saveFavoritesToStorage() {
    try {
        localStorage.setItem('saudeFormaFavorites', JSON.stringify(appState.favorites));
    } catch (e) {
        console.error('Erro ao salvar favoritos:', e);
    }
}

function loadFavoritesFromStorage() {
    try {
        const s = localStorage.getItem('saudeFormaFavorites');
        if (s) appState.favorites = JSON.parse(s);
    } catch (e) {
        console.error('Erro ao carregar favoritos:', e);
    }
}

// ============================================================================
// UTILITÁRIOS DE UI
// ============================================================================
function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = message;
    n.style.cssText = 'position:fixed;top:20px;right:20px;background:#C3010C;color:#fff;padding:1rem 1.5rem;border-radius:8px;z-index:3000;animation:slideIn 0.3s ease-out;';
    
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.opacity = '0';
        n.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

function showAddToCartAnimation() {
    if (elements.addToCartBtn) {
        const original = elements.addToCartBtn.textContent;
        elements.addToCartBtn.textContent = 'Adicionado!';
        elements.addToCartBtn.classList.add('success');
        setTimeout(() => {
            elements.addToCartBtn.textContent = original;
            elements.addToCartBtn.classList.remove('success');
        }, 1200);
    }
}

function showModal(content) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:3000;';
    overlay.innerHTML = content;
    
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

function closeModal() {
    const m = document.querySelector('.modal-overlay');
    if (m) m.remove();
}

// ============================================================================
// CONTROLES DO PRODUTO
// ============================================================================
function increaseQuantity() {
    appState.currentProduct.quantity++;
    updateQuantityDisplay();
}

function decreaseQuantity() {
    if (appState.currentProduct.quantity > 1) {
        appState.currentProduct.quantity--;
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    const q = elements.quantityDisplay;
    if (q) q.textContent = appState.currentProduct.quantity;
}

function updateProductSize() {
    if (elements.sizeSelect) {
        appState.currentProduct.size = elements.sizeSelect.value;
    }
}

function updateProductFlavor() {
    if (elements.flavorSelect) {
        appState.currentProduct.flavor = elements.flavorSelect.value;
    }
}

function initializeProductOptions() {
    if (elements.sizeSelect) {
        elements.sizeSelect.value = appState.currentProduct.size;
    }
    if (elements.flavorSelect) {
        elements.flavorSelect.value = appState.currentProduct.flavor;
    }
}

function closeMobileMenu() {
    if (elements.mobileMenuOverlay) {
        elements.mobileMenuOverlay.style.display = 'none';
    }
}

// ============================================================================
// LAZY LOADING, SMOOTH SCROLL
// ============================================================================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;
    
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const img = en.target;
                img.src = img.dataset.src;
                io.unobserve(img);
            }
        });
    });
    
    images.forEach(img => io.observe(img));
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
}

// ============================================================================
// BANCO DE DADOS DE PRODUTOS
// ============================================================================
const productDatabase = [
    {
        id: 1,
        name: 'Whey Protein Concentrado 900g',
        price: 139.90,
        category: 'whey',
        image: 'images/produtos/whey-900g.jpg',
        description: 'Whey Protein de alta qualidade, concentrado com 900g'
    },
    {
        id: 2,
        name: 'MY WHEY 900g',
        price: 104.09,
        category: 'whey',
        image: 'images/produtos/MY WHEY-900G.webp',
        description: 'Whey Protein MY com excelente custo benefício'
    },
    {
        id: 3,
        name: 'Whey Protein 1,8kg',
        price: 272.48,
        category: 'whey',
        image: 'images/produtos/Whey- 1,8KG.jpg',
        description: 'Whey Protein em embalagem grande de 1,8kg'
    },
    {
        id: 4,
        name: 'Whey Protein Concentrado 900g',
        price: 147.14,
        category: 'whey',
        image: 'images/produtos/Whey-100.webp',
        description: 'Whey Protein concentrado com 900g de qualidade premium'
    },
    {
        id: 5,
        name: 'Whey Protein Isolado 900g',
        price: 335.92,
        category: 'whey-isolado',
        image: 'images/produtos/img-saude e forma whey.webp',
        description: 'Whey Protein isolado com 900g, baixo teor de lactose'
    },
    {
        id: 6,
        name: 'Creatina 100% Pura 120 Cápsulas Hardcore',
        price: 44.74,
        category: 'creatina',
        image: 'images/produtos/creatina_hardcore_integralmedica.webp',
        description: 'Creatina pura em cápsulas, 120 unidades Hardcore'
    }
];

// ============================================================================
// BUSCA DE PRODUTOS
// ============================================================================
function handleSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showNotification('Digite algo para buscar');
        return;
    }

    const results = productDatabase.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        showNotification('Nenhum produto encontrado para: ' + searchTerm);
        return;
    }

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchContainer = elements.searchInput.parentElement;
    let resultsHTML = '<div class="search-results">';
    
    results.forEach(product => {
        resultsHTML += `
            <div class="search-result-item" onclick="selectSearchResult('${product.id}')">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                </div>
                <span class="search-result-price">R$ ${product.price.toFixed(2)}</span>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    
    const oldResults = searchContainer.querySelector('.search-results');
    if (oldResults) oldResults.remove();
    
    searchContainer.insertAdjacentHTML('beforeend', resultsHTML);
}

function selectSearchResult(productId) {
    const product = productDatabase.find(p => p.id == productId);
    
    if (product) {
        appState.cart.items.push({
            ...product,
            quantity: 1,
            size: 'padrão',
            flavor: 'padrão'
        });
        
        updateCartTotal();
        updateCartDisplay();
        saveCartToStorage();
        
        elements.searchInput.value = '';
        const resultsDiv = document.querySelector('.search-results');
        if (resultsDiv) resultsDiv.remove();
        
        showNotification('✓ Produto adicionado ao carrinho!');
    }
}

// ============================================================================
// TEMA (ESCURO/CLARO)
// ============================================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function applyTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        }
    }
}

// ============================================================================
// DROPDOWN DE CATEGORIAS
// ============================================================================
function toggleCategoriasMenu() {
    console.log('toggleCategoriasMenu() chamado');
    console.log('elements.categoriasMenu:', elements.categoriasMenu);
    
    if (!elements.categoriasMenu) {
        console.error('❌ categoriasMenu elemento não encontrado');
        return;
    }
    
    const isOpen = elements.categoriasMenu.classList.contains('active');
    console.log('Menu aberto?', isOpen);
    
    if (isOpen) {
        elements.categoriasMenu.classList.remove('active');
        if (elements.categoriasDropdownBtn) {
            elements.categoriasDropdownBtn.setAttribute('aria-expanded', 'false');
        }
        console.log('✓ Menu FECHADO');
    } else {
        elements.categoriasMenu.classList.add('active');
        if (elements.categoriasDropdownBtn) {
            elements.categoriasDropdownBtn.setAttribute('aria-expanded', 'true');
        }
        console.log('✓ Menu ABERTO');
    }
}

function toggleWheySubmenu() {
    if (!elements.wheySubmenuToggle || !elements.wheySubmenuItems) return;
    
    const isOpen = elements.wheySubmenuItems.classList.contains('active');
    
    if (isOpen) {
        elements.wheySubmenuItems.classList.remove('active');
        elements.wheySubmenuToggle.classList.remove('active');
    } else {
        elements.wheySubmenuItems.classList.add('active');
        elements.wheySubmenuToggle.classList.add('active');
    }
}

function closeCategoriasMenuAfterSelection() {
    if (elements.categoriasMenu) {
        elements.categoriasMenu.classList.remove('active');
        if (elements.categoriasDropdownBtn) {
            elements.categoriasDropdownBtn.setAttribute('aria-expanded', 'false');
        }
    }
}

function filterByCategory(category) {
    console.log('Filtrando por categoria:', category);
    showNotification('Filtrando por: ' + category.toUpperCase());
    closeCategoriasMenuAfterSelection();
}

// ============================================================================
// EXPORTAÇÕES GLOBAIS
// ============================================================================
window.SaudeFormaApp = {
    addToCart,
    showCart,
    closeModal,
    showNotification,
    addToCartCarousel,
    filterByCategory,
    selectSearchResult,
    toggleCategoriasMenu,
    toggleWheySubmenu,
    checkout: () => {
        showNotification('Redirecionando para o checkout...');
        closeModal();
        console.log('Iniciando checkout com:', appState.cart);
    }
};
