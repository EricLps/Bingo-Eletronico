const TOTAL_NUMBERS = 75;
let drawnNumbers = [];
let availableNumbers = [];

// Cartela vencedora
let winnerCardNumbers = { B: [], I: [], N: [], G: [], O: [] };
let isSelectingWinnerCard = false;

const displayLetter = document.getElementById('display-letter');
const displayNumber = document.getElementById('display-number');
const drawBtn = document.getElementById('draw-btn');
const bingoBtn = document.getElementById('bingo-btn');
const endMessage = document.getElementById('end-message');

const colB = document.getElementById('col-B');
const colI = document.getElementById('col-I');
const colN = document.getElementById('col-N');
const colG = document.getElementById('col-G');
const colO = document.getElementById('col-O');

const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalTableContainer = document.getElementById('modal-table-container');
const closeModalBtn = document.getElementById('close-modal-btn');

let winnerStep = 0; 
let winnerCardOverlay, winnerCardContainer, winnerCardGrid, winnerCardAction, winnerCardAlert;

function initGame() {
    drawnNumbers = [];
    availableNumbers = [];
    winnerCardNumbers = { B: [], I: [], N: [], G: [], O: [] };
    isSelectingWinnerCard = false;
    winnerStep = 0;
    for (let i = 1; i <= TOTAL_NUMBERS; i++) availableNumbers.push(i);
    updateDisplay(null);
    updateDrawnTable();
    endMessage.classList.add('hidden');
    drawBtn.disabled = false;
    hideWinnerCardOverlay();
}
initGame();

function getBingoLetter(number) {
    if (number <= 15) return 'B';
    if (number <= 30) return 'I';
    if (number <= 45) return 'N';
    if (number <= 60) return 'G';
    if (number <= 75) return 'O';
    return '';
}

function updateDisplay(number) {
    if (number === null) {
        displayLetter.textContent = '?';
        displayNumber.textContent = '--';
        displayLetter.style.color = 'var(--color-btn)';
    } else {
        const letter = getBingoLetter(number);
        displayLetter.textContent = letter;
        displayNumber.textContent = number;
        let colorMap = {
            'B': 'var(--color-b)',
            'I': 'var(--color-i)',
            'N': 'var(--color-n)',
            'G': 'var(--color-g)',
            'O': 'var(--color-o)'
        };
        displayLetter.style.color = colorMap[letter] || 'var(--color-btn)';
    }
}

// Sorteia sem repetição
function drawNumber() {
    if (availableNumbers.length === 0) return null;
    const idx = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[idx];
    availableNumbers.splice(idx, 1);
    drawnNumbers.push(number);
    return number;
}

// Atualiza tabela compacta, mostrando apenas sorteados em cada casa
function updateDrawnTable() {
    colB.innerHTML = renderNumbersCol('B');
    colI.innerHTML = renderNumbersCol('I');
    colN.innerHTML = renderNumbersCol('N');
    colG.innerHTML = renderNumbersCol('G');
    colO.innerHTML = renderNumbersCol('O');
}

// Retorna apenas os números sorteados classificados por casa
function renderNumbersCol(letter) {
    const sorted = drawnNumbers
        .filter(num => getBingoLetter(num) === letter)
        .sort((a, b) => a - b);
    let colColor = {
        'B': 'var(--color-b)',
        'I': 'var(--color-i)',
        'N': 'var(--color-n)',
        'G': 'var(--color-g)',
        'O': 'var(--color-o)'
    }[letter];
    let html = `<div class="numbers-col">`;
    for (let n of sorted) {
        html += `<span class="number-chip drawn" style="border-color:${colColor};background:${colColor}">${n}</span>`;
    }
    html += `</div>`;
    return html;
}

function playShuffleAnimation(onFinish) {
    const shuffleTimes = 17;
    const shuffleDelay = 45;
    let count = 0;
    let interval = setInterval(() => {
        const fakeNum = Math.floor(Math.random() * TOTAL_NUMBERS) + 1;
        updateDisplay(fakeNum);
        count++;
        if (count >= shuffleTimes) {
            clearInterval(interval);
            setTimeout(onFinish, 250);
        }
    }, shuffleDelay);
}

