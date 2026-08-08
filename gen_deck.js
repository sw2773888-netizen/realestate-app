const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
p.author = "Lop Cong Dong";
p.title = "Bac Thay Content";

// ---- Palette ----
const NAVY   = "141A2E";
const NAVY2  = "0E1322";
const CORAL  = "FF5A5F";
const GOLD   = "FFC93C";
const LIGHT  = "F7F8FC";
const WHITE  = "FFFFFF";
const INK    = "1E2233";
const MUTED  = "6C7280";
const CARD   = "FFFFFF";
const TINT   = "EEF1F8";
const NAVYCARD = "1E2742";

const HFONT = "Cambria";
const BFONT = "Calibri";

const W = 13.333, H = 7.5;

function bg(slide, color){ slide.background = { color }; }

// decorative dot cluster
function dots(slide, x, y, color, n, gap){
  for(let i=0;i<n;i++){
    slide.addShape(p.ShapeType.ellipse,{x:x+i*gap, y, w:0.12, h:0.12, fill:{color}, line:{type:"none"}});
  }
}

function kicker(slide, text, x, y, color){
  slide.addText(text.toUpperCase(), {x, y, w:6, h:0.35, fontFace:BFONT, fontSize:13, bold:true, color, charSpacing:3, align:"left"});
}

// ============ SLIDE 1 : TITLE ============
let s = p.addSlide(); bg(s, NAVY);
// big soft circle motif
s.addShape(p.ShapeType.ellipse,{x:9.4,y:-2.2,w:6.6,h:6.6,fill:{color:CORAL,transparency:82},line:{type:"none"}});
s.addShape(p.ShapeType.ellipse,{x:10.9,y:3.4,w:4.6,h:4.6,fill:{color:GOLD,transparency:88},line:{type:"none"}});
// ---- portrait on the right (gold-framed) ----
const IMG = "portrait.jpg";
const imgX=9.30, imgY=0.62, imgW=3.44, imgH=6.02; // aspect 768x1344 -> w/h 0.5714
s.addShape(p.ShapeType.roundRect,{x:imgX-0.30,y:imgY-0.30,w:imgW+0.60,h:imgH+0.60,rectRadius:0.10,fill:{color:"0E1322"},line:{color:GOLD,width:1.25},shadow:{type:"outer",color:"05070C",opacity:0.55,blur:14,offset:5,angle:90}});
s.addImage({path:IMG,x:imgX,y:imgY,w:imgW,h:imgH});
s.addShape(p.ShapeType.roundRect,{x:imgX,y:imgY,w:imgW,h:imgH,rectRadius:0.04,fill:{type:"none"},line:{color:GOLD,width:0.75}});
s.addShape(p.ShapeType.ellipse,{x:0.85,y:1.15,w:0.9,h:0.9,fill:{color:CORAL},line:{type:"none"}});
s.addText("10+5", {x:0.72,y:1.2,w:1.15,h:0.8,align:"center",valign:"middle",fontFace:HFONT,fontSize:15,bold:true,color:WHITE});
kicker(s, "Lớp cộng đồng  •  Buổi học tối nay", 1.95, 1.35, GOLD);
s.addText("BẬC THẦY\nCONTENT", {x:0.8,y:2.15,w:8.2,h:2.6,fontFace:HFONT,fontSize:74,bold:true,color:WHITE,lineSpacing:70});
s.addText("Content Viral & Nghệ thuật bán hàng đỉnh cao", {x:0.85,y:4.95,w:8.1,h:0.6,fontFace:BFONT,fontSize:22,color:"CBD3E6",italic:true});
dots(s, 0.9, 6.05, CORAL, 5, 0.28);
s.addText("10 Nguyên tắc content viral   ·   Tư duy sát thủ bán hàng   ·   5 công thức HOOK", {x:0.85,y:6.35,w:8.2,h:0.9,fontFace:BFONT,fontSize:14,color:"9AA4BF"});

