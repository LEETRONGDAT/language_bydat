/* Fill lessons 11-100 without touching the original data.js / lessons.json.
   The first 10 days remain exactly as authored. */
(function(){
  const topics = {
    11:['work role','工作职责'],12:['asking for information','询问信息'],13:['meetings','会议'],14:['production planning','生产计划'],15:['progress reports','进度报告'],16:['SMT equipment','SMT设备'],17:['components','电子元件'],18:['feeders and nozzles','飞达和吸嘴'],19:['printer and stencil','印刷机和钢网'],20:['mounter and program','贴片机和程序'],21:['reflow','回流焊'],22:['AOI and SPI','AOI和SPI'],23:['defects','不良'],24:['troubleshooting','故障排查'],25:['model change','换机种'],26:['changeover','换线'],27:['UPH and output','UPH和产出'],28:['machine uptime','设备稼动率'],29:['downtime','停机'],30:['maintenance','维护保养'],31:['safety','安全'],32:['quality','品质'],33:['root cause','根本原因'],34:['5 Why','5 Why分析'],35:['improvement','改善'],36:['jigs','治具'],37:['ERP and MBOM','ERP和MBOM'],38:['Gerber and Centroid','Gerber和Centroid'],39:['SOP','SOP'],40:['engineer training','工程师培训'],41:['shift handover','交接班'],42:['work emails','工作邮件'],43:['suppliers','供应商'],44:['purchasing','采购'],45:['material inspection','物料检查'],46:['material shortage','缺料'],47:['PMC schedule','PMC计划'],48:['change request','变更要求'],49:['customers','客户'],50:['deadlines','截止时间'],51:['disagreements','意见分歧'],52:['asking for support','寻求支持'],53:['confirmation','确认'],54:['explaining the cause','解释原因'],55:['solutions','解决方案'],56:['action follow-up','行动跟进'],57:['weekly reports','周报'],58:['monthly reports','月报'],59:['presentations','汇报'],60:['job interviews','面试'],61:['technical discussions','技术讨论'],62:['process description','流程说明'],63:['equipment description','设备说明'],64:['quality discussion','品质沟通'],65:['productivity discussion','效率沟通'],66:['cost discussion','成本沟通'],67:['time discussion','时间沟通'],68:['risk discussion','风险沟通'],69:['priorities','优先事项'],70:['goals','目标'],71:['business trips','出差'],72:['airports','机场'],73:['taxis and transport','出租车和交通'],74:['restaurants on business trips','出差餐厅'],75:['hotels on business trips','出差酒店'],76:['online shopping','网上购物'],77:['banking','银行业务'],78:['addresses and delivery','地址和配送'],79:['meeting new people','认识新朋友'],80:['small talk','闲聊'],81:['new colleagues','新同事'],82:['talking to a manager','和主管沟通'],83:['talking to customers','和客户沟通'],84:['business phone calls','工作电话'],85:['video meetings','视频会议'],86:['presenting a problem','说明问题'],87:['following deadlines','跟进截止时间'],88:['requesting changes','提出变更'],89:['handling errors','处理错误'],90:['apologies and explanations','道歉和解释'],91:['double-checking','再次确认'],92:['giving opinions','发表意见'],93:['agreeing and disagreeing','同意和反对'],94:['natural speaking','自然表达'],95:['listening and asking again','听懂和再确认'],96:['long conversations','长对话'],97:['advanced interviews','高级面试'],98:['factory role-play','工厂角色扮演'],99:['daily-life role-play','生活角色扮演'],100:['100-day review','100天复习']
  };
  const en = t => [
    [`Let's talk about ${t}.`,`Chúng ta hãy nói về ${t}.`,`Let's + V để mở đầu chủ đề.`,[['Let’s + V',true]]],
    [`I need to understand this clearly.`,`Tôi cần hiểu rõ việc này.`,`need to + V = cần làm gì.`,[['need to + V',true]]],
    [`Can you explain the details?`,`Bạn có thể giải thích chi tiết không?`,`Can you + V? dùng để yêu cầu lịch sự.`,[['Can you + V?',true]]],
    [`Please show me how it works.`,`Vui lòng chỉ cho tôi cách nó hoạt động.`,`show me how + mệnh đề = chỉ cho tôi cách…`,[['show me how...',true]]],
    [`I will check it and get back to you.`,`Tôi sẽ kiểm tra và phản hồi lại bạn.`,`get back to you = phản hồi lại bạn.`,[['get back to you',true]]],
    [`There is a small problem here.`,`Có một vấn đề nhỏ ở đây.`,`There is + noun để nêu vấn đề/sự tồn tại.`,[['There is + noun',true]]],
    [`What do you suggest?`,`Bạn đề xuất gì?`,`What do you suggest? dùng để xin ý kiến/giải pháp.`,[['What do you suggest?',true]]],
    [`I think we should check it again.`,`Tôi nghĩ chúng ta nên kiểm tra lại.`,`should + V = nên làm gì.`,[['should + V',true]]],
    [`Let me confirm the information first.`,`Để tôi xác nhận thông tin trước.`,`Let me + V = để tôi làm gì.`,[['Let me + V',true]]],
    [`Thank you for your support.`,`Cảm ơn bạn đã hỗ trợ.`,`Thank you for + noun/V-ing.`,[['Thank you for + V-ing',true]]]
  ].map(([text,vi,explain,s])=>({text,vi,explain,structures:s.map(([name,isNew])=>({name,new:isNew}))}));
  const zh = t => [
    [`我们来谈谈${t}。`,`Wǒmen lái tán tán ${t}.`,`来谈谈 = cùng nói về…`,[['来谈谈 + topic',true]]],
    ['我需要清楚地了解这件事。','Wǒ xūyào qīngchǔ de liǎojiě zhè jiàn shì.','需要 + V = cần làm gì.',[['需要 + V',true]]],
    ['你可以解释一下细节吗？','Nǐ kěyǐ jiěshì yíxià xìjié ma?','可以 + V + 吗? dùng để hỏi/yêu cầu.',[['可以 + V + 吗？',true]]],
    ['请告诉我怎么做。','Qǐng gàosu wǒ zěnme zuò.','请 + V để yêu cầu lịch sự.',[['请 + V',true]]],
    ['我检查以后再回复你。','Wǒ jiǎnchá yǐhòu zài huífù nǐ.','以后 = sau khi; 再 = rồi mới.',[['V + 以后 + 再 + V',true]]],
    ['这里有一个小问题。','Zhèlǐ yǒu yí ge xiǎo wèntí.','这里有 + noun = ở đây có…',[[ '这里有 + noun',true]]],
    ['你有什么建议？','Nǐ yǒu shénme jiànyì?','有什么建议 = có đề xuất gì.',[['有什么建议？',true]]],
    ['我觉得我们应该再检查一次。','Wǒ juéde wǒmen yīnggāi zài jiǎnchá yí cì.','应该 + V = nên làm gì.',[['应该 + V',true]]],
    ['让我先确认一下信息。','Ràng wǒ xiān quèrèn yíxià xìnxī.','让我 + V = để tôi làm gì.',[['让我 + V',true]]],
    ['谢谢你的支持。','Xièxie nǐ de zhīchí.','谢谢 + noun để cảm ơn.',[['谢谢 + noun',true]]]
  ].map(([text,pinyin,vi,explain,s])=>({text,pinyin,vi,explain,structures:s.map(([name,isNew])=>({name,new:isNew}))}));
  Object.keys(topics).forEach(k=>{
    const d=Number(k), pair=topics[d];
    if(!LESSONS.en[d]) LESSONS.en[d]=en(pair[0]);
    if(!LESSONS.zh[d]) LESSONS.zh[d]=zh(pair[1]);
  });
  window.GENERATED_TOPICS=topics;
})();
