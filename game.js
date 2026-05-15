// 深夜のコンビニ ~煩悩との戦い~
// Yolo製造、品質保証なし

const state = {
  hp: 100,
  drunk: 50,
  bonnou: 99,
  money: 300,
  flags: {},
  scene: "start",
  index: 0,
  typing: false,
  fullText: ""
};

function $(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

function startGame() {
  showScreen("game");
  state.scene = "start";
  state.index = 0;
  runScene();
}

function restart() {
  state.hp = 100;
  state.drunk = 50;
  state.bonnou = 99;
  state.money = 300;
  state.flags = {};
  showScreen("warning");
}

function updateStatus() {
  $("hp").textContent = state.hp;
  $("drunk").textContent = state.drunk;
  $("bonnou").textContent = state.bonnou;
  $("money").textContent = state.money;
}

function toggleMenu() {
  $("menu").classList.toggle("show");
}

function setChar(emoji, fx) {
  const c = $("char");
  c.textContent = emoji;
  c.className = "character";
  if (fx) {
    void c.offsetWidth;
    c.classList.add(fx);
  }
}
function setBg(emoji) { $("bg").textContent = emoji; }
function effect(name) {
  const e = $("effect");
  e.className = "effect " + name;
  setTimeout(() => e.className = "effect", 1200);
}

// ============== シナリオ ==============
const scenes = {
  start: [
    { bg: "🌙", char: "🍶", speaker: "ナレーション",
      text: "深夜2時。\n君は飲み会の帰り、なぜかコンビニにいる。\n財布の中には300円。腹の中にはビール5杯。" },
    { speaker: "心の声", char: "🤤",
      text: "(なんか…甘いもの食べたい…)\n(あと…なんかエッチな気分…)\n(なんで?知らん。酒のせい。)" },
    { speaker: "心の声", char: "🤔",
      text: "コンビニの自動ドアが、君を待っている。\nどうする?",
      choices: [
        { text: "とりあえず入る(普通)", next: "kombini1" },
        { text: "ドアの前で深呼吸する(変態)", next: "deep_breath", effect: () => { state.bonnou += 10; } },
        { text: "やっぱ帰る", next: "go_home" }
      ]
    }
  ],

  go_home: [
    { speaker: "ナレーション", char: "🚶",
      text: "君は賢明にも家に帰った。\nそして布団に倒れ込んだ。\n…なにも起きなかった。" },
    { ending: "賢者エンド", rank: "S",
      text: "煩悩に打ち勝った君は、明日も健全な社会人として目覚めるだろう。\n…つまんねぇ人生だな。" }
  ],

  deep_breath: [
    { speaker: "通行人", char: "👮",
      text: "「お兄さん、大丈夫?」\n警察官に職務質問された。", effect: () => { state.bonnou -= 5; }
    },
    { speaker: "主人公", char: "😅",
      text: "「だ、大丈夫です!ちょっと酔ってて…」\n命からがらコンビニに入った。",
      next: "kombini1"
    }
  ],

  kombini1: [
    { bg: "🏪", char: "💁‍♀️", speaker: "店員",
      text: "「いらっしゃいませ〜♡」\n\nなんか…店員さん、めっちゃテンション高くない?\nしかも、深夜なのに完璧なメイク。" },
    { speaker: "店員", char: "💁‍♀️",
      text: "「お兄さん、お酒入ってる?\nウチの店、今日特別キャンペーン中なんですよ〜♡」",
      effect: () => { effect("heart"); }
    },
    { speaker: "心の声", char: "🤨",
      text: "(キャンペーン…?\n深夜のコンビニで…?\n絶対なんかおかしいやろ。)",
      choices: [
        { text: "「どんなキャンペーンですか?」(乗る)", next: "campaign" },
        { text: "「いえ、結構です」(冷静)", next: "shopping" },
        { text: "「結婚してください」(酔っ払い)", next: "propose", effect: () => { state.drunk += 20; } }
      ]
    }
  ],

  propose: [
    { speaker: "店員", char: "😨",
      text: "「えっ……」\n\n店内が静まり返った。\n冷蔵庫の音だけが響く。" },
    { speaker: "店員", char: "😤",
      text: "「お兄さん、酔っ払いすぎ!\nちゃんと水買って帰って!」\n\n君は2リットルの水を強制購入させられた。",
      effect: () => { state.money -= 200; state.drunk -= 30; state.bonnou -= 20; }
    },
    { next: "shopping" }
  ],

  campaign: [
    { speaker: "店員", char: "💁‍♀️",
      text: "「えっとですね〜♡\nお会計の時に\n『今夜、月が綺麗ですね』\nって言ってくれたら……」",
      effect: () => { effect("heart"); }
    },
    { speaker: "店員", char: "😏",
      text: "「秘密のサービスがあります♡」\n\n秘密のサービス。\nおい。なんだそれ。" },
    { speaker: "心の声", char: "🥵",
      text: "(待て待て待て。\n冷静になれ俺。\nこれ絶対、罠か詐欺か、最高の夜の始まりかのどれかだ。)",
      effect: () => { state.bonnou += 15; }
    },
    { next: "shopping" }
  ],

  shopping: [
    { bg: "🥫", char: "🛒", speaker: "ナレーション",
      text: "とりあえず買い物しよう。\n何を買う?",
      choices: [
        { text: "肉まん(120円)", next: "nikuman", effect: () => { state.money -= 120; state.hp += 20; } },
        { text: "エナドリ(200円)", next: "energy", effect: () => { state.money -= 200; state.drunk -= 20; state.hp += 10; } },
        { text: "謎の新商品『恋する豆乳』(180円)", next: "tounyu", effect: () => { state.money -= 180; state.bonnou += 30; } },
        { text: "何も買わない", next: "kaikei" }
      ]
    }
  ],

  nikuman: [
    { speaker: "ナレーション", char: "🥟",
      text: "肉まんを温めてもらった。\nふっくらしてて、いい匂い。\n人生で一番美味そうに見えた。",
      next: "kaikei"
    }
  ],

  energy: [
    { speaker: "ナレーション", char: "⚡",
      text: "謎の海外製エナドリ。\n缶に『FOR REAL MAN』と書いてある。\n不安。",
      next: "kaikei"
    }
  ],

  tounyu: [
    { speaker: "店員", char: "😍",
      text: "「お兄さん、それ選ぶの!?\nセンスありますね♡\nそれ、飲んだ人みんな……うふふ」" },
    { speaker: "心の声", char: "😱",
      text: "(うふふ、じゃねぇよ。\n何が起きるんだよ。)",
      effect: () => { state.bonnou += 20; },
      next: "kaikei"
    }
  ],

  kaikei: [
    { bg: "💰", char: "💁‍♀️", speaker: "店員",
      text: "「お会計、ご一緒に温めますか〜?♡」\n\n温めるのは商品か、それとも……" },
    { speaker: "心の声", char: "🤯",
      text: "ここで例の合言葉を言うかどうか……\n月、綺麗かな?",
      choices: [
        { text: "「今夜、月が綺麗ですね」", next: "secret", effect: () => { state.bonnou += 20; } },
        { text: "普通に支払う", next: "normal_pay" },
        { text: "「あなたが月です」", next: "tsuki_dayo", effect: () => { state.drunk += 10; } }
      ]
    }
  ],

  tsuki_dayo: [
    { speaker: "店員", char: "🤣",
      text: "「ぶふっ……ww\nおにいさんwww\n酔っ払いすぎですってww」\n\n店員さん、笑い崩れた。" },
    { speaker: "店員", char: "😊",
      text: "「でも、ちょっと面白いから\nおまけしときます♡」\n\nおにぎりをサービスしてもらった。",
      effect: () => { state.hp += 30; state.bonnou += 5; },
      next: "exit"
    }
  ],

  normal_pay: [
    { speaker: "ナレーション", char: "💴",
      text: "普通に支払った。\n普通にお釣りをもらった。\n普通の夜。",
      next: "exit"
    }
  ],

  secret: [
    { speaker: "店員", char: "😳",
      text: "「……っ!\nほ、本当に言うなんて……」\n\n店員さんの顔が真っ赤になった。",
      effect: () => { effect("flash"); }
    },
    { speaker: "店員", char: "💋",
      text: "「じゃあ……バックヤードに来てください……\nレジ閉めるんで……♡」" },
    { speaker: "心の声", char: "🤤",
      text: "(まさか…!?\nまさかこれは…!?)",
      choices: [
        { text: "ついていく(行くしかない)", next: "backyard" },
        { text: "「やっぱやめときます!」と逃げる", next: "escape" }
      ]
    }
  ],

  escape: [
    { speaker: "ナレーション", char: "🏃",
      text: "君は走って逃げた。\n肉まんを握りしめて。\n夜風が冷たい。" },
    { ending: "ヘタレエンド", rank: "C",
      text: "賢明な判断だったかもしれない。\nでも、君は一生『あの時行ってればなぁ』と言い続けるだろう。\n知らんけど。"
    }
  ],

  backyard: [
    { bg: "📦", char: "🚪", speaker: "ナレーション",
      text: "バックヤードに通された。\n段ボールが積まれた、薄暗い部屋。\n胸の鼓動が早い。" },
    { speaker: "店員", char: "😈",
      text: "「お兄さん……♡\n覚悟、できてます……?」",
      effect: () => { effect("heart"); }
    },
    { speaker: "心の声", char: "🥵",
      text: "(きた…!\nついに俺の青春が…!)\n\nゴクリ。",
      next: "reveal"
    }
  ],

  reveal: [
    { speaker: "店員", char: "🎤",
      text: "「ジャジャーン!!\n当店、24時間カラオケキャンペーン中!!\n一緒に歌いましょう!!!」",
      effect: () => { effect("flash"); }
    },
    { bg: "🎤", char: "😶", speaker: "心の声",
      text: "(……は?)\n(カラオケ?)\n(カラオケって…えっと…あの…歌う方の?)" },
    { speaker: "店員", char: "🎶",
      text: "「バックヤード、防音なんですよ〜♡\n深夜だからストレス発散しに来てくれたお客さんに\n秘密のカラオケサービスしてるんです♡」",
      choices: [
        { text: "「…じゃあ、歌います」(諦め)", next: "sing" },
        { text: "「ふざけんな!」とキレる", next: "blow_up" },
        { text: "「いやでも俺、月が…」", next: "tsuki_chigau" }
      ]
    }
  ],

  tsuki_chigau: [
    { speaker: "店員", char: "😇",
      text: "「えっ?月?何の話ですか?\nウチの合言葉は『カラオケしたい』ですよ?\nお客さん、何か変な勘違いしてません?w」"
    },
    { speaker: "心の声", char: "💀",
      text: "(\\(^o^)/オワタ)\n(俺はとんでもない勘違い野郎だ……)",
      next: "sing"
    }
  ],

  blow_up: [
    { speaker: "主人公", char: "🤬",
      text: "「ふざけんな!!\nこっちはエロい展開を期待してたんだ!!」" },
    { speaker: "店員", char: "📞",
      text: "「えっ、こわ。通報します」\n\n警察が来た。",
      effect: () => { state.hp = 0; }
    },
    { ending: "逮捕エンド", rank: "F",
      text: "君は公然わいせつ未遂(?)で連行された。\n会社にもバレた。\n人生終了。\n\n…まあ、酔ってる時は冷静になろうね。"
    }
  ],

  sing: [
    { bg: "🎤", char: "🎙️", speaker: "ナレーション",
      text: "君は店員さんとデュエットで\n『секретный песня』を熱唱した。\n(なぜかロシア語の曲が流れた)" },
    { speaker: "店員", char: "🥰",
      text: "「お兄さん、めっちゃ歌うまい!\nまた来てくださいね♡」",
      effect: () => { effect("heart"); state.bonnou -= 30; state.hp += 20; }
    },
    { speaker: "ナレーション", char: "🌅",
      text: "気づけば朝。\nなぜか肩が筋肉痛。\n君はコンビニを後にした。\nなんか…清々しい。"
    },
    { ending: "カラオケエンド", rank: "B",
      text: "エロは無かった。\nでも、なんか満たされた夜だった。\n…これでいいのか?\nいや、これがいいんだ。"
    }
  ],

  exit: [
    { bg: "🌃", char: "🚶", speaker: "ナレーション",
      text: "コンビニを出た。\n夜風が気持ちいい。\n…なんだろう、この敗北感。" },
    { speaker: "???", char: "👴",
      text: "「兄ちゃん、ちょっといいか?」\n\n突然、見知らぬおじさんに声をかけられた。",
      choices: [
        { text: "「はい?」(対応)", next: "oji_san" },
        { text: "全力ダッシュで逃げる", next: "dash_home" }
      ]
    }
  ],

  dash_home: [
    { speaker: "ナレーション", char: "💨",
      text: "君は全力で家まで走った。\n息切れがやばい。\n肉まんが冷めた。" },
    { ending: "無事帰宅エンド", rank: "A",
      text: "君は無事に家に帰った。\n肉まんを食べて寝た。\nまあ、これが正解だよね。\n青春ってそんなもん。"
    }
  ],

  oji_san: [
    { speaker: "おじさん", char: "👴",
      text: "「兄ちゃん、若いな〜。\nワシな、昔この街で\nめっちゃモテたんよ。」" },
    { speaker: "おじさん", char: "👴",
      text: "「秘訣、教えたろか?」",
      choices: [
        { text: "「お願いします!」", next: "hiketsu" },
        { text: "「いやいい」", next: "iya_ii" }
      ]
    }
  ],

  iya_ii: [
    { speaker: "おじさん", char: "😢",
      text: "「そっか……」\n\nおじさんは寂しそうに歩いていった。\n振り返ると、もういなかった。" },
    { ending: "謎エンド", rank: "?",
      text: "あのおじさんは何者だったのか。\nそもそも、本当にいたのか。\n君は今でも、たまに夢に見る。"
    }
  ],

  hiketsu: [
    { speaker: "おじさん", char: "🧙",
      text: "「ええか?\nモテる秘訣はな……」\n\nおじさんが顔を近づけてくる。" },
    { speaker: "おじさん", char: "✨",
      text: "「\n     『     寝     ろ     』\n」\n\n……。",
      effect: () => { effect("flash"); }
    },
    { speaker: "おじさん", char: "👴",
      text: "「ええか、兄ちゃん。\n夜更かしして煩悩抱えてコンビニ徘徊しとる時点で\nモテるわけないんや。\n早く寝ぇ。肌綺麗にして筋トレせぇ。」"
    },
    { speaker: "心の声", char: "😶",
      text: "(あまりにも、正論だった……)",
      effect: () => { state.bonnou = 0; }
    },
    { ending: "悟りエンド", rank: "SS",
      text: "君は人生で大切なことを学んだ。\n煩悩は寝れば消える。\n筋肉は裏切らない。\n月は綺麗だが、布団はもっと綺麗だ。\n\n〜完〜"
    }
  ]
};

// ============== ゲームエンジン ==============
function runScene() {
  const scene = scenes[state.scene];
  if (!scene) return;
  if (state.index >= scene.length) return;

  const node = scene[state.index];

  if (node.ending) {
    showEnding(node);
    return;
  }

  if (node.bg) setBg(node.bg);
  if (node.char) setChar(node.char, "bounce");
  if (node.speaker) $("speaker").textContent = node.speaker;
  if (node.effect) node.effect();

  updateStatus();

  $("choices").innerHTML = "";
  $("nextHint").classList.add("hidden");

  if (node.text) {
    typeText(node.text, () => {
      if (node.choices) {
        renderChoices(node.choices);
      } else if (node.next) {
        $("nextHint").classList.remove("hidden");
        waitTap(() => {
          state.scene = node.next;
          state.index = 0;
          runScene();
        });
      } else {
        $("nextHint").classList.remove("hidden");
        waitTap(() => {
          state.index++;
          runScene();
        });
      }
    });
  } else if (node.next) {
    state.scene = node.next;
    state.index = 0;
    runScene();
  }
}

function typeText(text, done) {
  state.typing = true;
  state.fullText = text;
  const el = $("text");
  el.textContent = "";
  let i = 0;
  const speed = 30;
  function step() {
    if (!state.typing) {
      el.textContent = text;
      done();
      return;
    }
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(step, speed);
    } else {
      state.typing = false;
      done();
    }
  }
  step();
}