// ============ SLIDE 2 : PAIN POINTS ============
s = p.addSlide(); bg(s, LIGHT);
kicker(s, "Mở đầu", 0.7, 0.55, CORAL);
s.addText("Bạn có đang gặp những điều này?", {x:0.7,y:0.9,w:12,h:0.8,fontFace:HFONT,fontSize:36,bold:true,color:INK});
const pains = [
  ["📉","Đăng bài mỗi ngày","...mà vẫn không có khách hàng nào ghé đến?"],
  ["🕸️","Cả tháng chỉ 1 đơn","...thậm chí có tháng không nổi một đơn nào?"],
  ["✍️","Viết content lộn xộn","...không biết bắt đầu từ đâu, viết xong lại bỏ?"],
];
let px=0.7;
pains.forEach((c,i)=>{
  const x=0.7+i*4.07;
  s.addShape(p.ShapeType.roundRect,{x,y:2.05,w:3.75,h:2.75,rectRadius:0.12,fill:{color:CARD},line:{type:"none"},shadow:{type:"outer",color:"9AA4BF",opacity:0.35,blur:10,offset:3,angle:90}});
  s.addShape(p.ShapeType.ellipse,{x:x+0.3,y:2.4,w:0.95,h:0.95,fill:{color:TINT},line:{type:"none"}});
  s.addText(c[0],{x:x+0.3,y:2.4,w:0.95,h:0.95,align:"center",valign:"middle",fontSize:30});
  s.addText(c[1],{x:x+0.3,y:3.5,w:3.15,h:0.55,fontFace:HFONT,fontSize:19,bold:true,color:CORAL});
  s.addText(c[2],{x:x+0.3,y:4.02,w:3.2,h:0.75,fontFace:BFONT,fontSize:14,color:MUTED});
});
s.addShape(p.ShapeType.roundRect,{x:0.7,y:5.35,w:11.93,h:1.35,rectRadius:0.1,fill:{color:NAVY},line:{type:"none"}});
s.addText([
  {text:"Bạn cần MỘT CÔNG THỨC ",options:{bold:true,color:WHITE}},
  {text:"để viết content ra khách — ra doanh thu — ra tiền.",options:{color:"CBD3E6"}}
],{x:1.1,y:5.35,w:11.1,h:1.35,valign:"middle",fontFace:BFONT,fontSize:20});

// ============ SLIDE 3 : CONTENT LA GI ============
s = p.addSlide(); bg(s, LIGHT);
kicker(s, "Nền tảng", 0.7, 0.55, CORAL);
s.addText("Content là gì?", {x:0.7,y:0.9,w:8,h:0.8,fontFace:HFONT,fontSize:36,bold:true,color:INK});
s.addText("Content là mọi cách bạn KẾT NỐI với khách hàng:", {x:0.7,y:1.95,w:6.7,h:0.5,fontFace:BFONT,fontSize:17,color:INK,bold:true});
const forms=["Kể chuyện, tâm sự","Chat & ứng xử","Đăng bài","Video","Livestream","Blog"];
forms.forEach((f,i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=0.7+col*3.35, y=2.55+row*0.92;
  s.addShape(p.ShapeType.roundRect,{x,y,w:3.15,h:0.72,rectRadius:0.1,fill:{color:CARD},line:{type:"none"},shadow:{type:"outer",color:"B8C0D6",opacity:0.4,blur:6,offset:2,angle:90}});
  s.addShape(p.ShapeType.ellipse,{x:x+0.2,y:y+0.22,w:0.28,h:0.28,fill:{color:CORAL},line:{type:"none"}});
  s.addText(f,{x:x+0.62,y,w:2.45,h:0.72,valign:"middle",fontFace:BFONT,fontSize:15,bold:true,color:INK});
});
s.addText([
  {text:"→ Content là thứ ",options:{color:INK}},
  {text:"GIỮ CHÂN khách hàng",options:{color:CORAL,bold:true}},
  {text:" — năng lực số 1 trong bán hàng.",options:{color:INK}}
],{x:0.7,y:5.5,w:6.7,h:0.9,fontFace:BFONT,fontSize:17});
// Right callout
s.addShape(p.ShapeType.roundRect,{x:7.95,y:1.95,w:4.68,h:4.45,rectRadius:0.14,fill:{color:NAVY},line:{type:"none"}});
s.addShape(p.ShapeType.ellipse,{x:8.35,y:2.35,w:0.95,h:0.95,fill:{color:GOLD},line:{type:"none"}});
s.addText("🤖",{x:8.35,y:2.35,w:0.95,h:0.95,align:"center",valign:"middle",fontSize:30});
s.addText("ChatGPT chỉ là CÔNG CỤ",{x:8.35,y:3.5,w:3.9,h:0.6,fontFace:HFONT,fontSize:22,bold:true,color:WHITE});
s.addText([
  {text:"TƯ DUY mới là gốc rễ.\n",options:{color:GOLD,bold:true}},
  {text:"Có tư duy tốt thì mới dùng công cụ giỏi. Đừng để công cụ dẫn dắt bạn.",options:{color:"CBD3E6"}}
],{x:8.35,y:4.15,w:3.9,h:2,fontFace:BFONT,fontSize:16,lineSpacing:24});

