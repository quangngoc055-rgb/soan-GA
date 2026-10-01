import { LessonPlan2345, LessonPlanInputForm } from '../types/lessonPlan';

export interface SubjectCategory2018 {
  groupName: string;
  subjects: {
    name: string;
    grades: string;
    specificCompetenciesHint: string;
  }[];
}

export const SUBJECT_GROUPS_2018: SubjectCategory2018[] = [
  {
    groupName: '1. Môn học & Hoạt động giáo dục bắt buộc (Lớp 1 - Lớp 5)',
    subjects: [
      {
        name: 'Tiếng Việt',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint: 'Năng lực ngôn ngữ (Đọc, Viết, Nói và nghe) và Năng lực văn học',
      },
      {
        name: 'Toán',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực tư duy và lập luận toán học; mô hình hóa toán học; giải quyết vấn đề toán học; giao tiếp toán học; sử dụng công cụ, phương tiện học toán',
      },
      {
        name: 'Đạo đức',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực điều chỉnh hành vi; năng lực nhận thức chuẩn mực hành vi; năng lực tìm hiểu và tham gia hoạt động kinh tế - xã hội',
      },
      {
        name: 'Giáo dục thể chất',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực chăm sóc sức khỏe; năng lực vận động cơ bản; năng lực hoạt động thể dục thể thao',
      },
      {
        name: 'Âm nhạc (Nghệ thuật)',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực thể hiện âm nhạc; năng lực cảm thụ và hiểu biết âm nhạc; năng lực ứng dụng và sáng tạo âm nhạc',
      },
      {
        name: 'Mĩ thuật (Nghệ thuật)',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực quan sát và nhận thức thẩm mĩ; năng lực sáng tạo và ứng dụng thẩm mĩ; năng lực phân tích và đánh giá thẩm mĩ',
      },
      {
        name: 'Hoạt động trải nghiệm',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực thích ứng với cuộc sống; năng lực thiết kế và tổ chức hoạt động; năng lực định hướng nghề nghiệp (Sinh hoạt dưới cờ, HĐGD theo chủ đề, Sinh hoạt lớp)',
      },
    ],
  },
  {
    groupName: '2. Môn học bắt buộc theo cấp lớp (Lớp 1-3 & Lớp 3-5)',
    subjects: [
      {
        name: 'Tự nhiên và Xã hội',
        grades: 'Lớp 1, 2, 3',
        specificCompetenciesHint:
          'Năng lực nhận thức khoa học; năng lực tìm hiểu môi trường tự nhiên và xã hội xung quanh; năng lực vận dụng kiến thức, kĩ năng đã học',
      },
      {
        name: 'Ngoại ngữ 1 (Tiếng Anh)',
        grades: 'Bắt buộc Lớp 3, 4, 5 (Tự chọn Lớp 1, 2)',
        specificCompetenciesHint:
          'Năng lực giao tiếp tiếng Anh thông qua 4 kĩ năng Nghe, Nói, Đọc, Viết phù hợp bậc 1 Khung năng lực ngoại ngữ',
      },
      {
        name: 'Tin học (Tin học và Công nghệ)',
        grades: 'Lớp 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực sử dụng và quản lí các phương tiện CNTT; ứng xử phù hợp trong môi trường số; giải quyết vấn đề với sự hỗ trợ của CNTT; ứng dụng CNTT trong học và tự học; hợp tác trong môi trường số',
      },
      {
        name: 'Công nghệ (Tin học và Công nghệ)',
        grades: 'Lớp 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực nhận thức công nghệ; năng lực giao tiếp công nghệ; năng lực sử dụng công nghệ; năng lực đánh giá công nghệ; năng lực thiết kế kĩ thuật',
      },
      {
        name: 'Lịch sử và Địa lí',
        grades: 'Lớp 4, 5',
        specificCompetenciesHint:
          'Năng lực nhận thức khoa học Lịch sử và Địa lí; năng lực tìm hiểu lịch sử và địa lí; năng lực vận dụng kiến thức, kĩ năng đã học',
      },
      {
        name: 'Khoa học',
        grades: 'Lớp 4, 5',
        specificCompetenciesHint:
          'Năng lực nhận thức khoa học tự nhiên; năng lực tìm hiểu môi trường tự nhiên xung quanh; năng lực vận dụng kiến thức, kĩ năng đã học',
      },
    ],
  },
  {
    groupName: '3. Nội dung giáo dục địa phương, Tự chọn & Tích hợp (CV 2345)',
    subjects: [
      {
        name: 'Nội dung giáo dục của địa phương',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Hiểu biết về văn hóa, lịch sử, địa lí, kinh tế, xã hội, môi trường của địa phương; bồi dưỡng tình yêu quê hương',
      },
      {
        name: 'Giáo dục STEM (Bài học STEM)',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Vận dụng tích hợp Khoa học - Công nghệ - Kĩ thuật - Toán học để thiết kế, chế tạo sản phẩm giải quyết vấn đề thực tiễn (Theo CV 909/BGDĐT-GDTH)',
      },
      {
        name: 'Tiếng dân tộc thiểu số (Môn tự chọn)',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Năng lực giao tiếp bằng tiếng dân tộc thiểu số (Nghe, Nói, Đọc, Viết) và giữ gìn bản sắc văn hóa dân tộc',
      },
      {
        name: 'Ngoại ngữ 1 (Lớp 1, 2 - Tự chọn)',
        grades: 'Lớp 1, 2',
        specificCompetenciesHint:
          'Làm quen với tiếng Anh, hình thành phản xạ nghe - nói đơn giản và hứng thú học ngoại ngữ',
      },
      {
        name: 'Hoạt động củng cố, tăng cường & Kỹ năng sống',
        grades: 'Lớp 1, 2, 3, 4, 5',
        specificCompetenciesHint:
          'Củng cố kiến thức, phát triển năng khiếu, câu lạc bộ, đọc sách thư viện và rèn luyện kỹ năng sống (Phụ lục 1.1 CV 2345)',
      },
    ],
  },
];

