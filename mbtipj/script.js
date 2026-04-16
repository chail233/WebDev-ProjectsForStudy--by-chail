//mbti
//问题对象数组
const questions = [
    { id: 1, text: "你更倾向于？", options: ["E：喜欢与人交往获取能量", "I：通过独处恢复能量"], type: "EI" },
    { id: 2, text: "你更关注？", options: ["S：现实、具体、细节", "N：想象、抽象、未来"], type: "SN" },
    { id: 3, text: "做决定时更依靠？", options: ["T：逻辑、客观、道理", "F：感受、人情、价值观"], type: "TF" },
    { id: 4, text: "生活方式更偏向？", options: ["J：计划、有条理、确定", "P：灵活、随性、开放"], type: "JP" },
    { id: 5, text: "聚会后你通常感觉？", options: ["E：充满活力", "I：疲惫需要独处"], type: "EI" },
    { id: 6, text: "你更相信？", options: ["S：亲身经验", "N：灵感直觉"], type: "SN" },
    { id: 7, text: "批评别人时你更？", options: ["T：直接讲道理", "F：照顾对方情绪"], type: "TF" },
    { id: 8, text: "你更喜欢？", options: ["J：安排好的日程", "P：随机应变"], type: "JP" },
    { id: 9, text: "认识新朋友对你来说是？", options: ["E：轻松愉快", "I：有压力"], type: "EI" },
    { id: 10, text: "学习新东西时你更关注？", options: ["S：实用方法", "N：底层原理"], type: "SN" },
    { id: 11, text: "解决问题优先？", options: ["T：公平正确", "F：和谐关系"], type: "TF" },
    { id: 12, text: " deadline 对你来说？", options: ["J：督促我前进", "P：让我紧张"], type: "JP" },
    { id: 13, text: "空闲时你更愿意？", options: ["E：和朋友出去玩", "I：宅家休息"], type: "EI" },
    { id: 14, text: "描述事情你更？", options: ["S：直白具体", "N：比喻联想"], type: "SN" },
    { id: 15, text: "你更讨厌？", options: ["T：不讲逻辑", "F：冷漠无情"], type: "TF" },
    { id: 16, text: "你更像？", options: ["J：严谨自律", "P：自由散漫"], type: "JP" },
    { id: 17, text: "社交中你通常是？", options: ["E：主动开启话题", "I：被动回应"], type: "EI" },
    { id: 18, text: "你更擅长？", options: ["S：实操执行", "N：创新构思"], type: "SN" },
    { id: 19, text: "你更看重？", options: ["T：事实真相", "F：人情温暖"], type: "TF" },
    { id: 20, text: "你更喜欢？", options: ["J：事情尽早结束", "P：保持多种可能"], type: "JP" }
];

// 结果解读库
const typeinfo = {
    "ISTJ": {"name":"物流师","desc":"踏实、负责、务实，重视规则和秩序，做事可靠。"},
    "ISFJ": {"name":"守卫者","desc":"温暖细心，有责任心，乐于照顾他人，重视和谐。"},
    "INFJ": {"name":"提倡者","desc":"温柔而坚定，理想主义，追求深层意义和成长。"},
    "INTJ": {"name":"建筑师","desc":"独立思考，战略眼光，追求效率与创新。"},
    "ISTP": {"name":"鉴赏家","desc":"冷静灵活，动手能力强，喜欢解决实际问题。"},
    "ISFP": {"name":"探险家","desc":"温和敏感，热爱自由，注重当下体验。"},
    "INFP": {"name":"调停者","desc":"理想主义，内心丰富，追求真实与自我。"},
    "INTP": {"name":"逻辑学家","desc":"好奇聪明，喜欢思考，擅长分析理论。"},
    "ESTP": {"name":"企业家","desc":"精力充沛，社交能力强，喜欢挑战与刺激。"},
    "ESFP": {"name":"表演者","desc":"热情开朗，享受生活，擅长带动气氛。"},
    "ENFP": {"name":"竞选者","desc":"充满创意，热情乐观，善于启发他人。"},
    "ENTP": {"name":"辩论家","desc":"思维敏捷，喜欢挑战，擅长创新思考。"},
    "ESTJ": {"name":"总经理","desc":"果断务实，擅长管理，重视效率与秩序。"},
    "ESFJ": {"name":"执政官","desc":"热心负责，社交能力强，重视团队和谐。"},
    "ENFJ": {"name":"主人公","desc":"魅力领导力，善于鼓励，帮助他人成长。"},
    "ENTJ": {"name":"指挥官","desc":"天生领袖，果断目标导向，擅长规划。"}
};
//渲染题目
const quizContainer = document.getElementById("quiz-container");
function showQuiz() {
    //遍历问题
    questions.forEach((q, idx)=>{
        //创建div元素用来承载问题
        const qEl = document.createElement("div");
        //规定class
        qEl.className="question";
        //规定内嵌html
        qEl.innerHTML = `
        <div class="question-title">${idx+1}.${q.text}</div>
        <div class="options" data-qid="${q.id}">
            <div class="option" data-value="0">${q.options[0]}</div>
            <div class="option" data-value="1">${q.options[1]}</div>
        </div>
        `;
        //添加到问题区域
        quizContainer.appendChild(qEl);
        //遍历选项
        document.querySelectorAll(".option").forEach((el) => {
            //为每个选项增加点击事件
            el.addEventListener("click", ()=>{
                //对于当前选项的问题的其他选项，取消选择状态，为选择的选项添加选择状态
                const parent = el.parentElement;
                parent.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
                el.classList.add("selected");
            });
        });
    });
}

//计算结果
function calRes(){
    let score = {E:0, I:0, S:0, T:0, N:0, F:0, J:0, P:0};
    document.querySelectorAll(".options").forEach(optG=>{
        const selected = optG.querySelector(".selected");
        if(!selected) return;
        const qid = optG.dataset.qid;
        const q = questions.find(item=>item.id==qid);
        const val = selected.dataset.value;
        //计分
        if(q.type==="EI") val==0 ? score.E++ : score.I++;
        if(q.type==="SN") val==0 ? score.S++ : score.N++;
        if(q.type==="TF") val==0 ? score.T++ : score.F++;
        if(q.type==="JP") val==0 ? score.J++ : score.P++;
    });
    //生成类型
    const type = [
        score.E>score.I?"E":"I",
        score.S>score.N?"S":"N",
        score.T>score.F?"T":"F",
        score.J>score.P?"J":"P"
    ].join("");
    return type;
}

//显示结果
function shewRes(type){
    const info = typeinfo[type];
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = `
        <h2>你的MBTI类型是</h2>
        <div class="type">${type}</div>
        <h3>${info.name}</h3>
        <div class="desc-result">${info.desc}</div>
    `
    resultEl.classList.remove("hidden");
}

//提交按钮
document.getElementById("submit-btn").addEventListener("click", ()=>{
   const type = calRes();
   shewRes(type);
});
//初始化
showQuiz();