drawBtn.addEventListener('click', () => {
    if (availableNumbers.length === 0) return;
    drawBtn.disabled = true;
    playShuffleAnimation(() => {
        const number = drawNumber();
        updateDisplay(number);
        updateDrawnTable();
        drawBtn.disabled = false;
        checkEnd();
    });
});

bingoBtn.addEventListener('click', () => {
    showWinnerCardSelector();
});

function showWinnerCardSelector() {
    // Cria overlay
    if (!winnerCardOverlay) {
        winnerCardOverlay = document.createElement("div");
        winnerCardOverlay.id = "winner-card-overlay";
        document.body.appendChild(winnerCardOverlay);

        winnerCardContainer = document.createElement("div");
        winnerCardContainer.id = "winner-card-container";
        winnerCardOverlay.appendChild(winnerCardContainer);

        winnerCardAlert = document.createElement("div");
        winnerCardAlert.id = "winner-card-alert";
        winnerCardContainer.appendChild(winnerCardAlert);

        winnerCardGrid = document.createElement("div");
        winnerCardGrid.id = "winner-card-grid";
        winnerCardContainer.appendChild(winnerCardGrid);

        winnerCardAction = document.createElement("div");
        winnerCardAction.id = "winner-card-action";
        winnerCardContainer.appendChild(winnerCardAction);
    } else {
        winnerCardOverlay.classList.remove("hidden");
    }

    winnerStep = 1;
    isSelectingWinnerCard = true;
    winnerCardNumbers = { B: [], I: [], N: [], G: [], O: [] };
    winnerCardAlert.textContent = "Clique nos números sorteados para montar a cartela vencedora. Máximo: 5 por coluna.";
    renderWinnerCardSelection();
    winnerCardOverlay.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
}