function renderChoices(choices) {
  const c = $("choices");
  c.innerHTML = "";
  choices.forEach(ch => {
    const btn = document.createElement("button");
    btn.textContent = ch.text;
    bindTap(btn, () => {
      if (ch.effect) ch.effect();
      state.scene = ch.next;
      state.index = 0;
      runScene();
    });
    c.appendChild(btn);
  });
}

let tapHandler = null;
let tapTouchHandler = null;
function waitTap(callback) {
  removeTap();
  const fire = (e) => {
    if (e.target.closest(".choices") || e.target.closest(".menu-btn") || e.target.closest(".menu")) return;
    if (state.typing) {
      state.typing = false;
      e.preventDefault && e.preventDefault();
      return;
    }
    removeTap();
    e.preventDefault && e.preventDefault();
    callback();
  };
  tapHandler = fire;
  tapTouchHandler = fire;
  setTimeout(() => {
    document.addEventListener("click", tapHandler);
    document.addEventListener("touchend", tapTouchHandler, { passive: false });
  }, 150);
}
function removeTap() {
  if (tapHandler) document.removeEventListener("click", tapHandler);
  if (tapTouchHandler) document.removeEventListener("touchend", tapTouchHandler);
  tapHandler = null;
  tapTouchHandler = null;
}

function showEnding(node) {
  showScreen("ending");
  $("endingTitle").textContent = "🎉 " + node.ending + " 🎉";
  $("endingText").textContent = node.text;
  $("endingRank").textContent = "RANK: " + node.rank;
}

// イベントバインド (inline onclick は iOS Safari の file:// で塞がれる場合があるため)
function bindTap(el, handler) {
  if (!el) return;
  let consumed = false;
  el.addEventListener("touchend", (e) => {
    e.preventDefault();
    consumed = true;
    handler(e);
    setTimeout(() => { consumed = false; }, 400);
  }, { passive: false });
  el.addEventListener("click", (e) => {
    if (consumed) return;
    handler(e);
  });
}

document.addEventListener("DOMContentLoaded", init);
if (document.readyState !== "loading") init();

function init() {
  bindTap($("btnStart"), startGame);
  bindTap($("btnQuit"), () => alert("帰っていいよ"));
  bindTap($("btnMenu"), toggleMenu);
  bindTap($("btnRestart"), restart);
  bindTap($("btnCloseMenu"), toggleMenu);
  bindTap($("btnEndRestart"), restart);
  showScreen("warning");
}
