# 🎱 Bingo Eletrônico 🎉

Bem-vindo ao **Bingo Eletrônico**!  
Este projeto é um bingo online simples, divertido e fácil de usar, feito com **HTML, CSS e JavaScript**.  
Monte sua cartela vencedora, sorteie números e divirta-se!

---

## ✨ Funcionalidades

- 🔢 **Sorteio automático** de números de 1 a 75, sem repetições.
- 📊 **Visualização dos números sorteados** organizados automaticamente nas colunas B, I, N, G, O.
- 🏆 **Montagem da cartela vencedora**:
    - Selecione apenas números que já foram sorteados.
    - Limite de **5 números por coluna** (B, I, N, G, O).
    - Os números são exibidos **de cima para baixo** conforme a ordem de seleção.
    - Visualização elegante da cartela em formato 5x5, como em um bingo tradicional.
    - Possibilidade de **editar a cartela vencedora** ou iniciar um novo jogo.
- 🖥️ 100% client-side: não precisa de backend ou instalação, basta abrir o `index.html` no navegador!

---

## 🗂️ Estrutura dos Arquivos

| Arquivo           | Função                                   |
|-------------------|------------------------------------------|
| `index.html`      | Estrutura da interface do Bingo          |
| `css/style.css`   | Estilos visuais do jogo                  |
| `js/app.js`       | Lógica de sorteio, seleção e cartela     |
| `README.md`       | Esta documentação                        |

---

## 🚀 Como Usar

1. **Abra** o arquivo `index.html` em um navegador moderno.
2. Clique em **"Sortear número"** para sortear os números aleatoriamente.
3. Após alguns números sorteados, clique em **"Bingo!"** para montar sua cartela vencedora.
4. Selecione os números desejados em cada coluna (máximo de 5 por coluna).
5. Clique em **"Exibir Cartela Vencedora"** para visualizar sua cartela.
6. Use os botões para **editar** a cartela ou iniciar um **novo bingo**.

---

## 📝 Observações Técnicas

- Cada coluna (B, I, N, G, O) aceita no máximo **5 números**.
- A ordem de exibição dos números na cartela vencedora é **de cima para baixo** (primeiro selecionado fica no topo).
- Números não podem ser repetidos na mesma coluna.
- Ao exibir a cartela vencedora, ela será mostrada no formato tradicional 5x5.
- O projeto não armazena dados entre sessões (ao atualizar a página, tudo recomeça).

---

## 🖼️ Exemplo de Estrutura HTML

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Bingo Eletrônico</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main>
        <!-- ... outros elementos ... -->
        <button id="draw-btn">Sortear número</button>
        <button id="bingo-btn">Bingo!</button>
        <div id="end-message" class="hidden">
            <span>Todos os números foram sorteados!</span>
        </div>
        <div id="modal-overlay" class="hidden">
            <div id="modal-content">
                <h2>Números Sorteados</h2>
                <div id="modal-table-container"></div>
                <button id="close-modal-btn">Voltar</button>
            </div>
        </div>
    </main>
    <script src="js/app.js"></script>
</body>
</html>
```

---

## 🏅 Cartela Vencedora

- A cartela vencedora é exibida em um **overlay/modal** gerado pelo JavaScript.
- Cada coluna respeita o limite de **5 números**, exibidos de **cima para baixo** na ordem de seleção.
- Visual padrão do bingo: 5 colunas (B, I, N, G, O) por 5 linhas.

---

## 💡 Dicas

- Clique em "Bingo!" somente após ter sorteado vários números.
- Se quiser montar outra cartela, use "Editar Cartela" no modal.
- Para reiniciar o jogo, clique em "Novo Bingo".

---

## 🤝 Contribuição

Sugestões, dúvidas ou melhorias?  
Abra uma issue ou envie um pull request!  

---

## 🛠️ Créditos

- Desenvolvido por [Eric Lopes] 😊

---