// ============ SECTION DIVIDER helper ============
function divider(num, big, sub){
  const d = p.addSlide(); bg(d, NAVY);
  d.addShape(p.ShapeType.ellipse,{x:-1.6,y:3.6,w:6,h:6,fill:{color:CORAL,transparency:85},line:{type:"none"}});
  d.addShape(p.ShapeType.ellipse,{x:10.2,y:-2,w:5.2,h:5.2,fill:{color:GOLD,transparency:88},line:{type:"none"}});
  d.addText(num,{x:0.9,y:1.5,w:4,h:2,fontFace:HFONT,fontSize:120,bold:true,color:CORAL});
  d.addText(big,{x:0.95,y:3.55,w:11.2,h:1.7,fontFace:HFONT,fontSize:52,bold:true,color:WHITE,lineSpacing:52});
  d.addText(sub,{x:1,y:5.35,w:11,h:0.6,fontFace:BFONT,fontSize:20,color:"9AA4BF",italic:true});
  dots(d,1,6.2,GOLD,5,0.28);
  return d;
}

// ============ SLIDE 4 : DIVIDER 10 nguyen tac ============
divider("10", "NGUYÊN TẮC VÀNG", "Bí quyết để mỗi content của bạn trở nên VIRAL");

// ---- principle card helper (light content slides) ----
function princSlide(title, items){
  const sl = p.addSlide(); bg(sl, LIGHT);
  kicker(sl, "10 Nguyên tắc content viral", 0.7, 0.5, CORAL);
  sl.addText(title, {x:0.7,y:0.85,w:12,h:0.75,fontFace:HFONT,fontSize:32,bold:true,color:INK});
  const n=items.length;
  const cardH = n===2 ? 2.55 : 1.62;
  const gap = 0.28;
  let y=1.9;
  items.forEach(it=>{
    sl.addShape(p.ShapeType.roundRect,{x:0.7,y,w:11.93,h:cardH,rectRadius:0.1,fill:{color:CARD},line:{type:"none"},shadow:{type:"outer",color:"B8C0D6",opacity:0.45,blur:8,offset:2,angle:90}});
    sl.addShape(p.ShapeType.ellipse,{x:1.0,y:y+cardH/2-0.55,w:1.1,h:1.1,fill:{color:CORAL},line:{type:"none"}});
    sl.addText(it.n,{x:1.0,y:y+cardH/2-0.55,w:1.1,h:1.1,align:"center",valign:"middle",fontFace:HFONT,fontSize:34,bold:true,color:WHITE});
    sl.addText(it.h,{x:2.4,y:y+0.22,w:10,h:0.55,fontFace:HFONT,fontSize:21,bold:true,color:INK});
    const body=[{text:it.b,options:{color:MUTED}}];
    if(it.vd) body.push({text:"\n💡 VD: "+it.vd,options:{color:CORAL,italic:true,bold:false}});
    sl.addText(body,{x:2.4,y:y+0.78,w:10.1,h:cardH-0.95,fontFace:BFONT,fontSize:15,lineSpacing:20,valign:"top"});
    y+=cardH+gap;
  });
  return sl;
}

// SLIDE 5 : NT 1-2
princSlide("Bắt đầu — Chặn đứng người xem", [
  {n:"1",h:"Đúng nỗi đau — gọi thẳng tên vấn đề",b:"Nhắm đúng MỘT đối tượng, không làm màu, không tham lam ôm hết. Nói trúng điều họ đang trăn trở.",vd:"“Đăng 10 bài/ngày mà vẫn không ra đơn?”"},
  {n:"2",h:"Bùng nổ trong 3 giây đầu tiên",b:"3 giây đầu không phải là VÀNG — mà là KIM CƯƠNG. Đầu xuôi thì đuôi mới lọt. Ấn tượng đầu tiên quyết định người xem dừng lại hay lướt.",vd:"“Bạn tôi từng vỡ nợ — và đây là cách anh ấy trả hết 25 tỷ...”"},
]);

