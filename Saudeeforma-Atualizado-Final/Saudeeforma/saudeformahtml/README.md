# Saúde & Forma - Suplementos e Artigos Esportivos

Bem-vindo ao repositório do site **Saúde & Forma**, uma loja virtual especializada em suplementos alimentares e artigos esportivos, desenvolvida com HTML5, CSS3 e JavaScript puro.

## 🚀 Visão Geral

O Saúde & Forma é um e-commerce completo que oferece:

- Catálogo de produtos organizado por categorias
- Páginas de detalhes do produto
- Sistema de autenticação (login/cadastro)
- Carrinho de compras
- Páginas institucionais (Sobre, Contato, Políticas)
- Design responsivo e acessível

## 🎨 Design System

### Cores Principais

- **Primária:** `#C3010C` (Vermelho)
- **Secundária:** `#fbbf24` (Amarelo)
- **Fundo:** `#ffffff` (Branco)
- **Texto:** `#1a1a1a` (Preto)
- **Destaque:** `#28a745` (Verde)

### Tipografia

- **Família:** `system-ui, -apple-system, sans-serif`
- **Tamanhos:**
  - Pequeno: 1.4rem
  - Base: 1.6rem
  - Médio: 1.8rem
  - Grande: 2.4rem
  - Extra Grande: 3.2rem

## 📁 Estrutura do Projeto

```text
saude-e-forma-html/
├── index.html          # Página inicial
├── cadastro.html       # Página de cadastro
├── login.html          # Página de login
├── produto-template.html # Template de produto
├── styles.css          # Estilos principais
├── forms.css           # Estilos específicos para formulários
├── script.js           # JavaScript principal
└── images/             # Diretório de imagens
    ├── produtos/       # Imagens dos produtos
    └── logos/          # Logotipos e marcas
```

## ✨ Funcionalidades Principais

### 1. Navegação

- Menu responsivo para mobile e desktop
- Barra de busca funcional
- Navegação por categoria
- Links rápidos para páginas institucionais

### 2. Páginas

- **Home**: Destaques, ofertas e categorias
- **Produtos**: Lista de produtos com filtros
- **Detalhes do Produto**: Informações completas, galeria e avaliações
- **Login/Cadastro**: Formulários de autenticação
- **Carrinho**: Gerenciamento de itens e checkout
- **Contato**: Formulário de contato e informações

### 3. Componentes Reutilizáveis

- **Header**: Com barra de contato e menu principal
- **Footer**: Com informações de contato e links úteis
- **Cards de Produto**: Exibição padronizada dos itens
- **Formulários**: Estilizados e validados
- **Modal**: Para login, cadastro e confirmações
- **Carrossel**: Para banners promocionais

## ♿ Acessibilidade

O projeto segue as melhores práticas de acessibilidade:

- Navegação por teclado
- Contraste adequado
- Atributos ARIA
- Textos alternativos em imagens
- Foco visível em elementos interativos

## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd saude-e-forma-html
   ```

3. Abra o arquivo `index.html` em seu navegador:
   - Dê um duplo clique no arquivo, ou
   - Arraste o arquivo para uma janela do navegador, ou
   - Use a opção "Abrir com" > Seu navegador favorito

## 📱 Responsividade

O site foi desenvolvido com foco em mobile first, garantindo uma experiência perfeita em todos os dispositivos:

- Smartphones (a partir de 320px)
- Tablets (a partir de 768px)
- Desktops (a partir de 1024px)
- Telas grandes (acima de 1440px)

## 🛠️ Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com variáveis e Flexbox/Grid
- JavaScript puro (ES6+)
- Ícones do Font Awesome
- Google Fonts (se aplicável)

## 📝 Próximos Passos

- [ ] Implementar carrinho de compras
- [ ] Adicionar integração com pagamento
- [ ] Criar área do cliente
- [ ] Implementar busca em tempo real
- [ ] Adicionar mais produtos e categorias