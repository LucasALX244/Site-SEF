# Menu de Categorias - Guia de Implementação

## O que foi adicionado

### 1. **Botão de Categorias no Header**
Um novo botão com ícone de grade (`fa-th`) foi adicionado ao header, ao lado do botão de carrinho. Este botão abre um dropdown com todas as categorias da loja.

### 2. **Dropdown Menu de Categorias**
O dropdown inclui:
- **Lançamentos** - Link para produtos em lançamento
- **Promoções** - Link para produtos em promoção
- **Wheys** - Categoria com submenu expansível:
  - Whey Protein Concentrado
  - Whey Protein Isolado
  - Whey Protein Hidrolisado
- **Creatina** - Link direto
- **Barra de Proteína** - Link direto
- **Hipercalóricos** - Link direto
- **Aminoácidos** - Link direto
- **Vitaminas** - Link direto
- **Pré Treino** - Link direto
- **Suplementos** - Link direto
- **Moda** - Link direto
- **Acessórios** - Link direto

### 3. **Submenu Expansível**
A categoria "Wheys" possui um submenu que:
- Expande ao clicar no item
- Mostra as subcategorias com animação suave
- O ícone de chevron rotaciona indicando o estado (aberto/fechado)

## Arquivos Modificados

### `index.html`
- Adicionado novo dropdown `.c-header__categorias-dropdown` na seção de ações do header
- Estrutura HTML com categorias e submenu de Wheys

### `styles.css`
- Adicionados estilos para `.c-header__categorias-dropdown`
- Estilos para `.c-header__categorias-menu` (dropdown animado)
- Estilos para `.c-header__categorias-submenu` (submenu expansível)
- Transições e hover states

### `script.js`
- Adicionados elementos DOM às variáveis do `elements` object
- Funções `toggleCategoriasMenu()` - Abre/fecha o dropdown
- Função `toggleWheySubmenu()` - Expande/colapsa o submenu de Wheys
- Função `closeCategoriasMenuAfterSelection()` - Fecha o menu após seleção
- Event listeners para gerenciar o dropdown e submenu

## Como Usar

### Abrir o Menu
1. Clique no botão de grid (ícone `≡`) no header, ao lado do carrinho
2. O dropdown abrirá com animação suave

### Selecionar uma Categoria
1. Clique em qualquer categoria (ex: "Lançamentos", "Creatina")
2. A função `filterByCategory()` será chamada com o código da categoria
3. O menu fechará automaticamente

### Expandir Submenu (Wheys)
1. Com o menu aberto, clique em "Wheys"
2. O submenu expandirá mostrando as opções:
   - Whey Protein Concentrado
   - Whey Protein Isolado
   - Whey Protein Hidrolisado
3. Clique novamente em "Wheys" para colapsar

### Fechar o Menu
- Clique fora do dropdown em qualquer lugar da página
- Ou clique em uma categoria (menu fecha automaticamente)

## Integração com FilterByCategory

Cada categoria chama a função `filterByCategory(category)` com o seguinte mapeamento:

```javascript
filterByCategory('lancamentos')      // Lançamentos
filterByCategory('promocoes')        // Promoções
filterByCategory('whey')             // Whey Protein Concentrado
filterByCategory('whey-isolado')     // Whey Protein Isolado
filterByCategory('whey-hidrolisado') // Whey Protein Hidrolisado
filterByCategory('creatina')         // Creatina
filterByCategory('barra-proteina')   // Barra de Proteína
filterByCategory('hipercalorico')    // Hipercalóricos
filterByCategory('aminoacidos')      // Aminoácidos
filterByCategory('vitaminas')        // Vitaminas
filterByCategory('pre-treino')       // Pré Treino
filterByCategory('suplementos')      // Suplementos
filterByCategory('moda')             // Moda
filterByCategory('acessorios')       // Acessórios
```

A função `filterByCategory()` já existe em `script.js` e atualmente exibe uma notificação. Você pode modificá-la para redirecionar para a página de produtos filtrados ou exibir produtos dinamicamente.

## Responsividade

O dropdown é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

Em dispositivos móveis, o dropdown funciona normalmente, abrindo ao lado do botão.

## Personalização

### Adicionar Mais Subcategorias
Para adicionar um submenu a outra categoria (ex: Creatina):

1. Substitua este HTML:
```html
<a href="#" class="c-header__categorias-item" onclick="filterByCategory('creatina')">
    <i class="fas fa-pills"></i> Creatina
</a>
```

Por:
```html
<div class="c-header__categorias-submenu">
    <button class="c-header__categorias-item c-header__categorias-submenu-toggle" id="creatinaSubmenuToggle">
        <i class="fas fa-pills"></i> Creatina <i class="fas fa-chevron-right"></i>
    </button>
    <div class="c-header__categorias-submenu-items" id="creatinaSubmenuItems">
        <a href="#" class="c-header__categorias-subitem" onclick="filterByCategory('creatina-pura')">Creatina 100% Pura</a>
        <a href="#" class="c-header__categorias-subitem" onclick="filterByCategory('creatina-monohidrato')">Creatina Monohidrato</a>
    </div>
</div>
```

2. Adicione ao `script.js` dentro do DOMContentLoaded:
```javascript
creatinaSubmenuToggle: document.getElementById('creatinaSubmenuToggle'),
creatinaSubmenuItems: document.getElementById('creatinaSubmenuItems')
```

3. Crie uma nova função ou reutilize a lógica do submenu de Wheys

### Mudar Cores
Os estilos usam variáveis CSS do `:root`:
```css
--cor-primaria: #C3010C;
--cor-fundo: #ffffff;
--cor-borda: #e5e5e5;
--cor-texto: #1a1a1a;
```

Modifique estas variáveis em `styles.css` para mudar as cores do dropdown.

## Testes Recomendados

1. **Abrir e Fechar Menu**
   - Clique no botão de grid, o menu deve aparecer
   - Clique fora, o menu deve desaparecer
   - Verificar se `aria-expanded` muda de `false` para `true`

2. **Expandir/Colapsar Submenu**
   - Com o menu aberto, clique em "Wheys"
   - Submenu deve expandir com animação
   - Ícone do chevron deve rotacionar 90°
   - Clique novamente para colapsar

3. **Modo Escuro**
   - Ative o modo escuro
   - Verifique se o dropdown mantém boa legibilidade
   - Cores devem se ajustar automaticamente

4. **Mobile Responsiveness**
   - Redimensione a janela para mobile
   - Dropdown deve funcionar normalmente
   - Posicionamento deve estar correto

## Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12) para erros
2. Verifique se todos os arquivos foram salvos corretamente
3. Limpe o cache do navegador (Ctrl+F5)
4. Verifique se os IDs dos elementos HTML correspondem aos do JavaScript
