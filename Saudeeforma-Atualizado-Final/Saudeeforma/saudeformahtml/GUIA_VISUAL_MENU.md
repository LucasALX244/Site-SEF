# 📊 Guia Visual - Menu de Categorias

## 1️⃣ Localização do Botão

```
┌─────────────────────────────────────────────────────────────────┐
│  SAÚDE & FORMA Logo  │  [Busca]  │  ❤️  🌙  📋  🛒 (0)         │
│                       │           │                                 │
│                       │           │          ↑                      │
│                       │           │    NOVO BOTÃO                   │
└─────────────────────────────────────────────────────────────────┘

Posição: Header → Ações (lado direito)
Ícone: 📋 (Font Awesome: fa-th)
Cor: Mesmo estilo dos outros botões
```

---

## 2️⃣ Animação de Abertura

### Fechado (Padrão)
```
        📋
    [Clique aqui]
```

### Abrindo (Transição)
```
        📋
        ↓
    ┌────────────┐
    │ Carregando │
    └────────────┘
```

### Aberto (Final)
```
        📋
        ↓
    ┌──────────────────┐
    │   Categorias     │
    ├──────────────────┤
    │ ⭐ Lançamentos  │
    │ 🏷️ Promoções    │
    │ ▶️ Wheys        │
    │ 💊 Creatina     │
    │ 🍪 Barra...     │
    │ ⚖️ Hiperc...    │
    │ ⚛️ Aminoác...   │
    │ 💊 Vitaminas    │
    │ 🔥 Pré Treino   │
    │ 🧪 Suplementos  │
    │ 👕 Moda         │
    │ 🎒 Acessórios   │
    └──────────────────┘
```

---

## 3️⃣ Submenu Expansível (Wheys)

### Estado Colapsado
```
┌──────────────────────┐
│ ▶️ Wheys             │  ← Chevron aponta para a direita
└──────────────────────┘
```

### Clicando no Item
```
┌──────────────────────┐
│ ▼ Wheys             │  ← Chevron rotaciona 90°
├──────────────────────┤
│   • Whey Concentrado│
│   • Whey Isolado    │
│   • Whey Hidrolisado│
└──────────────────────┘
```

---

## 4️⃣ Fluxo Interativo Completo

```
User Experience Flow:

┌─────────────────┐
│ Página Inicial  │
└────────┬────────┘
         │
         │ [Clica no botão 📋]
         ↓
┌─────────────────────────────┐
│ Dropdown Abre com Animação  │
│ (max-height 0 → 600px)      │
└────────┬────────────────────┘
         │
         ├──→ [Clica em "Creatina"] → filterByCategory('creatina')
         │                            Notificação: "Filtrando por: CREATINA"
         │                            Menu fecha automaticamente
         │
         ├──→ [Clica em "Wheys"] → toggleWheySubmenu()
         │                        Submenu expande
         │                        
         │    ├──→ [Clica "Whey Isolado"] → filterByCategory('whey-isolado')
         │    │                              Menu fecha
         │    │
         │    └──→ [Clica "Wheys" novamente] → Submenu colapsa
         │
         └──→ [Clica Fora] → Menu fecha automaticamente
```

---

## 5️⃣ Estados CSS/Visual

### Padrão (Desktop)
```css
Dropdown: opacity 1, visible
Menu: max-height 0 (invisível)
Botão: normal styling
```

### Hover no Botão
```css
Botão: background-color var(--cor-fundo-secundario)
Transição: suave 0.3s
```

### Menu Aberto
```css
Menu: max-height 600px (visível com scroll)
Sombra: 0 8px 24px rgba(0, 0, 0, 0.12)
Border: 1px solid var(--cor-borda)
```

### Item do Menu Hover
```css
Fundo: var(--cor-fundo-secundario)
Texto: var(--cor-primaria)
Padding-left: aumenta (animação de slide)
```

### Submenu Expandido
```css
Item: .active (classe adicionada)
Chevron: transform rotate(90deg)
Submenu: max-height 300px (visível)
```

---

## 6️⃣ Estrutura HTML Visual

```html
<div class="c-header__categorias-dropdown">
    ↓
    <button class="c-header__categorias-btn" id="categoriasDropdownBtn">
        <i class="fas fa-th"></i>
    </button>
    ↓
    <div class="c-header__categorias-menu" id="categoriasMenu">
        ├─ <div class="c-header__categorias-header">
        │  └─ <h3>Categorias</h3>
        │
        ├─ <a class="c-header__categorias-item">⭐ Lançamentos</a>
        ├─ <a class="c-header__categorias-item">🏷️ Promoções</a>
        │
        ├─ <div class="c-header__categorias-submenu">
        │  ├─ <button class="c-header__categorias-submenu-toggle" 
        │  │  id="wheySubmenuToggle">
        │  │  ▶️ Wheys <i class="chevron"></i>
        │  │  </button>
        │  └─ <div class="c-header__categorias-submenu-items" 
        │     id="wheySubmenuItems">
        │     ├─ <a class="c-header__categorias-subitem">Concentrado</a>
        │     ├─ <a class="c-header__categorias-subitem">Isolado</a>
        │     └─ <a class="c-header__categorias-subitem">Hidrolisado</a>
        │     </div>
        │  </div>
        │
        ├─ <a class="c-header__categorias-item">💊 Creatina</a>
        ├─ <a class="c-header__categorias-item">🍪 Barra...</a>
        ├─ ... (mais categorias)
        │
        └─ <a class="c-header__categorias-item">🎒 Acessórios</a>
    </div>
</div>
```

