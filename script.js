const history = [];
const modal = document.getElementById('myModal');

const shortInsanityList = {
    1 : "気絶あるいは金切り声の発作。",
    2 : "パニック状態で逃げ出す。",
    3 : "肉体的なヒステリーあるいは感情の噴出(大笑い、大泣きなど)。",
    4 : "早口でぶつぶつ言う意味不明の会話あるいは多弁症(一貫した会話の奔流)。",
    5 : "探索者をその場に釘づけにしてしまうかもしれないような極度の恐怖症。",
    6 : "殺人癖あるいは自殺癖。",
    7 : "幻覚あるいは妄想。",
    8 : "反響動作あるいは反響言語(探索者は周りの者の動作あるいは発言を反復する)。",
    9 : "奇妙なもの、異様なものを食べたがる(泥、粘着物、人肉など)。",
    10 : "混迷(胎児のような姿勢をとる、物事を忘れる)あるいは緊張症(我慢することはできるが意志も興味もない；強制的に単純な行動をとらせることはできるが、自発的に行動することはできない)。"
}
const longInsanityList = {
    1 : "健忘症(親しい者のことを最初に忘れる；言語や肉体的な技能は働くが、知的な技能は働かない)あるいは混迷/緊張症。",
    2 : "激しい恐怖症(逃げ出すことはできるが、恐怖の対象はどこへ行っても見える)。",
    3 : "幻覚。",
    4 : "奇妙な性的嗜好(露出症、過剰性欲、奇形愛好症など)。",
    5 : "フェティッシュ(探索者はある物、ある種類の物、人物に対し異常なまでに執着する)。",
    6 : "制御不能のチック、震え、あるいは会話や文章で人と交流することができなくなる。",
    7 : "心因性視覚障害、心因性難聴、単数あるいは複数の四肢の機能障害。",
    8 : "短時間の心因反応(支離滅裂、妄想、常軌を逸した振る舞い、幻覚など)。",
    9 : "一時的偏執症。",
    10 : "強迫観念に取りつかれた行動(手を洗い続ける、祈る、特定のリズムで歩く、割れ目をまたがない、銃を絶え間なくチェックをし続けるなど)。"
}

function addToHistory(rolls, diceType, total = 0) {
    // 履歴に結果を追加
    history.unshift({ rolls, diceType, total });

    // 履歴が10件を超える場合、古いものから削除
    if (history.length > 10) {
        history.pop();
    }

    // 履歴を表示するコンテナを取得
    const historyContainer = document.getElementById('history');

    // 履歴をコンテナに表示
    historyContainer.innerHTML = "";
    for (const entry of history) {
        const historyEntry = document.createElement('div');
        historyEntry.classList.add('history-entry');

        const diceType = document.createElement('div');
        diceType.classList.add('history-dice-type');
        diceType.textContent = `(${entry.diceType}) `;
        historyEntry.appendChild(diceType);

        const total = document.createElement('div');
        total.classList.add('history-total');
        total.textContent = `${entry.total}`;
        historyEntry.appendChild(total);

        const result = document.createElement('div');
        result.classList.add('history-rolls');
        result.textContent = entry.rolls;
        historyEntry.appendChild(result);

        historyContainer.appendChild(historyEntry);
    }
}

function rollDice(diceCount, sides, add = 0) {
    const results = [];
    let total = 0;
    let diceType = `${diceCount}D${sides}`; // ダイスの種類を表す文字列を作成

    const addOneToTotalSwitch = document.getElementById('addOneToTotalSwitch');
    const addOneToTotal = addOneToTotalSwitch.checked; // スイッチがオンかどうか

    const addFourDiceToTotalSwitch = document.getElementById('addFourDiceToTotalSwitch');
    const addFourDiceToTotal = addFourDiceToTotalSwitch.checked; // スイッチがオンかどうか

    const addSixDiceToTotalSwitch = document.getElementById('addSixDiceToTotalSwitch');
    const addSixDiceToTotal = addSixDiceToTotalSwitch.checked; // スイッチがオンかどうか


    for (let i = 0; i < diceCount; i++) {
        let roll;
        roll = Math.floor(Math.random() * sides) + 1;
        results.push(`${roll}`);
        total += roll;
    }

    
    if (addFourDiceToTotal) {
        const fourDiceRoll = Math.floor(Math.random() * 4) + 1;
        results.push(`${fourDiceRoll}(1D4)`);
        total += fourDiceRoll;
        diceType += "+1D4";
    }
    
    if (addSixDiceToTotal) {
        const sixDiceRoll = Math.floor(Math.random() * 6) + 1;
        results.push(`${sixDiceRoll}(1D6)`);
        total += sixDiceRoll;
        diceType += "+1D6";
    }

    
    if (add > 0) {
        total += add;
        results.push(`+${add}`);
        diceType += "+" + add.toString();
    }

    if (addOneToTotal) {
        results.push(`+1`);
        total += 1;
        diceType += "+1";
    }
    
    addToHistory(results.join(", "), diceType, total); // 履歴に結果とダイスの種類を追加

    const popupResultsContainer = document.getElementById('popupResults');
    popupResultsContainer.innerHTML = `<span class="rolls">` + results.join(", ") + `</span><span class="results-total">${total}</span><span class="dice-type">${diceType}</span>`; // ダイスの種類を結果に追加

    modal.style.display = "flex";

    const modalWindow = document.getElementById('modal-window'); // modal-long-contentから戻すため
    modalWindow.className = "modal-content";
}

function rollInsanityDice(isShort) {
    let roll, insanity;
    roll = Math.floor(Math.random() * 10) + 1;

    if (isShort) {
        insanity = shortInsanityList[roll];
    } else {
        insanity = longInsanityList[roll];
    }

    const popupResultsContainer = document.getElementById('popupResults');
    popupResultsContainer.innerHTML = `<span class="rolls">${roll}.</span><span class="insanity">${insanity}</span>`; // ダイスの種類を結果に追加

    modal.style.display = "flex";

    if (isShort && roll === 10) {
        const modalWindow = document.getElementById('modal-window');
        modalWindow.className = "modal-long-content";
    } else {   
        const modalWindow = document.getElementById('modal-window');
        modalWindow.className = "modal-content";
    }
}

function closeModal() {
    modal.style.display = "none";
}

function showTab(tabNumber) {
    for (let i = 1; i <= 2; i++) {
        const tabContent = document.getElementById('tab' + i);
        const tabButton = document.querySelector('.tab-button:nth-child(' + i + ')');

        if (i === tabNumber) {
            tabContent.classList.add('active-tab');
            tabButton.style.fontWeight = 'bold';
        } else {
            tabContent.classList.remove('active-tab');
            tabButton.style.fontWeight = 'normal';
        }
    }
}

showTab(1);
modal.addEventListener('click', function(event) {
    if (event.target == modal) {
        closeModal();
    }
});