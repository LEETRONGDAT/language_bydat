/* Daily review dialogues: a different mini-scene for every day, recycling earlier lessons. */
(function(){
const SCENES=[
 ['Gặp đồng nghiệp mới ở đầu ca','A new colleague arrives before the shift starts.','At the production line','đầu ca'],
 ['Hỏi sếp về kế hoạch hôm nay','An engineer asks a supervisor about today’s plan.','In the office','trước khi vào việc'],
 ['Chuẩn bị cho cuộc họp','Two colleagues prepare a meeting and confirm the time.','In a meeting room','trước cuộc họp'],
 ['Một ngày bận rộn ở nhà máy','A technician needs help while the line is running.','On the SMT line','trong giờ sản xuất'],
 ['Mua vật tư cần thiết','A worker checks a price and asks for the right size.','At a supplier counter','khi mua vật tư'],
 ['Ăn trưa cùng đồng nghiệp','Two colleagues talk casually during lunch.','At a restaurant','giờ nghỉ trưa'],
 ['Đón khách ở cổng công ty','An engineer meets a visitor and gives directions.','At the company entrance','khi đón khách'],
 ['Nhận phòng khi đi công tác','A traveler checks into a hotel after arriving.','At a hotel','sau chuyến đi'],
 ['Cuộc gọi gấp','A colleague calls during another meeting.','On the phone','giữa giờ làm'],
 ['Hẹn gặp để trao đổi công việc','Two colleagues arrange a time to discuss a task.','In the office','cuối ngày'],
 ['Giới thiệu vai trò công việc','A newcomer explains his role to a teammate.','At the factory','ngày đầu làm việc'],
 ['Xin thông tin từ đồng nghiệp','An engineer needs a missing piece of information.','At a workstation','khi kiểm tra tài liệu'],
 ['Cuộc họp bắt đầu muộn','The meeting time changes unexpectedly.','In a meeting room','ngay trước cuộc họp'],
 ['Kế hoạch sản xuất thay đổi','Production priorities change during the morning.','At the planning board','giữa buổi sáng'],
 ['Báo cáo tiến độ','A supervisor asks for a progress update.','In the office','cuối ca'],
 ['Kiểm tra máy SMT','A machine needs a quick check before production.','Beside the SMT machine','trước khi chạy line'],
 ['Thiếu linh kiện trên line','The line stops because a component is missing.','On the SMT line','giữa ca'],
 ['Feeder gặp vấn đề','An engineer checks a feeder and asks for support.','At the mounter','khi máy báo lỗi'],
 ['Kiểm tra stencil','The team finds a printing issue and checks the stencil.','At the printer','sau khi phát hiện lỗi in'],
 ['Nạp lại chương trình máy','A new model requires a program check.','In the programming area','khi đổi model'],
 ['Kiểm tra reflow','Two engineers discuss the reflow profile.','Beside the reflow oven','trước khi chạy hàng'],
 ['AOI phát hiện lỗi','An AOI result shows an abnormal defect.','At the inspection station','sau kiểm tra AOI'],
 ['Một defect cần xác nhận','Two engineers discuss a repeated defect.','At the quality desk','khi lỗi lặp lại'],
 ['Troubleshooting nhanh','The machine stops and the team starts troubleshooting.','On the production line','khi máy dừng'],
 ['Đổi model gấp','PMC asks for a quick model change.','At the line','trước ca tiếp theo'],
 ['Changeover bị chậm','The changeover takes longer than expected.','On the SMT line','sau đổi model'],
 ['UPH thấp hơn mục tiêu','The team checks why output is below target.','At the production board','giữa ca'],
 ['Uptime giảm','A supervisor asks about a lower uptime result.','In the office','cuối ngày'],
 ['Mất máy giữa ca','A machine stops unexpectedly.','On the line','giữa sản xuất'],
 ['Lên lịch bảo trì','The engineer and technician arrange maintenance.','Maintenance area','cuối ca'],
 ['Nhắc về an toàn','A senior worker reminds a colleague about safety.','On the factory floor','trước khi làm việc'],
 ['Một vấn đề chất lượng','A customer-quality issue needs immediate attention.','Quality room','khi nhận cảnh báo'],
 ['Tìm root cause','The team asks questions to find the real cause.','At the problem board','sau khi lỗi xảy ra'],
 ['Phân tích 5 Why','Two engineers walk through a 5 Why discussion.','In a meeting room','trong cuộc họp cải tiến'],
 ['Đề xuất cải tiến','An engineer proposes a small improvement.','At the line','sau khi quan sát thao tác'],
 ['Kiểm tra jig','A shared jig needs confirmation before a model change.','At the jig cabinet','trước khi đổi model'],
 ['Kiểm tra ERP/MBOM','An engineer compares ERP data with the MBOM.','At a computer','trước khi chuẩn bị vật liệu'],
 ['Kiểm tra Gerber và Centroid','Two engineers confirm PCB data before programming.','At the engineering desk','trước tạo chương trình'],
 ['Tìm SOP phù hợp','A new engineer asks where to find the SOP.','In the engineering office','khi được giao việc'],
 ['Đào tạo kỹ sư mới','A senior engineer trains a newcomer.','At the SMT line','trong buổi đào tạo'],
 ['Bàn giao ca','Two workers hand over an unfinished issue.','At shift change','cuối ca'],
 ['Viết email công việc','A worker checks an email before sending it.','At the office desk','cuối buổi'],
 ['Hỏi nhà cung cấp','An engineer asks a supplier about a material.','On a phone call','khi cần báo giá'],
 ['Xác nhận mua hàng','Purchasing confirms quantity and delivery.','Purchasing office','sau khi nhận báo giá'],
 ['Kiểm tra vật liệu','Incoming material needs to be checked.','Receiving area','khi hàng tới'],
 ['Thiếu vật liệu','The line cannot continue because a part is missing.','Warehouse and line','giữa ca'],
 ['PMC thay đổi lịch','PMC changes the production schedule.','Planning office','đầu ngày'],
 ['Yêu cầu thay đổi','An engineer asks for a change to the current plan.','At the planning desk','sau khi phát hiện vấn đề'],
 ['Khách hàng hỏi tiến độ','A customer asks for an update.','Video call','giữa tuần'],
 ['Deadline đến gần','A deadline is approaching and the team reviews actions.','Engineering office','cuối ngày'],
 ['Hai người bất đồng','Two colleagues disagree about the next step.','At the problem board','trong lúc xử lý lỗi'],
 ['Nhờ đồng nghiệp hỗ trợ','An engineer needs another person’s support.','On the line','khi công việc quá tải'],
 ['Xin xác nhận lần cuối','Two colleagues double-check important information.','Before release','trước khi gửi'],
 ['Giải thích nguyên nhân','A supervisor asks why the problem happened.','In a meeting','sau sự cố'],
 ['Chọn giải pháp','The team compares two possible solutions.','At the problem board','trong lúc cải tiến'],
 ['Theo dõi action','An engineer follows up an open action.','At the office','sáng hôm sau'],
 ['Báo cáo tuần','A weekly review summarizes production issues.','Weekly meeting','cuối tuần'],
 ['Báo cáo tháng','A monthly meeting reviews results and plans.','Monthly meeting','đầu tháng'],
 ['Thuyết trình kết quả','An engineer presents an improvement result.','Meeting room','trong buổi báo cáo'],
 ['Phỏng vấn xin việc','A candidate explains his experience.','Interview room','buổi phỏng vấn'],
 ['Trao đổi kỹ thuật','Two engineers discuss a technical option.','Engineering office','trong lúc thiết kế quy trình'],
 ['Mô tả quy trình','A trainer asks a newcomer to explain a process.','At the line','trong buổi đào tạo'],
 ['Mô tả thiết bị','An engineer explains what a machine does.','Beside the machine','khi có khách tham quan'],
 ['Trao đổi về chất lượng','Quality asks engineering about a defect trend.','Quality office','sau khi xem dữ liệu'],
 ['Trao đổi năng suất','The team discusses output and target.','Production board','giữa ca'],
 ['Trao đổi chi phí','Two coworkers compare the cost of two choices.','Purchasing office','trước khi đặt hàng'],
 ['Trao đổi thời gian','The team estimates how long a task will take.','At the line','khi lập kế hoạch'],
 ['Trao đổi rủi ro','An engineer warns about a possible risk.','Meeting room','trước khi chạy model mới'],
 ['Xác định ưu tiên','The team decides what to do first.','Planning board','đầu ca'],
 ['Đặt mục tiêu','A supervisor and engineer agree on a target.','Office','đầu tuần'],
 ['Chuẩn bị đi công tác','A worker checks the plan before traveling.','At home','tối trước chuyến đi'],
 ['Ở sân bay','A traveler asks about the gate and time.','Airport','trước giờ lên máy bay'],
 ['Đi taxi','A traveler tells the driver where to go.','In a taxi','sau khi hạ cánh'],
 ['Ăn tối khi công tác','A traveler orders food with a local colleague.','Restaurant','buổi tối'],
 ['Nhận phòng công tác','A traveler checks the room and breakfast time.','Hotel','sau khi đến nơi'],
 ['Mua hàng online','A buyer checks price and delivery information.','At home','buổi tối'],
 ['Giao dịch ngân hàng','A customer asks about a payment.','At a bank','trong giờ hành chính'],
 ['Xác nhận địa chỉ giao hàng','A buyer checks the delivery address.','On the phone','trước khi giao hàng'],
 ['Gặp người mới','Two professionals meet for the first time.','At an event','lúc bắt đầu'],
 ['Small talk','Two colleagues talk casually before work.','Coffee area','trước giờ làm'],
 ['Làm quen đồng nghiệp mới','A new colleague introduces himself.','Office','ngày đầu tiên'],
 ['Nói chuyện với sếp','An engineer updates the manager.','Manager’s office','đầu buổi'],
 ['Nói chuyện với khách','An engineer welcomes a customer.','Meeting room','khi khách tới'],
 ['Một cuộc điện thoại công việc','A colleague calls with an urgent question.','At the desk','giữa buổi'],
 ['Video meeting','Two teams join an online meeting.','Conference room','buổi sáng'],
 ['Trình bày vấn đề','An engineer explains an issue step by step.','Meeting room','sau khi thu thập dữ liệu'],
 ['Theo dõi deadline','A manager checks progress before the deadline.','Office','cuối ngày'],
 ['Đề nghị thay đổi','An engineer politely asks to change a plan.','Planning office','sau khi kiểm tra thực tế'],
 ['Xử lý lỗi','A team reacts to an unexpected error.','Production line','ngay sau khi lỗi xảy ra'],
 ['Xin lỗi và giải thích','A worker apologizes for a delay and explains it.','Office','sau khi có chậm trễ'],
 ['Xác nhận lại','Two people repeat important information.','Phone call','trước khi kết thúc'],
 ['Đưa ra ý kiến','An engineer gives an opinion on two options.','Meeting room','trong thảo luận'],
 ['Đồng ý và phản đối','Two colleagues respectfully disagree.','At the planning board','trong cuộc họp'],
 ['Nói tự nhiên','Two friends speak in a relaxed way.','Coffee shop','cuối tuần'],
 ['Không nghe rõ','One person asks the other to repeat.','Phone call','khi tín hiệu yếu'],
 ['Hội thoại dài','Two colleagues solve a small problem from start to finish.','Factory office','trong một ca làm việc'],
 ['Phỏng vấn nâng cao','A candidate discusses a difficult work case.','Interview room','buổi phỏng vấn'],
 ['Role-play trong nhà máy','Two engineers handle a real production issue.','SMT line','giữa ca'],
 ['Role-play đời sống','Two friends plan a weekend together.','At a café','chiều thứ sáu'],
 ['Tổng ôn 100 ngày','Two colleagues review what they can now say naturally.','After work','cuối ngày']
];
const roles=[['A','Đạt'],['B','Minh']];
function prior(lang,day,offset){for(let d=Math.max(1,day-offset);d<day;d--){const arr=(LESSONS[lang]||{})[d];if(arr&&arr.length)return arr;}return null}
function pickCurrent(lang,day,i){const a=(LESSONS[lang]||{})[day]||[];return a[i%a.length]||null}
function pickOld(lang,day,i){const a=prior(lang,day,1+i%Math.max(1,Math.min(day-1,5)));return a?a[i%a.length]:pickCurrent(lang,day,i)}
function makeEn(day){const scene=SCENES[day-1]||SCENES[0], topic=scene[1];const c=i=>pickCurrent('en',day,i),o=i=>pickOld('en',day,i);const base=[c(0),o(0),c(1),o(1),c(2),o(2),c(3),c(4)].filter(Boolean);const lines=[
 {speaker:'A',text:base[0]?.text||`Let's talk about ${topic}.`,vi:base[0]?.vi||`Chúng ta hãy nói về ${topic}.`},
 {speaker:'B',text:`${base[1]?.text||'What do you suggest?'}`,vi:base[1]?.vi||'Bạn đề xuất gì?'},
 {speaker:'A',text:base[2]?.text||'I need to understand this clearly.',vi:base[2]?.vi||'Tôi cần hiểu rõ việc này.'},
 {speaker:'B',text:base[3]?.text||'Can you explain the details?',vi:base[3]?.vi||'Bạn có thể giải thích chi tiết không?'},
 {speaker:'A',text:base[4]?.text||'Please show me how it works.',vi:base[4]?.vi||'Vui lòng chỉ cho tôi cách nó hoạt động.'},
 {speaker:'B',text:base[5]?.text||'I will check it and get back to you.',vi:base[5]?.vi||'Tôi sẽ kiểm tra và phản hồi lại bạn.'},
 {speaker:'A',text:base[6]?.text||'Let me confirm the information first.',vi:base[6]?.vi||'Để tôi xác nhận thông tin trước.'},
 {speaker:'B',text:base[7]?.text||'Thank you for your support.',vi:base[7]?.vi||'Cảm ơn bạn đã hỗ trợ.'}
];
lines[0].text=lines[0].text.replace(/^Let's talk about .*\.$/i,`Let's talk about ${topic}.`);
return {title:scene[0],setting:scene[2],time:scene[3],language:'English',summary:`A short scene to practice ${topic}, while recycling expressions from earlier days.`,lines,review:[...(day>1?[o(0)?.text,o(1)?.text]:[]),c(0)?.text].filter(Boolean)};}
function makeZh(day){const scene=SCENES[day-1]||SCENES[0],topic=scene[0];const c=i=>pickCurrent('zh',day,i),o=i=>pickOld('zh',day,1+i%Math.max(1,Math.min(day-1,5)));const base=[c(0),o(0),c(1),o(1),c(2),o(2),c(3),c(4)].filter(Boolean);const lines=base.map((x,i)=>({speaker:i%2?'B':'A',text:x?.text||'',pinyin:x?.pinyin||'',vi:x?.vi||''}));while(lines.length<8)lines.push({speaker:lines.length%2?'B':'A',text:'谢谢你的支持。',pinyin:'Xièxie nǐ de zhīchí.',vi:'Cảm ơn sự hỗ trợ của bạn.'});
return {title:scene[0],setting:scene[2],time:scene[3],language:'中文',summary:`通过一个新的日常场景复习第${day}天和以前学过的表达。`,lines,review:[...(day>1?[o(0)?.text,o(1)?.text]:[]),c(0)?.text].filter(Boolean)};}
function dialogueFor(lang,day){return lang==='zh'?makeZh(day):makeEn(day)}
window.reviewDialogueFor=dialogueFor;
function speakText(text,lang){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang==='zh'?'zh-CN':'en-US';u.rate=1;window.speechSynthesis.speak(u)}
function addStudyButtons(){const cards=document.querySelectorAll('#sentences .sentence');if(!cards.length)return;cards.forEach((card,i)=>{if(card.querySelector('.lineSpeak'))return;const b=document.createElement('button');b.className='btn small lineSpeak';b.type='button';b.textContent='🔊 Nghe câu';b.style.marginTop='10px';b.onclick=()=>{const x=(LESSONS[state.lang]||{})[state.day]?.[i];if(x)speakText(x.text,state.lang);};card.appendChild(b);});}
function renderDialogue(){let box=document.getElementById('dailyDialogue');if(!box){box=document.createElement('div');box.id='dailyDialogue';box.className='card';const s=document.getElementById('sentences');if(s&&s.parentNode)s.parentNode.insertBefore(box,s.nextSibling);else document.getElementById('app')?.appendChild(box);}
const d=dialogueFor(state.lang,state.day);box.innerHTML=`<div class="h1" style="font-size:24px">🎬 Hội thoại ôn tập · ${d.title}</div><div class="notice" style="margin-top:6px"><b>Bối cảnh:</b> ${d.setting} · ${d.time}<br>${d.summary}</div><div class="row" style="margin-top:12px"><button id="dialoguePlay" class="btn primary">▶ Nghe cả đoạn</button><button id="dialogueStop" class="btn small">⏹ Dừng</button></div><div id="dialogueLines" style="margin-top:12px">${d.lines.map((l,i)=>`<div class="sentence" style="margin-top:9px"><div><b>${l.speaker==='A'?'A — Đạt':'B — Minh'}</b></div><div class="line1" style="margin-top:5px">${esc(l.text)}</div>${l.pinyin?`<div class="pinyin">${esc(l.pinyin)}</div>`:''}<div class="vi">${esc(l.vi)}</div><button class="btn small dialogueSpeak" data-i="${i}" style="margin-top:9px">🔊 Nghe lượt này</button></div>`).join('')}</div><div class="studyBlock" style="margin-top:12px"><b>🔁 Câu được ôn lại:</b><br>${d.review.length?d.review.map((x,i)=>`${i+1}. ${esc(x)}`).join('<br>'):'Các câu của ngày hiện tại.'}</div>`;
box.querySelector('#dialoguePlay').onclick=()=>{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();d.lines.forEach((l,i)=>{const u=new SpeechSynthesisUtterance(l.text);u.lang=state.lang==='zh'?'zh-CN':'en-US';u.rate=0.95;u.pitch=l.speaker==='A'?1.02:0.9;window.speechSynthesis.speak(u);});};box.querySelector('#dialogueStop').onclick=()=>window.speechSynthesis?.cancel();box.querySelectorAll('.dialogueSpeak').forEach(b=>b.onclick=()=>{const l=d.lines[+b.dataset.i];if(l)speakText(l.text,state.lang)});
}
function esc(s){return String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[m]))}
function refresh(){setTimeout(()=>{addStudyButtons();renderDialogue();},0)}
const observer=new MutationObserver(refresh);document.addEventListener('DOMContentLoaded',()=>{const target=document.getElementById('sentences');if(target)observer.observe(target,{childList:true,subtree:true});setTimeout(refresh,250);});
setTimeout(()=>{const target=document.getElementById('sentences');if(target&&!target.dataset.dialogueObserved){target.dataset.dialogueObserved='1';observer.observe(target,{childList:true,subtree:true});refresh();}},500);
})();