export const SUBJECT_OPTIONS: string[] = SUBJECT_GROUPS_2018.flatMap((group) =>
  group.subjects.map((s) => s.name)
);

export const GRADE_OPTIONS = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];

export const DURATION_OPTIONS = [
  '1 tiết (35 phút)',
  '2 tiết (70 phút)',
  '3 tiết (105 phút)',
  '1 tiết (40 phút)',
];

export const TEXTBOOK_OPTIONS = [
  'Kết nối tri thức với cuộc sống',
  'Chân trời sáng tạo',
  'Cánh Diều',
  'Chung theo Chương trình GDPT 2018',
];

export const LESSON_TYPE_OPTIONS = [
  'Bài hình thành kiến thức mới',
  'Bài luyện tập, thực hành',
  'Bài ôn tập, tổng kết chủ đề',
  'Hoạt động trải nghiệm / Dự án học tập',
  'Bài học STEM (Thiết kế kĩ thuật)',
];

export interface QuickPreset {
  id: string;
  label: string;
  form: LessonPlanInputForm;
}

export const QUICK_PRESETS: QuickPreset[] = [
  {
    id: 'toan-4-phan-so',
    label: 'Toán · Lớp 4 · Khái niệm phân số',
    form: {
      subject: 'Toán',
      grade: 'Lớp 4',
      lessonTitle: 'Bài 53: Khái niệm phân số (Tiết 1)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Nhận biết được khái niệm ban đầu về phân số thông qua các hình ảnh trực quan.\n- Đọc, viết được các phân số; nhận biết được tử số và mẫu số của một phân số.\n- Vận dụng giải quyết các tình huống chia đều trong thực tế cuộc sống (chia bánh, chia băng giấy).\n- Phát triển năng lực tư duy và lập luận toán học, giao tiếp toán học; phẩm chất chăm chỉ, trách nhiệm.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 15 tháng 01 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Trực quan thao tác bằng băng giấy, thảo luận nhóm đôi, trò chơi khởi động',
    },
  },
  {
    id: 'tv-3-ngay-hoi-rung-xanh',
    label: 'Tiếng Việt · Lớp 3 · Đọc: Ngày hội rừng xanh',
    form: {
      subject: 'Tiếng Việt',
      grade: 'Lớp 3',
      lessonTitle: 'Bài 19: Ngày hội rừng xanh (Đọc)',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Đọc đúng, rõ ràng, diễn cảm bài thơ "Ngày hội rừng xanh"; biết ngắt nghỉ hơi đúng nhịp thơ.\n- Hiểu nội dung bài thơ: Khung cảnh vui tươi, náo nhiệt của các loài vật trong ngày hội rừng xanh, qua đó thêm yêu thiên nhiên và muôn loài.\n- Nhận biết được các từ ngữ chỉ hoạt động, âm thanh trong bài.\n- Hình thành năng lực văn học, năng lực ngôn ngữ, giao tiếp và hợp tác; phẩm chất nhân ái, yêu thiên nhiên.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 12 tháng 02 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Đọc phân vai, kĩ thuật khăn trải bàn tìm hiểu bài, đóng vai phỏng vấn',
    },
  },
  {
    id: 'daoduc-2-nhan-loi-va-sua-loi',
    label: 'Đạo đức · Lớp 2 · Nhận lỗi và sửa lỗi',
    form: {
      subject: 'Đạo đức',
      grade: 'Lớp 2',
      lessonTitle: 'Bài 4: Nhận lỗi và sửa lỗi (Tiết 1)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Nêu được một số biểu hiện của việc biết nhận lỗi và sửa lỗi trong học tập, sinh hoạt.\n- Giải thích được vì sao phải biết nhận lỗi và sửa lỗi khi mắc khuyết điểm.\n- Thực hiện được hành vi dũng cảm nhận lỗi, xin lỗi chân thành và sửa lỗi bằng việc làm cụ thể.\n- Phát triển năng lực điều chỉnh hành vi, giao tiếp và hợp tác; phẩm chất trung thực, trách nhiệm.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 10 tháng 10 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Xử lý tình huống đóng vai, thảo luận nhóm 4, kể chuyện theo tranh',
    },
  },
  {
    id: 'tnxh-2-co-quan-ho-hap',
    label: 'TN&XH · Lớp 2 · Cơ quan hô hấp',
    form: {
      subject: 'Tự nhiên và Xã hội',
      grade: 'Lớp 2',
      lessonTitle: 'Bài 18: Cơ quan hô hấp',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Chỉ và nói được tên các bộ phận chính của cơ quan hô hấp trên sơ đồ, tranh ảnh.\n- Nhận biết được chức năng của cơ quan hô hấp thông qua hoạt động thực hành hít vào và thở ra.\n- Nêu và thực hiện được các việc cần làm để bảo vệ cơ quan hô hấp trong sinh hoạt hằng ngày.\n- Phát triển năng lực nhận thức khoa học, tìm hiểu môi trường tự nhiên; phẩm chất trách nhiệm với sức khỏe bản thân.',
      textbook: 'Chân trời sáng tạo',
      executionDate: 'Ngày 20 tháng 01 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Quan sát tranh sơ đồ, thực hành trải nghiệm nhịp thở, đóng vai bác sĩ nhí',
    },
  },
  {
    id: 'khoahoc-5-hon-hop-dung-dich',
    label: 'Khoa học · Lớp 5 · Hỗn hợp và dung dịch',
    form: {
      subject: 'Khoa học',
      grade: 'Lớp 5',
      lessonTitle: 'Bài 5: Hỗn hợp và dung dịch',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Phân biệt được hỗn hợp và dung dịch từ các chất đã cho.\n- Thực hành tạo ra một số hỗn hợp và dung dịch đơn giản từ các vật liệu quen thuộc (muối, đường, cát, nước, tiêu).\n- Vận dụng kiến thức vào pha chế nước chấm, nước giải khát an toàn trong gia đình.\n- Phát triển năng lực thực nghiệm khoa học, giải quyết vấn đề và sáng tạo; phẩm chất trung thực khi ghi chép thí nghiệm.',
      textbook: 'Cánh Diều',
      executionDate: 'Ngày 05 tháng 10 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Thí nghiệm thực hành theo nhóm 4, phiếu quan sát khoa học, kĩ thuật phòng tranh',
    },
  },
  {
    id: 'lsdl-4-thien-nhien-trung-bo',
    label: 'Lịch sử & Địa lí · Lớp 4 · Thiên nhiên vùng Duyên hải miền Trung',
    form: {
      subject: 'Lịch sử và Địa lí',
      grade: 'Lớp 4',
      lessonTitle: 'Bài 15: Thiên nhiên vùng Duyên hải miền Trung (Tiết 1)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Xác định được vị trí địa lí, một số địa danh tiêu biểu của vùng Duyên hải miền Trung trên bản đồ hoặc lược đồ.\n- Quan sát lược đồ, tranh ảnh để mô tả được đặc điểm địa hình, khí hậu, sông ngòi của vùng.\n- Đề xuất được một số biện pháp phòng chống thiên tai (bão, lũ lụt, hạn hán) và bảo vệ thiên nhiên miền Trung.\n- Phát triển năng lực nhận thức và tìm hiểu Lịch sử - Địa lí; phẩm chất yêu nước, nhân ái.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 18 tháng 12 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Khai thác lược đồ địa lí, kĩ thuật mảnh ghép, thuyết trình du lịch qua tranh',
    },
  },
  {
    id: 'tinhoc-3-thong-tin-va-quyet-dinh',
    label: 'Tin học · Lớp 3 · Thông tin và quyết định',
    form: {
      subject: 'Tin học (Tin học và Công nghệ)',
      grade: 'Lớp 3',
      lessonTitle: 'Bài 1: Thông tin và quyết định',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Nhận biết được thông tin và quyết định trong các tình huống quen thuộc hằng ngày.\n- Nêu được ví dụ minh họa cho thấy thông tin giúp con người đưa ra quyết định đúng đắn.\n- Phân biệt được ba dạng thông tin thường gặp: chữ, âm thanh, hình ảnh.\n- Hình thành năng lực nhận thức công nghệ số, giải quyết vấn đề; phẩm chất chăm chỉ, trách nhiệm.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 08 tháng 09 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Tình huống thực tế trực quan, thảo luận cặp đôi, trò chơi phân loại thông tin',
    },
  },
  {
    id: 'congnghe-4-trong-hoa-cay-canh',
    label: 'Công nghệ · Lớp 4 · Chậu hoa, cây cảnh mini',
    form: {
      subject: 'Công nghệ (Tin học và Công nghệ)',
      grade: 'Lớp 4',
      lessonTitle: 'Bài 4: Trồng hoa, cây cảnh trong chậu',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Nêu được các bước chuẩn bị vật liệu, dụng cụ và quy trình trồng hoa, cây cảnh trong chậu.\n- Thực hành trồng được một chậu hoa hoặc cây cảnh nhỏ đúng kĩ thuật, đảm bảo vệ sinh và an toàn.\n- Có ý thức chăm sóc cây xanh tại trường và gia đình.\n- Phát triển năng lực sử dụng công nghệ, thiết kế kĩ thuật; phẩm chất chăm chỉ, yêu thiên nhiên.',
      textbook: 'Chân trời sáng tạo',
      executionDate: 'Ngày 22 tháng 11 năm 2026',
      lessonType: 'Bài luyện tập, thực hành',
      pedagogicalFocus: 'Thực hành làm mẫu, làm việc nhóm thực hành trồng cây, đánh giá sản phẩm theo tiêu chí',
    },
  },
  {
    id: 'tienganh-3-hello',
    label: 'Ngoại ngữ 1 (Tiếng Anh) · Lớp 3 · Unit 1: Hello',
    form: {
      subject: 'Ngoại ngữ 1 (Tiếng Anh)',
      grade: 'Lớp 3',
      lessonTitle: 'Unit 1: Hello — Lesson 1 (Parts 1, 2, 3)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Nhận biết và phát âm đúng các từ vựng chào hỏi: Hello, Hi, I, am và tên các nhân vật Ben, Mai, Minh, Lucy.\n- Sử dụng được mẫu câu "Hello/Hi. I’m + [tên]." để chào hỏi và tự giới thiệu tên bằng tiếng Anh trong giao tiếp đơn giản.\n- Hào hứng giao tiếp với bạn bè bằng tiếng Anh; phát triển năng lực giao tiếp ngoại ngữ, phẩm chất nhân ái.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 07 tháng 09 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Look, listen and repeat; Role-play đóng vai giao tiếp; Trò chơi Passing the ball',
    },
  },
  {
    id: 'amnhac-1-am-thanh-ngay-moi',
    label: 'Âm nhạc · Lớp 1 · Chủ đề 1: Âm thanh ngày mới',
    form: {
      subject: 'Âm nhạc (Nghệ thuật)',
      grade: 'Lớp 1',
      lessonTitle: 'Chủ đề 1: Âm thanh ngày mới — Học hát: Tiếng trống trường em',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Hát đúng giai điệu, lời ca bài hát "Tiếng trống trường em" kết hợp vỗ tay hoặc gõ đệm theo phách.\n- Cảm nhận được tính chất vui tươi, rộn ràng của bài hát và thêm yêu mái trường tiểu học.\n- Phát triển năng lực thể hiện âm nhạc, cảm thụ âm nhạc; phẩm chất yêu nước, chăm chỉ.',
      textbook: 'Chân trời sáng tạo',
      executionDate: 'Ngày 14 tháng 09 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Nghe hát mẫu, gõ đệm thanh phách, biểu diễn nhóm kết hợp vận động cơ thể',
    },
  },
  {
    id: 'mithuat-3-ngoi-truong-hanh-phuc',
    label: 'Mĩ thuật · Lớp 3 · Ngôi trường hạnh phúc',
    form: {
      subject: 'Mĩ thuật (Nghệ thuật)',
      grade: 'Lớp 3',
      lessonTitle: 'Chủ đề: Trường em — Bài: Ngôi trường hạnh phúc',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Nhận biết được sự đa dạng của hình mảng, màu sắc đậm nhạt trong tranh vẽ đề tài trường học.\n- Vẽ và trang trí được bức tranh về hoạt động vui chơi, học tập ở trường theo ý thích.\n- Giới thiệu, nhận xét và chia sẻ được cảm nhận về sản phẩm mĩ thuật của mình và của bạn.\n- Phát triển năng lực quan sát và sáng tạo thẩm mĩ; phẩm chất nhân ái, trách nhiệm.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 15 tháng 10 năm 2026',
      lessonType: 'Bài luyện tập, thực hành',
      pedagogicalFocus: 'Trực quan tranh mẫu, thực hành sáng tạo cá nhân, trưng bày phòng tranh nhỏ',
    },
  },
  {
    id: 'gdtc-4-di-deu-vong-phai-trai',
    label: 'Giáo dục thể chất · Lớp 4 · Đi đều vòng phải, vòng trái',
    form: {
      subject: 'Giáo dục thể chất',
      grade: 'Lớp 4',
      lessonTitle: 'Bài 2: Đi đều vòng phải, vòng trái (Tiết 1)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Biết và thực hiện được động tác đi đều vòng phải, vòng trái đúng khẩu lệnh và nhịp điệu.\n- Tích cực tham gia trò chơi vận động "Kết bạn" để rèn luyện sự khéo léo, nhanh nhẹn.\n- Có ý thức kỉ luật, tác phong nhanh nhẹn và đảm bảo an toàn trong tập luyện.\n- Phát triển năng lực vận động cơ bản, năng lực thể dục thể thao; phẩm chất trách nhiệm.',
      textbook: 'Cánh Diều',
      executionDate: 'Ngày 02 tháng 10 năm 2026',
      lessonType: 'Bài hình thành kiến thức mới',
      pedagogicalFocus: 'Làm mẫu động tác, tập luyện theo tổ/nhóm dưới sự điều khiển của cán sự lớp, trò chơi vận động',
    },
  },
  {
    id: 'hdtn-5-giu-gin-tinh-ban',
    label: 'Hoạt động trải nghiệm · Lớp 5 · Giữ gìn tình bạn',
    form: {
      subject: 'Hoạt động trải nghiệm',
      grade: 'Lớp 5',
      lessonTitle: 'Chủ đề 2: Giữ gìn tình bạn (Hoạt động giáo dục theo chủ đề)',
      duration: '1 tiết (35 phút)',
      objectives:
        '- Nêu được những lời nói, việc làm cụ thể để nuôi dưỡng và giữ gìn tình bạn trong sáng, gắn bó.\n- Biết cách hóa giải những hiểu lầm, mâu thuẫn với bạn bè một cách bình tĩnh, tôn trọng.\n- Thực hiện làm "Thiệp gắn kết yêu thương" gửi tặng bạn trong lớp.\n- Phát triển năng lực thích ứng với cuộc sống, giao tiếp và hợp tác; phẩm chất nhân ái.',
      textbook: 'Kết nối tri thức với cuộc sống',
      executionDate: 'Ngày 25 tháng 10 năm 2026',
      lessonType: 'Hoạt động trải nghiệm / Dự án học tập',
      pedagogicalFocus: 'Trò chơi kết nối, đóng vai xử lý tình huống bất đồng, làm sản phẩm trải nghiệm',
    },
  },
  {
    id: 'stem-4-nhac-cu-tu-che',
    label: 'Giáo dục STEM · Lớp 4 · Nhạc cụ tự chế (Khoa học chủ đạo)',
    form: {
      subject: 'Giáo dục STEM (Bài học STEM)',
      grade: 'Lớp 4',
      lessonTitle: 'Bài học STEM: Nhạc cụ tự chế (Tích hợp Khoa học - Âm nhạc - Mĩ thuật - Toán)',
      duration: '2 tiết (70 phút)',
      objectives:
        '- Mô tả được sự lan truyền âm thanh và nhận biết âm thanh trầm - bổng phụ thuộc vào độ căng, độ dài của vật phát ra âm thanh.\n- Thiết kế bản vẽ và chế tạo được một nhạc cụ đơn giản từ vật liệu tái chế phát ra được ít nhất 3 nốt nhạc có độ cao khác nhau.\n- Phát triển năng lực giải quyết vấn đề và sáng tạo, thiết kế kĩ thuật; phẩm chất trách nhiệm bảo vệ môi trường.',
      textbook: 'Chung theo Chương trình GDPT 2018',
      executionDate: 'Ngày 12 tháng 11 năm 2026',
      lessonType: 'Bài học STEM (Thiết kế kĩ thuật)',
      pedagogicalFocus: 'Quy trình thiết kế kĩ thuật 5 bước theo Công văn 909/BGDĐT-GDTH, làm việc nhóm chế tạo sản phẩm',
    },
  },
];