function renderWinnerCardSelection() {
    // Colunas B I N G O, cada uma mostra os números sorteados daquela casa, chips clicáveis
    const cols = ['B', 'I', 'N', 'G', 'O'];
    let sortedByCol = {};
    cols.forEach(col => {
        sortedByCol[col] = drawnNumbers.filter(num => getBingoLetter(num) === col).sort((a, b) => a - b);
    });

    winnerCardGrid.innerHTML = "";
    let table = document.createElement("table");
    table.className = "bingo-select-table";

    let trHead = document.createElement("tr");
    cols.forEach(col => {
        let th = document.createElement("th");
        th.textContent = col;
        th.className = `bingo-${col.toLowerCase()}`;
        trHead.appendChild(th);
    });
    table.appendChild(trHead);

    let maxRows = Math.max(...cols.map(col => sortedByCol[col].length));

    // Monta as linhas
    for (let row = 0; row < maxRows; row++) {
        let tr = document.createElement("tr");
        cols.forEach(col => {
            let td = document.createElement("td");
            let num = sortedByCol[col][row];
            if (num !== undefined) {
                let isSelected = winnerCardNumbers[col].includes(num);
                let chip = document.createElement("span");
                chip.className = `card-chip-selectable ${col.toLowerCase()}${isSelected ? " selected" : ""}`;
                chip.textContent = num;
                chip.title = isSelected ? "Remover da cartela vencedora" : "Selecionar na cartela vencedora";
                chip.onclick = () => {
                    if (isSelected) {
                        winnerCardNumbers[col] = winnerCardNumbers[col].filter(n => n !== num);
                        renderWinnerCardSelection();
                    } else if (winnerCardNumbers[col].length < 5) {
                        winnerCardNumbers[col].push(num);
                        renderWinnerCardSelection();
                    } else {
                        winnerCardAlert.textContent = `Máximo de 5 números na coluna ${col}.`;
                        winnerCardAlert.classList.add("alert");
                        setTimeout(() => winnerCardAlert.classList.remove("alert"), 1500);
                    }
                };
                td.appendChild(chip);
            } else {
                td.innerHTML = "";
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    }
    winnerCardGrid.appendChild(table);

    // Soma total selecionado em todas as colunas
    let totalSelected = cols.reduce((sum, col) => sum + winnerCardNumbers[col].length, 0);

    let info = document.createElement("div");
    info.style.margin = '0.4em 0 0.5em 0';
    info.style.fontSize = '0.98em';
    info.innerHTML = `Selecionados: <b>${totalSelected}</b> / 25`;
    winnerCardGrid.appendChild(info);

    // Botões de ação
    winnerCardAction.innerHTML = "";
    let btnConfirm = document.createElement("button");
    btnConfirm.textContent = "Exibir Cartela Vencedora";
    btnConfirm.className = "confirm-btn";
    btnConfirm.disabled = totalSelected < 5;
    btnConfirm.onclick = onConfirmWinnerCard;
    winnerCardAction.appendChild(btnConfirm);

    let btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancelar";
    btnCancel.className = "cancel-btn";
    btnCancel.onclick = () => hideWinnerCardOverlay();
    winnerCardAction.appendChild(btnCancel);
}

function onConfirmWinnerCard() {
    const cols = ['B', 'I', 'N', 'G', 'O'];
    let total = cols.reduce((sum, col) => sum + winnerCardNumbers[col].length, 0);
    if (total < 5) {
        winnerCardAlert.textContent = "Selecione pelo menos uma linha (5 números) para validar a cartela vencedora!";
        winnerCardAlert.classList.add("alert");
        setTimeout(() => winnerCardAlert.classList.remove("alert"), 1500);
        return;
    }
    winnerStep = 2;
    isSelectingWinnerCard = false;
    renderWinnerCardFinal();
}

function renderWinnerCardFinal() {
    winnerCardAlert.textContent = "Cartela vencedora";
    winnerCardGrid.innerHTML = "";

    const cols = ['B', 'I', 'N', 'G', 'O'];
    // Cada coluna tem até 5 números, completa com vazio se faltar algum número na seleção
    // Exibe de cima para baixo (primeiro selecionado fica na primeira linha)
    let grid = cols.map(col => {
        let arr = [...winnerCardNumbers[col]];
        while (arr.length < 5) arr.push("");
        // NÃO inverter! Exibe de cima para baixo:
        return arr;
    });

    let table = document.createElement("table");
    table.className = "virtual-bingo-card-final blue-bingo-table";

    let trHead = document.createElement("tr");
    cols.forEach((col, idx) => {
        let th = document.createElement("th");
        th.textContent = col;
        th.className = `bingo-header bingo-${col.toLowerCase()}`;
        trHead.appendChild(th);
    });
    table.appendChild(trHead);

    for (let r = 0; r < 5; r++) {
        let tr = document.createElement("tr");
        for (let c = 0; c < 5; c++) {
            let num = grid[c][r];
            let td = document.createElement("td");
            td.innerHTML = num
                ? `<span class="card-chip final">${num}</span>`
                : `<span class="card-chip empty"></span>`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    winnerCardGrid.appendChild(table);

    winnerCardAction.innerHTML = "";

    let btnNew = document.createElement("button");
    btnNew.textContent = "Novo Bingo";
    btnNew.className = "new-bingo-btn";
    btnNew.onclick = () => {
        hideWinnerCardOverlay();
        initGame();
    };
    winnerCardAction.appendChild(btnNew);

    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar Cartela";
    btnEdit.className = "edit-card-btn";
    btnEdit.onclick = () => {
        winnerStep = 1;
        isSelectingWinnerCard = true;
        renderWinnerCardSelection();
    };
    winnerCardAction.appendChild(btnEdit);
}

function hideWinnerCardOverlay() {
    if (winnerCardOverlay) {
        winnerCardOverlay.classList.add("hidden");
        document.body.style.overflow = '';
    }
}

closeModalBtn.addEventListener('click', () => {
    hideModal();
});
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
});
function showModal() {
    modalTableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${renderNumbersCol('B')}</td>
                    <td>${renderNumbersCol('I')}</td>
                    <td>${renderNumbersCol('N')}</td>
                    <td>${renderNumbersCol('G')}</td>
                    <td>${renderNumbersCol('O')}</td>
                </tr>
            </tbody>
        </table>
    `;
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function hideModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

function checkEnd() {
    if (availableNumbers.length === 0) {
        drawBtn.disabled = true;
        endMessage.classList.remove('hidden');
    }
}