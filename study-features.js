/* Extra learning features: sentence-by-sentence speech + daily sitcom-style dialogues. */
(function(){
  const SCENES={
    1:['Gặp kỹ sư mới ở nhà máy','Hai kỹ sư gặp nhau lần đầu trước giờ làm'],
    2:['Buổi sáng trên chuyền SMT','Một đồng nghiệp đang kiểm tra máy và cần hỗ trợ'],
    3:['Cuộc họp lúc 9 giờ','Hai đồng nghiệp sắp xếp lại lịch họp'],
    4:['Sau giờ làm','Một người nói về gia đình và kế hoạch buổi tối'],
    5:['Mua phụ kiện ở cửa hàng','Khách tìm một sợi cáp và hỏi giá'],
    6:['Ăn trưa cùng đồng nghiệp','Hai người gọi món và xử lý món ăn quá cay'],
    7:['Hỏi đường đến nhà ga','Một người nước ngoài hỏi đường'],
    8:['Nhận phòng khách sạn','Khách đến sớm và hỏi về phòng, bữa sáng'],
    9:['Cuộc gọi bị lỗi mạng','Một cuộc gọi công việc bị gián đoạn'],
    10:['Hẹn cà phê ngày mai','Hai đồng nghiệp tìm thời gian phù hợp'],
  };
  const MORE_SCENES={
    11:'Giới thiệu vai trò mới trong nhóm',12:'Hỏi thông tin về một vấn đề trên line',13:'Cuộc họp PMC đầu tuần',14:'Thảo luận kế hoạch sản xuất',15:'Kỹ sư báo cáo tiến độ',16:'Kiểm tra thiết bị SMT',17:'Thiếu một linh kiện trên feeder',18:'Kiểm tra feeder và nozzle',19:'Xử lý vấn đề printer và stencil',20:'Tạo program cho mounter',21:'Kiểm tra nhiệt reflow',22:'Trao đổi kết quả AOI và SPI',23:'Một PCB bị defect',24:'Troubleshooting máy dừng bất thường',25:'Đổi model gấp trên line',26:'Changeover giữa hai model',27:'UPH thấp hơn mục tiêu',28:'Machine uptime giảm',29:'Một sự cố downtime',30:'Kế hoạch bảo trì máy',31:'Nhắc nhau về an toàn',32:'Một vấn đề quality cần xử lý',33:'Tìm root cause',34:'Dùng 5 Why trong cuộc họp',35:'Đề xuất cải tiến',36:'Kiểm tra jig',37:'Kiểm tra ERP và MBOM',38:'Đối chiếu Gerber và Centroid',39:'Cập nhật SOP',40:'Đào tạo kỹ sư mới',41:'Bàn giao ca',42:'Viết email công việc',43:'Trao đổi với supplier',44:'Xin báo giá mua hàng',45:'Kiểm tra vật liệu đầu vào',46:'Báo thiếu linh kiện',47:'PMC thay đổi lịch',48:'Yêu cầu thay đổi',49:'Khách hàng hỏi tình trạng',50:'Một deadline đến gần',51:'Hai người bất đồng ý kiến',52:'Xin đồng nghiệp hỗ trợ',53:'Xin xác nhận một thông tin',54:'Giải thích nguyên nhân lỗi',55:'Đưa ra giải pháp',56:'Theo dõi action',57:'Chuẩn bị weekly report',58:'Chuẩn bị monthly report',59:'Thuyết trình kết quả',60:'Phỏng vấn vị trí kỹ sư',61:'Thảo luận một vấn đề kỹ thuật',62:'Mô tả một quy trình',63:'Mô tả thiết bị cho người mới',64:'Trao đổi về quality',65:'Trao đổi về productivity',66:'Trao đổi về cost',67:'Trao đổi về thời gian',68:'Đánh giá risk',69:'Xác định priority',70:'Chốt mục tiêu',71:'Chuẩn bị đi công tác',72:'Tại sân bay',73:'Đi taxi',74:'Ăn tại nhà hàng khi công tác',75:'Nhận phòng khi công tác',76:'Mua hàng online',77:'Giải quyết việc ở ngân hàng',78:'Kiểm tra địa chỉ giao hàng',79:'Gặp người mới',80:'Small talk trước cuộc họp',81:'Làm quen đồng nghiệp mới',82:'Nói chuyện với sếp',83:'Trao đổi với khách',84:'Một cuộc điện thoại công việc',85:'Video meeting',86:'Trình bày vấn đề',87:'Theo dõi deadline',88:'Đề nghị thay đổi',89:'Xử lý một lỗi',90:'Xin lỗi và giải thích',91:'Xác nhận lại',92:'Đưa ra ý kiến',93:'Đồng ý và phản đối lịch sự',94:'Nói tự nhiên hơn',95:'Không nghe rõ và hỏi lại',96:'Một cuộc hội thoại dài',97:'Phỏng vấn nâng cao',98:'Role-play trong nhà máy',99:'Role-play đời sống',100:'Tổng ôn sau 100 ngày'
  };
  function wordsFromLesson(day,lang){return ((window.LESSONS||{})[lang]||{})[day]||[]}
  function pick(day,lang,n){const a=wordsFromLesson(day,lang);return a.slice(0,n).map(x=>x.text)}
  function makeEn(day){const s=MORE_SCENES[day]||SCENES[day]?.[0]||'Giao tiếp hằng ngày';const p=pick(day,'en',4), prev=pick(Math.max(1,day-1),'en',2);return [
    {who:'A',text:p[0]||`Let's talk about ${s}.`},{who:'B',text:p[1]||'Sure, no problem.'},{who:'A',text:p[2]||'Can you explain the details?'},{who:'B',text:p[3]||'I will check it and get back to you.'},{who:'A',text:prev[0]||'Let me confirm the information first.'},{who:'B',text:prev[1]||'Thank you for your support.'},{who:'A',text:'Okay. What do you suggest?'},{who:'B',text:'Let us check it together.'}
  ]}
  function makeZh(day){const s=MORE_SCENES[day]||SCENES[day]?.[1]||'日常沟通';const p=pick(day,'zh',4), prev=pick(Math.max(1,day-1),'zh',2);return [
    {who:'A',text:p[0]||`我们来谈谈${s}。`},{who:'B',text:p[1]||'当然，没问题。'},{who:'A',text:p[2]||'你可以解释一下细节吗？'},{who:'B',text:p[3]||'我检查以后再回复你。'},{who:'A',text:prev[0]||'让我先确认一下信息。'},{who:'B',text:prev[1]||'谢谢你的支持。'},{who:'A',text:'好的，我们一起检查一下。'},{who:'B',text:'好，没问题。'}
  ]}
  const d={};
  for(let day=1;day<=100;day++) d[day]={scene:MORE_SCENES[day]||SCENES[day]?.[0]||'Giao tiếp hằng ngày',en:makeEn(day),zh:makeZh(day)};
  window.DIALOGUES=d;
  window.speakSentence=function(text,lang){ if(!('speechSynthesis' in window)){alert('Trình duyệt này không hỗ trợ phát từng câu.');return;} window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang=lang==='zh'?'zh-CN':'en-US'; u.rate=(window.APP_STATE&&window.APP_STATE.speed)||1; window.speechSynthesis.speak(u); };
  window.speakDialogue=function(day,lang){if(!('speechSynthesis' in window)){alert('Trình duyệt này không hỗ trợ phát hội thoại.');return;} window.speechSynthesis.cancel(); const arr=DIALOGUES[day]?.[lang]||[]; let i=0; const next=()=>{if(i>=arr.length)return;const u=new SpeechSynthesisUtterance(arr[i++].text);u.lang=lang==='zh'?'zh-CN':'en-US';u.rate=(window.APP_STATE&&window.APP_STATE.speed)||1;u.onend=next;window.speechSynthesis.speak(u)};next();};
})();