// SLIDE 6 : NT 3-4
princSlide("Giá trị & Cảm xúc", [
  {n:"3",h:"Giá trị thật — xem xong khách nhận được gì?",b:"Đừng làm nội dung vô thưởng vô phạt. Content phải mang giá trị hoặc truyền cảm hứng cho người xem — chứ không chỉ để câu view.",vd:""},
  {n:"4",h:"Chạm cảm xúc trước khi dạy kiến thức",b:"Xem xong phải thấy thương, nghẹn ngào, tâm đắc, đáng yêu... Cảm xúc dẫn dắt trước, kiến thức theo sau.",vd:"Xem video “Tam Hoa Sen” — cảm xúc kéo người xem ở lại đến cuối."},
]);

// SLIDE 7 : NT 5-6-7
princSlide("Đơn giản & Nhất quán", [
  {n:"5",h:"Dễ hiểu — Dễ nhớ — Dễ làm theo",b:"Nói sao cho người nghe hiểu ngay, nhớ được và bắt tay làm được.",vd:""},
  {n:"6",h:"1 Content = 1 Thông điệp",b:"Đừng lan man. Ví dụ làm vlog: mỗi video chỉ tập trung truyền tải MỘT thông điệp duy nhất.",vd:""},
  {n:"7",h:"Có dấu ấn cá nhân",b:"Kể chuyện đời thật của chính bạn — càng chi tiết càng thật, càng thật càng có sức thuyết phục.",vd:""},
]);

// SLIDE 8 : NT 8-9-10
princSlide("Thuyết phục & Kêu gọi", [
  {n:"8",h:"Nhiều “điểm gãi đúng chỗ”",b:"Chèn nhiều chi tiết khiến người xem gật gù “đúng rồi, đúng ý mình”.",vd:""},
  {n:"9",h:"Có bằng chứng thật",b:"Khách chỉ xem mà không thấy bằng chứng thì không bao giờ xuống tiền. Hãy đưa kết quả, hình ảnh, con số thật.",vd:""},
  {n:"10",h:"Luôn có kêu gọi hành động (CTA)",b:"Kết thúc bằng lời kêu gọi rõ ràng: dẫn vào link, nhắn tin, để lại thông tin.",vd:""},
]);

// ============ SLIDE 9 : DIVIDER Sat thu ban hang ============
divider("9", "SÁT THỦ BÁN HÀNG", "Tư duy & kỹ năng để phục vụ mọi loại khách hàng");

// SLIDE 10 : Sales mindset (icon rows)
s = p.addSlide(); bg(s, LIGHT);
kicker(s, "Tư duy bán hàng", 0.7, 0.5, CORAL);
s.addText("Kỹ năng của một “sát thủ bán hàng”", {x:0.7,y:0.85,w:12,h:0.75,fontFace:HFONT,fontSize:32,bold:true,color:INK});
const skills=[
  ["🎯","Tư vấn bằng sự thấu hiểu","Đặt mình vào vị trí khách, hiểu điều họ thực sự cần trước khi bán."],
  ["🛡️","Sẵn tâm lý phục vụ MỌI loại khách","Chuẩn bị tinh thần xử lý vấn đề thay vì né tránh khách khó."],
  ["⚙️","Sản phẩm không bao giờ hoàn hảo","Không sản phẩm nào đáp ứng được hết — hãy chủ động chuẩn bị lời giải."],
  ["📋","Liệt kê sẵn 20 tình huống","Viết ra trước 20 tình huống có thể xảy ra với sản phẩm của bạn."],
  ["❓","Đặt câu hỏi để GIỮ khách","Hỏi không phải để bán ngay — mà để giữ khách ở lại lâu hơn."],
];
let sy=1.95;
skills.forEach((k,i)=>{
  const rowH=0.98;
  s.addShape(p.ShapeType.roundRect,{x:0.7,y:sy,w:11.93,h:0.86,rectRadius:0.1,fill:{color:CARD},line:{type:"none"},shadow:{type:"outer",color:"B8C0D6",opacity:0.4,blur:6,offset:2,angle:90}});
  s.addShape(p.ShapeType.ellipse,{x:0.95,y:sy+0.18,w:0.5,h:0.5,fill:{color:NAVY},line:{type:"none"}});
  s.addText(k[0],{x:0.95,y:sy+0.18,w:0.5,h:0.5,align:"center",valign:"middle",fontSize:18});
  s.addText([
    {text:k[1]+"   ",options:{bold:true,color:INK,fontSize:17}},
    {text:k[2],options:{color:MUTED,fontSize:14}},
  ],{x:1.65,y:sy,w:10.75,h:0.86,valign:"middle",fontFace:BFONT});
  sy+=rowH;
});