---

## 7️⃣ JavaScript Flow Diagram

```javascript
┌─────────────────────────────────────────────────┐
│ DOMContentLoaded                                │
│                                                  │
│ 1. Mapear elementos DOM para variável elements  │
│ 2. Chamar initializeEventListeners()            │
└─────────┬───────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────┐
│ initializeEventListeners()                      │
│                                                  │
│ - categoriasDropdownBtn.addEventListener        │
│   ("click", toggleCategoriasMenu)               │
│                                                  │
│ - wheySubmenuToggle.addEventListener            │
│   ("click", toggleWheySubmenu)                  │
│                                                  │
│ - document.addEventListener                     │
│   ("click", fecharMenuFora)                     │
│                                                  │
│ - categoryLinks.addEventListener                │
│   ("click", closeCategoriasMenuAfterSelection)  │
└─────────┬───────────────────────────────────────┘
          │
    ┌─────┴─────┬─────────────┐
    │           │             │
    ↓           ↓             ↓
┌────────┐  ┌──────────┐  ┌──────────────┐
│Toggle  │  │Toggle    │  │Close After   │
│Menu    │  │Submenu   │  │Selection     │
└────────┘  └──────────┘  └──────────────┘
    │           │             │
    └─────┬─────┴─────┬───────┘
          │           │
          ↓           ↓
      Add/Remove "active" class
      Muda aria-expanded
      Rotaciona chevron icon
```

---

## 8️⃣ Responsividade - Breakpoints

```
DESKTOP (>1024px)
┌─────────────────────────────────────────────────┐
│ Logo │ Busca │ ❤️ 🌙 📋 🛒                      │
│      │       │        └─ Dropdown OK            │
└─────────────────────────────────────────────────┘

TABLET (768px - 1024px)
┌──────────────────────────────────────┐
│ Logo │ Busca │ ❤️ 🌙 📋 🛒          │
│      │       │     └─ Dropdown OK    │
└──────────────────────────────────────┘

MOBILE (<768px)
┌──────────────────────────┐
│ Logo      ❤️ 🌙 📋 🛒   │
│ Busca...                  │
│            └─ Dropdown    │
│              Funcional    │
└──────────────────────────┘
```

---

## 9️⃣ Animação Timeline

```
Timeline da Abertura do Menu:
0ms   └─ Clique no botão
 ↓
50ms  └─ addClass("active") ao menu
 ↓
100ms └─ max-height: 0 → 600px (transição inicia)
 ↓
200ms └─ (no meio da animação)
 ↓
300ms └─ Menu totalmente visível ✓
       └─ user pode interagir

Timeline do Submenu:
0ms   └─ Clique em "Wheys"
 ↓
50ms  └─ addClass("active") ao submenu e botão
 ↓
 ├─ Chevron: 0deg → 90deg (rotação)
 ├─ Submenu: max-height 0 → 300px
 │
100ms └─ (no meio da animação)
 ↓
300ms └─ Submenu totalmente visível ✓
```

---

## 🔟 Rastreamento de Estado

```
Estados Possíveis:

┌─────────────────────────┐
│  MENU FECHADO           │
│  aria-expanded="false"  │
│  Menu: sem classe       │
└────────┬────────────────┘
         │ [Clica no botão]
         ↓
┌─────────────────────────┐
│  MENU ABERTO            │
│  aria-expanded="true"   │
│  Menu: .active          │
│  Submenu: normal        │
└────────┬────────────────┘
         │ [Clica em "Wheys"]
         ↓
┌─────────────────────────┐
│  MENU ABERTO            │
│  SUBMENU EXPANDIDO      │
│  Menu: .active          │
│  Submenu: .active       │
│  Chevron: 90deg         │
└────────┬────────────────┘
         │ [Clica em "Wheys" novamente]
         ↓
┌─────────────────────────┐
│  MENU ABERTO            │
│  SUBMENU COLAPSADO      │
│  Menu: .active          │
│  Submenu: sem classe    │
│  Chevron: 0deg          │
└─────────────────────────┘
```

---

## 📈 Performance

```
Métricas:
- Animação: 300ms (suave, não lenta)
- Max-height dropdown: 600px (scroll se necessário)
- Max-height submenu: 300px (compacto)
- Transição: all 0.3s ease (hardware accelerated)
- Memory: Nenhuma necessidade de polyfill

Otimizações:
✅ Classes CSS para transições (não inline styles)
✅ Event delegation (não listener em cada item)
✅ Remoção de listeners desnecessários
✅ Sem jQuery ou bibliotecas externas
```

---

**Criado em**: 11 de Novembro de 2025  
**Versão**: 1.0  
**Status**: ✅ Implementado e Testado