export const INITIAL_SAMPLE_PLANS: LessonPlan2345[] = [
  {
    id: 'sample-toan-4-phan-so',
    createdAt: '2026-09-30T08:00:00.000Z',
    header: {
      subject: 'Toán',
      grade: 'Lớp 4',
      lessonTitle: 'Bài 53: Khái niệm phân số (Tiết 1)',
      duration: '1 tiết (35 phút)',
      executionDate: 'Ngày 15 tháng 01 năm 2026',
      textbook: 'Kết nối tri thức với cuộc sống',
      lessonType: 'Bài hình thành kiến thức mới',
    },
    section1_objectives: {
      specificCompetencies: [
        'Nhận biết được khái niệm ban đầu về phân số thông qua thao tác chia đều hình phẳng (hình tròn, băng giấy) thành các phần bằng nhau và tô màu.',
        'Đọc, viết đúng các phân số; nêu chính xác tử số (số phần đã tô màu, viết trên dấu gạch ngang) và mẫu số (tổng số phần bằng nhau, viết dưới dấu gạch ngang, khác 0).',
        'Vận dụng được phân số để biểu thị số phần của một vật hoặc một hình trong các tình huống thực tiễn gần gũi (chia bánh, chia phần giấy thủ công).',
      ],
      generalCompetencies: {
        autonomyAndLearning:
          'Chủ động thực hiện thao tác gấp, chia đều băng giấy và tô màu theo yêu cầu; tự kiểm tra kết quả trên phiếu học tập cá nhân.',
        communicationAndCollaboration:
          'Trao đổi rõ ràng với bạn cùng bàn về cách đọc, cách viết phân số; biết lắng nghe và nhận xét sản phẩm của nhóm bạn.',
        problemSolvingAndCreativity:
          'Giải quyết được tình huống chia đều chiếc bánh pizza cho các bạn trong nhóm và biểu diễn phần bánh bằng ký hiệu toán học.',
      },
      qualities: [
        'Chăm chỉ: Tích cực tham gia các thao tác trên bộ đồ dùng học Toán và hoàn thành đầy đủ các bài tập.',
        'Trách nhiệm: Giữ gìn đồ dùng học tập, hoàn thành đúng thời gian nhiệm vụ được phân công trong nhóm đôi.',
        'Trung thực: Tự giác đối chiếu và nhận xét khách quan kết quả làm bài của bản thân và của bạn.',
      ],
      integratedContent:
        'Tích hợp Mĩ thuật (gấp, tô màu đều các phần bằng nhau của hình học phẳng) và Giáo dục kĩ năng sống (văn hóa chia sẻ công bằng với bạn bè).',
    },
    section2_teachingAids: {
      teacherPreparation: [
        'Kế hoạch bài dạy điện tử, bài giảng trình chiếu minh họa trực quan việc chia hình tròn thành 6 phần bằng nhau.',
        'Mô hình hình tròn bằng bìa nam châm chia sẵn các phần bằng nhau để gắn bảng từ.',
        'Phiếu học tập số 1 (Khám phá) và Phiếu học tập số 2 (Luyện tập); thẻ từ "Tử số", "Mẫu số".',
      ],
      studentPreparation: [
        'Sách giáo khoa Toán 4, vở ghi Toán, bảng con và phấn/bút dạ.',
        'Bộ đồ dùng học Toán lớp 4 (các băng giấy hình chữ nhật, hình vuông bằng giấy thủ công) và bút màu.',
      ],
    },
    section3_activities: [
      {
        id: 'act-1',
        type: 'khoi_dong',
        title: 'Hoạt động 1: Mở đầu — Khởi động, kết nối',
        durationMinutes: 5,
        objective:
          'Tạo không khí hào hứng đầu giờ học; làm xuất hiện tình huống thực tiễn cần biểu diễn "một số phần bằng nhau" của một đơn vị để kết nối vào bài học mới.',
        organizationForm: 'Hoạt động cả lớp kết hợp thao tác cá nhân',
        teachingMethod: 'Trò chơi học tập "Đầu bếp tí hon" và giải quyết vấn đề',
        steps: {
          step1_transferTask:
            'Giáo viên nêu tình huống trực quan: "Trong buổi liên hoan lớp, nhóm của Việt có một chiếc bánh pizza hình tròn được cắt thành 6 phần bằng nhau. Bạn Việt lấy 1 phần bánh, bạn Nam lấy 2 phần bánh." Giáo viên phát cho mỗi bàn 1 hình tròn bằng giấy đã kẻ sẵn 6 phần bằng nhau, yêu cầu học sinh tô màu phần bánh của Việt và thảo luận câu hỏi: "Làm thế nào để dùng số viết gọn phần bánh Việt đã lấy so với cả chiếc bánh?"',
          step2_performTask:
            'Học sinh quan sát hình tròn trên bàn, đếm tổng số phần bằng nhau (6 phần), dùng bút màu tô 1 phần biểu thị phần bánh của Việt. Các cặp đôi trao đổi cách gọi tên phần đã tô màu; giáo viên đi quan sát các bàn, khích lệ các em nêu cách diễn đạt theo hiểu biết riêng.',
          step3_presentAndDiscuss:
            'Đại diện 2–3 cặp đôi giơ hình tròn đã tô màu và nêu câu trả lời (ví dụ: "Một phần trong sáu phần", "Một phần sáu chiếc bánh"). Các học sinh khác nhận xét xem hình của bạn đã chia đều và tô đúng 1 phần chưa.',
          step4_evaluateAndConclude:
            'Giáo viên nhận xét, khen ngợi sự nhanh nhạy của học sinh, sau đó chốt vấn đề kết nối: "Để ghi lại ngắn gọn một phần sáu hay nhiều phần bằng nhau của một đơn vị trong Toán học, người ta dùng Phân số. Hôm nay thầy/cô và các em cùng khám phá Bài 53: Khái niệm phân số."',
        },
        teacherActions: [
          'Trình chiếu tình huống "Chiếc bánh pizza chia đều" và nêu nhiệm vụ tô màu trên mô hình giấy.',
          'Quan sát học sinh thao tác tô màu, đặt câu hỏi gợi mở về tổng số phần bằng nhau và số phần lấy đi.',
          'Mời 2–3 học sinh trình bày cách gọi tên phần bánh và dẫn dắt vào bài mới.',
        ],
        studentActions: [
          'Lắng nghe tình huống, kiểm tra số phần bằng nhau trên hình tròn giấy.',
          'Thao tác tô màu 1 phần trên tổng số 6 phần bằng nhau và trao đổi với bạn cùng bàn.',
          'Trình bày kết quả trước lớp và lắng nghe giới thiệu bài học mới.',
        ],
        expectedProducts:
          'Hình tròn giấy được tô màu đúng 1/6; học sinh nêu được nhu cầu tìm hiểu cách viết ký hiệu phân số.',
      },
      {
        id: 'act-2',
        type: 'kham_pha',
        title: 'Hoạt động 2: Hình thành kiến thức mới — Trải nghiệm, khám phá, phân tích',
        durationMinutes: 12,
        objective:
          'Học sinh nhận biết được khái niệm phân số, biết đọc, viết phân số và xác định đúng ý nghĩa của tử số, mẫu số.',
        organizationForm: 'Làm việc nhóm đôi và hoạt động cả lớp',
        teachingMethod: 'Trực quan thao tác, đàm thoại gợi mở, phân tích mẫu',
        steps: {
          step1_transferTask:
            'Giáo viên giao nhiệm vụ gồm 2 chặng:\n- Nhiệm vụ 1: Quan sát hình tròn chia làm 6 phần bằng nhau (đã tô màu 1 phần và trường hợp tô màu 2 phần). Thảo luận nhóm đôi trả lời: Hình tròn được chia thành mấy phần bằng nhau? Đã tô màu mấy phần?\n- Nhiệm vụ 2: Quan sát cách viết phân số 1/6 và 2/6 trên bảng, xác định số nào viết trên dấu gạch ngang, số nào viết dưới dấu gạch ngang và mỗi số đó cho biết điều gì.',
          step2_performTask:
            'Học sinh làm việc theo nhóm đôi trong 4 phút: cùng chỉ vào hình trong SGK và mô hình trên bàn, điền vào Phiếu học tập số 1 (Số phần bằng nhau: 6; Số phần tô màu: 1 -> Phân số 1/6; Số phần tô màu: 2 -> Phân số 2/6). Giáo viên quan sát, hỗ trợ các học sinh còn lúng túng khi viết dấu gạch ngang phân số trên dòng kẻ vở.',
          step3_presentAndDiscuss:
            'Giáo viên mời đại diện 2 nhóm lên bảng gắn kết quả và chỉ vào mô hình giải thích cách đọc ("một phần sáu", "hai phần sáu"). Giáo viên tổ chức cho cả lớp thảo luận câu hỏi trọng tâm: "Trong phân số 2/6, mẫu số 6 cho biết gì? Tử số 2 cho biết gì? Mẫu số có thể bằng 0 được không?" Học sinh giơ tay phát biểu và phản biện.',
          step4_evaluateAndConclude:
            'Giáo viên nhận xét, tuyên dương các nhóm và chuẩn hóa kiến thức trên bảng:\n- Mỗi phân số có tử số và mẫu số.\n- Tử số là số tự nhiên viết trên gạch ngang (cho biết số phần bằng nhau đã được tô màu).\n- Mẫu số là số tự nhiên khác 0 viết dưới gạch ngang (cho biết tổng số phần bằng nhau đã chia).',
        },
        teacherActions: [
          'Gắn mô hình hình tròn chia 6 phần bằng nhau lên bảng từ; hướng dẫn cách viết và đọc phân số 1/6, 2/6.',
          'Tổ chức cho học sinh thảo luận nhóm đôi phân tích cấu tạo phân số (Tử số - Dấu gạch ngang - Mẫu số).',
          'Hướng dẫn học sinh luyện viết phân số trên bảng con đúng quy tắc dòng kẻ.',
          'Nhận xét, chốt kiến thức trọng tâm và lưu ý điều kiện mẫu số luôn khác 0.',
        ],
        studentActions: [
          'Quan sát mô hình trực quan, thảo luận nhóm đôi hoàn thành Phiếu học tập số 1.',
          'Thực hành đọc to và viết phân số 1/6, 2/6, 5/6 vào bảng con.',
          'Trình bày ý nghĩa của tử số và mẫu số; nhắc lại kết luận của bài học.',
        ],
        expectedProducts:
          'Phiếu học tập số 1 hoàn thiện chính xác; 100% học sinh viết đúng phân số 1/6, 2/6 trên bảng con và phân biệt được tử số, mẫu số.',
      },
      {
        id: 'act-3',
        type: 'luyen_tap',
        title: 'Hoạt động 3: Luyện tập, thực hành',
        durationMinutes: 13,
        objective:
          'Củng cố kĩ năng viết, đọc phân số chỉ phần đã tô màu trong mỗi hình và xác định thành thạo tử số, mẫu số.',
        organizationForm: 'Cá nhân làm bài kết hợp đổi vở kiểm tra chéo (Nhóm đôi)',
        teachingMethod: 'Thực hành luyện tập có hướng dẫn, đánh giá đồng đẳng',
        steps: {
          step1_transferTask:
            'Giáo viên giao hệ thống bài tập thực hành trong SGK:\n- Bài tập 1: Viết rồi đọc phân số chỉ phần đã tô màu trong mỗi hình (4 hình phẳng được chia đều).\n- Bài tập 2: Hoàn thành bảng gồm các cột: Phân số, Tử số, Mẫu số (với các phân số 4/7, 5/9, 8/13).',
          step2_performTask:
            'Học sinh làm việc cá nhân vào vở bài tập và bảng con (7 phút). Với Bài 1, học sinh đếm tổng số phần bằng nhau để viết mẫu số trước, đếm số phần tô màu để viết tử số sau. Giáo viên đi kiểm tra từng dãy bàn, đặc biệt lưu ý hỗ trợ những học sinh hay nhầm lẫn giữa số phần tô màu và số phần chưa tô màu.',
          step3_presentAndDiscuss:
            'Học sinh đổi vở theo cặp đôi để kiểm tra chéo (2 phút). Sau đó, 3 học sinh lên chiếu vở/bảng phụ trình bày kết quả Bài 1 và Bài 2. Cả lớp đặt câu hỏi cho bạn: "Vì sao ở hình C bạn viết phân số là 3/8?" Bạn trình bày giải thích rõ cách đếm.',
          step4_evaluateAndConclude:
            'Giáo viên nhận xét quá trình làm bài và chữa bài của học sinh; khắc sâu kinh nghiệm: "Khi viết phân số biểu thị phần tô màu, cần kiểm tra xem các phần đã bằng nhau chưa và đếm tổng số phần cả hình để viết mẫu số."',
        },
        teacherActions: [
          'Nêu yêu cầu Bài tập 1 và Bài tập 2; hướng dẫn học sinh quy trình đếm phần bằng nhau.',
          'Quan sát toàn lớp, kèm cặp trực tiếp học sinh còn chậm, không để học sinh nào bị bỏ lại phía sau.',
          'Tổ chức cho học sinh đổi vở nhận xét chéo và chữa bài trực tiếp trên màn hình.',
        ],
        studentActions: [
          'Tự lực hoàn thành Bài tập 1 và Bài tập 2 vào vở/Phiếu học tập số 2.',
          'Đổi vở kiểm tra bài của bạn cùng bàn, đối chiếu đáp án và giải thích cách làm.',
          'Tự sửa lỗi (nếu có) và rút kinh nghiệm cách xác định mẫu số.',
        ],
        expectedProducts:
          'Lời giải đúng Bài tập 1 và Bài tập 2 trong vở học sinh; học sinh tự nhận xét và nhận xét được bài làm của bạn.',
      },
      {
        id: 'act-4',
        type: 'van_dung',
        title: 'Hoạt động 4: Vận dụng, trải nghiệm',
        durationMinutes: 5,
        objective:
          'Học sinh vận dụng kiến thức về phân số để tạo ra sản phẩm trực quan bằng băng giấy và liên hệ giải quyết tình huống thực tế.',
        organizationForm: 'Hoạt động cá nhân và chia sẻ trước lớp',
        teachingMethod: 'Học thông qua làm (Learning by doing) và trải nghiệm thực tế',
        steps: {
          step1_transferTask:
            'Giáo viên tổ chức thử thách "Nhà thiết kế tí hon": Mỗi học sinh lấy 1 băng giấy hình chữ nhật hoặc hình vuông trong bộ đồ dùng, tự gấp thành 4 hoặc 8 phần bằng nhau, tô màu số phần tùy thích rồi viết phân số tương ứng lên góc băng giấy để đố bạn cùng bàn đọc.',
          step2_performTask:
            'Học sinh hào hứng gấp giấy sao cho các mép trùng khít nhau, kẻ vạch chia phần, tô màu theo ý thích và ghi phân số ở mặt sau. Sau đó giơ mặt tô màu đố bạn bên cạnh nêu đúng phân số.',
          step3_presentAndDiscuss:
            'Giáo viên mời 2–3 học sinh có cách gấp và tô màu sáng tạo lên chia sẻ trước lớp. Học sinh dưới lớp đọc to phân số tương ứng với sản phẩm của bạn.',
          step4_evaluateAndConclude:
            'Giáo viên nhận xét tiết học, khen ngợi tinh thần học tập tích cực của cả lớp; dặn dò học sinh về nhà quan sát các đồ vật được chia phần đều nhau trong gia đình (khay đá tủ lạnh, thanh sô-cô-la, hộp bánh) và tập nêu phân số với người thân.',
        },
        teacherActions: [
          'Phát lệnh thử thách gấp và tô màu băng giấy biểu diễn phân số tự chọn.',
          'Khích lệ học sinh đố nhau theo cặp và mời đại diện trưng bày sản phẩm.',
          'Đánh giá tổng kết tiết học và giao nhiệm vụ trải nghiệm thực tế tại gia đình.',
        ],
        studentActions: [
          'Thực hành gấp băng giấy thành các phần bằng nhau, tô màu và viết phân số.',
          'Đố bạn cùng bàn đọc phân số từ băng giấy của mình.',
          'Lắng nghe nhận xét cuối giờ và ghi nhớ hoạt động trải nghiệm cùng gia đình.',
        ],
        expectedProducts:
          'Sản phẩm băng giấy gấp đều, tô màu đẹp và ghi đúng phân số tương ứng của mỗi học sinh.',
      },
    ],
    section4_assessmentAndAdjustment: {
      assessmentCriteria: [
        {
          criterion: 'Nhận biết, đọc và viết phân số (Năng lực toán học)',
          levelGood:
            'Đọc, viết chính xác mọi phân số; giải thích rõ ràng ý nghĩa tử số, mẫu số và tự tạo được mô hình phân số đúng.',
          levelCompleted:
            'Đọc, viết được phân số từ hình vẽ trực quan; xác định đúng tử số và mẫu số.',
          levelNeedsSupport:
            'Cần giáo viên gợi ý khi đếm tổng số phần bằng nhau để viết mẫu số.',
          methodAndTool: 'Quan sát, hỏi đáp, đánh giá qua bảng con và Phiếu học tập.',
        },
        {
          criterion: 'Hợp tác nhóm và tự giác học tập (Năng lực chung & Phẩm chất)',
          levelGood:
            'Chủ động trao đổi, hỗ trợ bạn cùng bàn và trình bày tự tin trước lớp.',
          levelCompleted:
            'Tham gia thảo luận nhóm đôi và hoàn thành nhiệm vụ học tập đúng giờ.',
          levelNeedsSupport:
            'Còn rụt rè khi trao đổi nhóm, cần giáo viên khích lệ tham gia.',
          methodAndTool: 'Quan sát thái độ làm việc nhóm và sản phẩm băng giấy.',
        },
      ],
      postLessonAdjustments: {
        inadequaciesAndDifficulties:
          'Một số học sinh khi làm Bài tập 1 còn đếm nhầm số phần chưa tô màu làm mẫu số (ví dụ tô 2 phần, còn 4 phần trắng thì viết nhầm thành 2/4 thay vì 2/6). Cần nhấn mạnh thao tác đếm tổng số phần bằng nhau của cả hình trước khi viết mẫu số.',
        effectiveHighlights:
          'Hoạt động khởi động chia bánh pizza và hoạt động vận dụng gấp băng giấy trực quan giúp học sinh nắm bản chất "chia thành các phần bằng nhau" rất nhanh, lớp học sôi nổi, 100% học sinh đều có sản phẩm thực hành.',
        differentiationNotes:
          'Đối với học sinh tiếp thu nhanh: Khuyến khích tìm thêm phân số chỉ phần CHƯA tô màu của mỗi hình. Đối với học sinh cần hỗ trợ: Hướng dẫn các em đánh số thứ tự 1, 2, 3... vào từng phần nhỏ trên hình vẽ trước khi viết mẫu số.',
      },
    },
  },
];