// ============ SLIDE 11 : DIVIDER 5 cong thuc hook ============
divider("5", "CÔNG THỨC HOOK", "Giữ chân khách hàng ngay từ câu nói đầu tiên");

// ---- hook slide helper ----
function hookSlide(num, name, emoji, formula, points, vd){
  const sl = p.addSlide(); bg(sl, LIGHT);
  // left panel dark
  sl.addShape(p.ShapeType.rect,{x:0,y:0,w:4.35,h:H,fill:{color:NAVY},line:{type:"none"}});
  sl.addShape(p.ShapeType.ellipse,{x:-1.3,y:5,w:4,h:4,fill:{color:CORAL,transparency:84},line:{type:"none"}});
  sl.addText("HOOK "+num,{x:0.55,y:0.7,w:3.5,h:0.4,fontFace:BFONT,fontSize:14,bold:true,color:GOLD,charSpacing:3});
  sl.addShape(p.ShapeType.ellipse,{x:0.55,y:1.35,w:1.4,h:1.4,fill:{color:CORAL},line:{type:"none"}});
  sl.addText(emoji,{x:0.55,y:1.35,w:1.4,h:1.4,align:"center",valign:"middle",fontSize:42});
  sl.addText(name,{x:0.5,y:3.0,w:3.55,h:2,fontFace:HFONT,fontSize:32,bold:true,color:WHITE,lineSpacing:34});
  // right content
  sl.addText("CÔNG THỨC",{x:4.85,y:0.75,w:8,h:0.35,fontFace:BFONT,fontSize:13,bold:true,color:CORAL,charSpacing:2});
  sl.addShape(p.ShapeType.roundRect,{x:4.85,y:1.15,w:7.9,h:1.15,rectRadius:0.1,fill:{color:TINT},line:{type:"none"}});
  sl.addText(formula,{x:5.15,y:1.15,w:7.3,h:1.15,valign:"middle",fontFace:HFONT,fontSize:20,bold:true,color:INK,italic:true});
  let yy=2.65;
  points.forEach(pt=>{
    sl.addShape(p.ShapeType.ellipse,{x:4.9,y:yy+0.12,w:0.2,h:0.2,fill:{color:CORAL},line:{type:"none"}});
    sl.addText(pt,{x:5.25,y:yy,w:7.5,h:0.9,fontFace:BFONT,fontSize:16,color:INK,lineSpacing:22,valign:"top"});
    yy+=0.92;
  });
  if(vd){
    sl.addShape(p.ShapeType.roundRect,{x:4.85,y:6.15,w:7.9,h:1.0,rectRadius:0.1,fill:{color:NAVY},line:{type:"none"}});
    sl.addText([
      {text:"VÍ DỤ   ",options:{bold:true,color:GOLD}},
      {text:vd,options:{color:WHITE,italic:true}}
    ],{x:5.15,y:6.15,w:7.35,h:1.0,valign:"middle",fontFace:BFONT,fontSize:15});
  }
  return sl;
}

// SLIDE 12 : Hook 1
hookSlide("1","TÔI TỪNG SAI","🔄",
  "Tôi từng + [sai lầm cụ thể] + cho đến khi...",
  ["Con người thích xem sự CHUYỂN ĐỔI: từ thất bại → thành công.",
   "Càng cụ thể (con số, thời gian, tình huống) càng thật.",
   "Càng thật thì càng giữ chân người xem đến cuối."],
  "“Tôi từng làm affiliate 6 tháng không ra 1 đơn, cho đến khi tôi phát hiện ra một thứ trong video...”");

// SLIDE 13 : Hook 2
hookSlide("2","ĐỪNG MUA NẾU...","🚫",
  "Đừng mua nếu... bạn không muốn [kết quả]",
  ["“Cấm nhẹ” một cách khéo léo → gây tò mò mạnh mẽ.",
   "Tâm lý con người: càng bị cấm cái gì, càng muốn cái đó.",
   "Người xem tự thuyết phục chính mình muốn tìm hiểu tiếp."],
  "“Đừng mua khoá học này nếu bạn không muốn bán được hàng.”");

