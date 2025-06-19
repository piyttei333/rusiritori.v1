<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>るしりとりゲーム</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        #chat-container {
            width: 90%;
            max-width: 400px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        #messages {
            height: 70%;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            background-color: #e9ecef;
        }

        #input-area {
            display: flex;
            padding: 10px;
            background-color: #fff;
        }

        #message-input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        #send-button {
            margin-left: 10px;
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #send-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div id="chat-container">
        <div id="messages"></div>
        <div id="input-area">
            <input type="text" id="message-input" placeholder="言葉を入力...">
            <button id="send-button">送信</button>
        </div>
    </div>
    <script>
const usedWords = [];
const aiWords = [
    "イスラエル", "エクアドル", "エルサルバドル", "カタール", "セネガル", "セーシェル", "ナウル",
    "ネパール", "ブラジル", "ポルトガル", "マダガスカル", "モンゴル", "ツバル", "ジブラルタル",
    "アイドル", "青汁", "アンコール", "インストール", "エール", "カエル", "キャラメル", "クール",
    "ゴール", "サル", "シンプル", "ノーマル", "テーブル", "ナチュラル", "タイトル", "ビール",
    "スケール", "ホテル", "丸", "昼", "ミサイル", "レール", "ルール", "リサイクル", "ロール",
    "ワッフル", "樽", "タイル", "ソウル", "トール", "コイル", "アール", "カール", "ケール",
    "コール", "セール", "ツール", "ネイル", "ホール", "モール", "夜", "リール", "サンプル",
    "トラブル", "リサイタル", "アニマル", "寝る", "ドル", "反る", "ルール", "テール", "着る", "減る",
];
const userWords = [
    "ルバーブ","ルービックキューブ", "ルッコラ", "ルイボスティー", "ルビーチョコレート", "ルー", "ルマンド", "ルック",
    "ルイベ", "ルーブル", "ルチアーノアイス", "ルクセンブルク", "ルアンダ", "ルイジアナ", "ルサカ",
    "ルーベ", "ルアンプラバーン", "ルアンパバーン", "ルーアン", "ルーマニア", "ルビアナ", "ルリコンゴウインコ",
    "ルドルフトナカイ", "ルリカケス", "ルー", "ルシアンブルー", "ルンバクラゲ", "ルリイトトンボ", "ルリタテハ",
    "ルリビタキ", "ルサール", "ルーレット", "ルビー", "ルームライト", "ルートビール", "ルームミラー",
    "ルノー車", "ルービックキューブ", "ルーター", "ルームスプレー", "ループタイ", "ループ", "ルネッサンス",
    "ルビドー現象", "ルービック理論", "ルート分岐", "ルーフ効果", "ルート変更", "ルート反射", "ループアウト",
    "ルート拡散","ルイスキャロル","るり色","ルバーブ",
];
const messages = document.getElementById("messages");
const input = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// ユーザーの送信処理
sendButton.addEventListener("click", () => {
    const rawMessage = input.value.trim();
    const message = normalizeWord(rawMessage); // 正規化した単語でチェック

    if (message) {
        // 「る」で始まるかチェック
        if (message[0] !== "る") {
            addChatMessage(`?? 「る」で始まる言葉を入力してください！`);
            return;
        }

        if (usedWords.includes(rawMessage)) {
            addChatMessage(`?? この単語「${rawMessage}」はすでに使われています！`);
            return;
        }

        // 最後の文字を取得（伸ばし棒対応）
        const lastChar = message[message.length - 1] === "ー"
            ? message[message.length - 2] // 伸ばし棒の場合その前の文字を取得
            : message[message.length - 1];

        if (lastChar === "ん") {
            endGame(`ユーザーが「ん」で終了しました！`);
            return;
        }

        usedWords.push(rawMessage);
        addChatMessage(`????? ユーザー: ${rawMessage}`);
        input.value = "";

        messages.scrollTop = messages.scrollHeight;

        // AIの応答
        setTimeout(() => {
            aiResponse(lastChar);
        }, 500); // 少し間を置いて応答
    }
});

// 正規化処理（ひらがな・カタカナ対応）
function normalizeWord(word) {
    return word.replace(/[\u30A1-\u30F4]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0x60)
    );
}

// AIの応答処理
function aiResponse(lastChar) {
    const aiWord = aiWords.find(
        (word) =>
            normalizeWord(word)[0] === lastChar &&
            !usedWords.includes(word)
    );

    if (!aiWord) {
        addChatMessage(`?? AIが適切な単語を思いつきませんでした！あなたの勝ちです！`);
        return;
    }

    usedWords.push(aiWord);
    addChatMessage(`?? AI: ${aiWord}`);
    messages.scrollTop = messages.scrollHeight;

    if (aiWord[aiWord.length - 1] === "ん") {
        endGame(`?? AIが「ん」で終了しました。あなたの勝ちです！`);
    }
}

// ゲーム終了処理
function endGame(message) {
    addChatMessage(`?? ${message} 総スコア: ${usedWords.length - 1}回続きました！`);
    input.value = ""; // ゲームを続行可能に
}

// チャットにメッセージを追加
function addChatMessage(text) {
    const newMessage = document.createElement("div");
    newMessage.textContent = text;
    newMessage.style.marginTop = "5px";
    messages.appendChild(newMessage);
    messages.scrollTop = messages.scrollHeight;
}



 </script>
</body>
</html>
