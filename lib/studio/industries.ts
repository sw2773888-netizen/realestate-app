import type { Industry, IndustryId, Tone, ToneId } from "./types";

export const INDUSTRIES: Record<IndustryId, Industry> = {
  affiliate: {
    id: "affiliate",
    name: "Affiliate / Tiếp thị liên kết",
    emoji: "🔗",
    tagline: "Review sản phẩm, gắn link kiếm hoa hồng",
    keywords: ["deal hời", "săn sale", "giỏ hàng", "link dưới video", "mã giảm giá", "flash sale"],
    painPoints: [
      "mua nhầm hàng kém chất lượng vì không biết chọn",
      "tốn tiền mà xài chẳng được bao lâu",
      "lướt cả buổi vẫn không biết nên mua món nào",
      "sợ mua online rồi thất vọng",
    ],
    benefits: [
      "mình đã xài thật và thấy đáng tiền",
      "chất lượng vượt xa cái giá của nó",
      "được nhiều người mua lại nhất tháng này",
      "vừa rẻ vừa bền, dùng cực đã tay",
    ],
    proofs: [
      "hơn 10.000 lượt mua và 4.9 sao",
      "chính mình quay video này bằng nó luôn nè",
      "shop uy tín, đổi trả trong 7 ngày",
      "riêng tháng này đã bán hết mấy đợt",
    ],
    ctas: [
      "Bấm vào giỏ hàng góc màn hình, chốt ngay khi còn mã giảm nha!",
      "Link ở dưới video, canh flash sale để được giá tốt nhất!",
      "Lướt xuống bấm vào link, dùng mã của mình để bớt thêm tiền nè!",
    ],
    hashtags: ["affiliate", "reviewsanpham", "sandeal", "muahangonline", "dealhoi", "tiktokshop", "shopee", "xuhuong"],
  },
  cosmetics: {
    id: "cosmetics",
    name: "Mỹ phẩm / Làm đẹp",
    emoji: "💄",
    tagline: "Skincare, makeup, chăm sóc da",
    keywords: ["làn da", "cấp ẩm", "thâm mụn", "lên tông", "bí kíp makeup", "da căng bóng"],
    painPoints: [
      "da xỉn màu, lỗ chân lông to khiến bạn mất tự tin",
      "thử cả tá sản phẩm mà da vẫn khô mụn",
      "trang điểm xong một lát là trôi hết lớp nền",
      "tốn cả đống tiền skincare mà da không cải thiện",
    ],
    benefits: [
      "da căng mọng, sáng khỏe chỉ sau vài tuần",
      "cấp ẩm sâu, lì mụn mà không hề bí da",
      "lên tông tự nhiên như da em bé",
      "thấm nhanh, không bết dính, hợp mọi loại da",
    ],
    proofs: [
      "bảng thành phần lành tính, có kiểm định rõ ràng",
      "hàng nghìn nàng review da đẹp lên trông thấy",
      "chính da mình đây, không hề dùng app làm mịn",
      "đạt chuẩn an toàn, không cồn không paraben",
    ],
    ctas: [
      "Da đẹp không đợi ai đâu — bấm giỏ hàng rước em nó về liền!",
      "Nhấn vào link, nhập mã để được tặng thêm mini size nha!",
      "Chốt đơn ngay hôm nay để da bạn cảm ơn bạn sau 2 tuần!",
    ],
    hashtags: ["myham", "skincare", "chamsocda", "lamdep", "reviewmypham", "dadep", "makeup", "beautytips"],
  },
  home: {
    id: "home",
    name: "Gia dụng / Đồ dùng nhà bếp",
    emoji: "🏠",
    tagline: "Đồ bếp, dọn dẹp, tiện ích gia đình",
    keywords: ["tiện lợi", "tiết kiệm thời gian", "gọn gàng", "sạch bong", "nhà bếp", "mẹo hay"],
    painPoints: [
      "làm việc nhà cực mà vẫn không xuể",
      "gian bếp bừa bộn, đồ đạc để đâu cũng chật",
      "chùi rửa mãi mà vết bẩn cứng đầu vẫn còn",
      "tốn cả buổi cho một việc lẽ ra chỉ mất 5 phút",
    ],
    benefits: [
      "làm xong việc nhà chỉ trong một nửa thời gian",
      "sạch bong sáng bóng chỉ với một thao tác",
      "gọn nhẹ, cất đâu cũng vừa, nhà cửa ngăn nắp hẳn",
      "bền bỉ dùng cả năm không hỏng",
    ],
    proofs: [
      "cả nhà mình đang dùng mỗi ngày",
      "hàng trăm nghìn gia đình đã sắm về",
      "quay thử tại chỗ cho các bạn thấy luôn nè",
      "chất liệu dày dặn, an toàn cho sức khỏe",
    ],
    ctas: [
      "Nhà nào cũng nên có một cái — bấm giỏ hàng sắm ngay nha!",
      "Link dưới video, mua sớm còn được freeship tận nhà!",
      "Chốt liền để việc nhà nhàn hơn ngay từ hôm nay!",
    ],
    hashtags: ["giadung", "dodungnhabep", "meohay", "tienich", "nhacua", "dongia", "reviewgiadung", "meovatnhabep"],
  },
  herbal: {
    id: "herbal",
    name: "Thảo dược / Thực phẩm chức năng",
    emoji: "🌿",
    tagline: "Sức khỏe, thảo mộc, bổ sung dinh dưỡng",
    keywords: ["thảo mộc thiên nhiên", "thanh lọc cơ thể", "tăng đề kháng", "lành tính", "an toàn", "gốc rễ"],
    painPoints: [
      "cơ thể mệt mỏi, uể oải suốt cả ngày",
      "ăn ngủ không ngon khiến sức khỏe đi xuống",
      "dùng nhiều thuốc mà chỉ giải quyết phần ngọn",
      "lo lắng vì đề kháng yếu, dễ ốm vặt",
    ],
    benefits: [
      "hỗ trợ cơ thể khỏe khoắn, tràn đầy năng lượng",
      "giúp ăn ngon ngủ sâu một cách tự nhiên",
      "thanh lọc, tăng đề kháng từ bên trong",
      "chiết xuất thảo mộc lành tính, dùng lâu dài an tâm",
    ],
    proofs: [
      "nguồn gốc thảo dược rõ ràng, có kiểm nghiệm",
      "đạt chứng nhận an toàn thực phẩm",
      "nhiều cô chú dùng đều đặn và phản hồi tích cực",
      "quy trình chuẩn, không chất bảo quản độc hại",
    ],
    ctas: [
      "Sức khỏe là vốn quý — bấm giỏ hàng chăm cho mình và gia đình nha!",
      "Nhấn vào link, đặt liệu trình để cảm nhận rõ sự thay đổi!",
      "Chốt ngay hôm nay, tặng người thân món quà sức khỏe!",
    ],
    hashtags: ["thaoduoc", "suckhoe", "thucphamchucnang", "thanhloccothe", "tangdekhang", "songkhoe", "thaomoc", "chamsocsuckhoe"],
  },
  fashion: {
    id: "fashion",
    name: "Thời trang / Phụ kiện",
    emoji: "👗",
    tagline: "Quần áo, giày dép, phụ kiện phối đồ",
    keywords: ["phối đồ", "outfit", "tôn dáng", "chất vải", "xu hướng", "style"],
    painPoints: [
      "tủ đồ đầy mà vẫn không biết mặc gì đi chơi",
      "mua online về mặc lên chẳng giống hình",
      "dáng người khó chọn đồ tôn dáng",
      "chạy theo mốt mà mặc vài lần đã lỗi thời",
    ],
    benefits: [
      "phối được cả chục outfit chỉ với một món",
      "chất vải đẹp, form chuẩn, mặc lên sang liền",
      "tôn dáng, che khuyết điểm cực khéo",
      "hợp mọi hoàn cảnh từ đi làm đến đi chơi",
    ],
    proofs: [
      "mình mặc thử ngay cho các bạn xem dáng thật",
      "cả nghìn nàng đã rinh về và mê tít",
      "vải dày dặn, đường may chắc chắn không lo bung",
      "đủ size cho cả nàng mi nhon lẫn đầy đặn",
    ],
    ctas: [
      "Xinh là phải sắm — bấm giỏ hàng chốt em nó ngay nha!",
      "Link dưới video, inbox mình tư vấn size chuẩn nè!",
      "Chốt sớm kẻo hết size đẹp, mặc là auto lên đồ!",
    ],
    hashtags: ["thoitrang", "phoido", "outfit", "style", "quanao", "reviewthoitrang", "xuhuong", "fashiontiktok"],
  },
  mombaby: {
    id: "mombaby",
    name: "Mẹ và bé",
    emoji: "🍼",
    tagline: "Đồ dùng cho mẹ bầu và em bé",
    keywords: ["cho bé yêu", "an toàn cho bé", "mẹ nhàn tênh", "chăm con", "dịu nhẹ", "chuẩn khoa học"],
    painPoints: [
      "chăm con nhỏ mà mẹ kiệt sức, thiếu ngủ",
      "sợ mua đồ kém an toàn ảnh hưởng đến bé",
      "bé quấy khóc, ăn ngủ thất thường khiến mẹ lo",
      "đồ cho bé nhiều loại quá không biết chọn sao",
    ],
    benefits: [
      "giúp mẹ chăm bé nhàn hơn, có thời gian nghỉ ngơi",
      "an toàn tuyệt đối, dịu nhẹ với làn da bé",
      "giúp bé ăn ngoan ngủ ngon, mẹ đỡ vất vả",
      "thiết kế thông minh, tiện dùng mọi lúc mọi nơi",
    ],
    proofs: [
      "chất liệu đạt chuẩn an toàn cho trẻ sơ sinh",
      "hàng nghìn mẹ bỉm tin dùng và khen nức nở",
      "chính mình đang dùng cho bé nhà mình đây",
      "kiểm định rõ ràng, không chất gây hại",
    ],
    ctas: [
      "Điều tốt nhất cho con — mẹ bấm giỏ hàng sắm ngay nha!",
      "Nhấn vào link, đặt cho bé yêu để mẹ nhàn hơn mỗi ngày!",
      "Chốt liền hôm nay, chăm con khỏe mẹ vui!",
    ],
    hashtags: ["mevabe", "chamcon", "mebim", "dochobe", "embe", "mebimsua", "chamsocbe", "dodungchobe"],
  },
};

export const TONES: Record<ToneId, Tone> = {
  energetic: { id: "energetic", name: "Năng động", emoji: "⚡", desc: "Dồn dập, kích thích, hợp bắt trend" },
  friendly: { id: "friendly", name: "Gần gũi", emoji: "🤗", desc: "Như bạn thân tâm sự, dễ tin" },
  honest: { id: "honest", name: "Review chân thực", emoji: "🫶", desc: "Thật lòng, nói ưu nhược điểm" },
  expert: { id: "expert", name: "Chuyên gia", emoji: "🎓", desc: "Kiến thức, uy tín, thuyết phục" },
  luxury: { id: "luxury", name: "Sang xịn", emoji: "✨", desc: "Cao cấp, tinh tế, đẳng cấp" },
  storytelling: { id: "storytelling", name: "Kể chuyện", emoji: "📖", desc: "Dẫn dắt bằng câu chuyện có thật" },
};

export const INDUSTRY_LIST = Object.values(INDUSTRIES);
export const TONE_LIST = Object.values(TONES);