// SLIDE 14 : Hook 3
hookSlide("3","SỰ THẬT ÍT AI NÓI","🤫",
  "Sự thật về... mà [người bán] không nói cho bạn biết",
  ["Người xem thích cảm giác được ở “phe nội bộ”.",
   "Họ muốn biết điều mà số đông không biết.",
   "Nhưng PHẢI là sự thật — nói dối là mất uy tín ngay từ đầu."],
  "“Sự thật về ngành này mà không một người bán hàng nào nói cho bạn biết.”");

// SLIDE 15 : Hook 4
hookSlide("4","SO SÁNH GÂY TÒ MÒ","⚖️",
  "[Giá thấp]... nhưng nhìn như [giá trị cao]",
  ["Não bộ bị hấp dẫn bởi sự CHÊNH LỆCH.",
   "Khoảng cách giữa giá & giá trị tạo cảm giác “hời”.",
   "Chênh lệch phải đủ lớn (3–5 lần) và chứng minh được ngay."],
  "“700k nhưng nhìn như 5 triệu.”");

// SLIDE 16 : Hook 5
hookSlide("5","CÁI TÔI CỦA KHÁCH","🪞",
  "Nếu bạn là [1 kiểu người]... → cái này dành cho bạn",
  ["Gọi đúng tên, đúng nỗi đau → khách thấy “video này dành riêng cho mình”.",
   "Lợi ích kép: giữ đúng khách mục tiêu + đuổi khéo khách không liên quan.",
   "→ Thuật toán hiểu và đề xuất đúng tệp khách hơn."],
  "“Nếu bạn làm affiliate mà chưa hiệu quả — video này dành cho bạn.”");

// ============ SLIDE 17 : CLOSING ============
s = p.addSlide(); bg(s, NAVY);
s.addShape(p.ShapeType.ellipse,{x:9.6,y:-2.4,w:6.6,h:6.6,fill:{color:GOLD,transparency:86},line:{type:"none"}});
s.addShape(p.ShapeType.ellipse,{x:-1.8,y:4.2,w:5.4,h:5.4,fill:{color:CORAL,transparency:84},line:{type:"none"}});
kicker(s,"Ghi nhớ & Hành động",0.8,0.75,GOLD);
s.addText("Content ra tiền = ?", {x:0.8,y:1.2,w:11,h:0.9,fontFace:HFONT,fontSize:40,bold:true,color:WHITE});
const recipe=["Đúng nỗi đau","Chạm cảm xúc","Bằng chứng thật","Kêu gọi hành động"];
recipe.forEach((r,i)=>{
  const x=0.8+i*3.02;
  s.addShape(p.ShapeType.roundRect,{x,y:2.35,w:2.75,h:1.15,rectRadius:0.1,fill:{color:NAVYCARD},line:{type:"none"}});
  s.addText(r,{x:x+0.15,y:2.35,w:2.45,h:1.15,align:"center",valign:"middle",fontFace:BFONT,fontSize:16,bold:true,color:WHITE});
  if(i<3) s.addText("+",{x:x+2.72,y:2.35,w:0.3,h:1.15,align:"center",valign:"middle",fontFace:HFONT,fontSize:24,bold:true,color:GOLD});
});
s.addText([
  {text:"Tư duy trước, công cụ sau.  ",options:{color:GOLD,bold:true}},
  {text:"ChatGPT là trợ thủ — bạn mới là người cầm lái.",options:{color:"CBD3E6"}}
],{x:0.8,y:3.95,w:11.5,h:0.6,fontFace:BFONT,fontSize:18});
s.addShape(p.ShapeType.roundRect,{x:0.8,y:4.95,w:11.73,h:1.65,rectRadius:0.12,fill:{color:CORAL},line:{type:"none"}});
s.addText("🎯  Bài tập tối nay",{x:1.15,y:5.15,w:11,h:0.5,fontFace:HFONT,fontSize:20,bold:true,color:WHITE});
s.addText("Viết ngay 1 content theo 1 trong 5 công thức HOOK — và đăng lên!",{x:1.15,y:5.7,w:11,h:0.7,fontFace:BFONT,fontSize:18,color:WHITE});

p.writeFile({ fileName: "BacThayContent.pptx" }).then(f=>console.log("WROTE", f));
