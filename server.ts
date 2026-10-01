import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // Endpoint 1: Suggest Yêu cầu cần đạt (YCCĐ) based on Subject, Grade, and Lesson Title
  app.post('/api/lesson-plan/suggest-objectives', async (req, res) => {
    try {
      const { subject, grade, lessonTitle, textbook, duration } = req.body;

      if (!subject || !grade || !lessonTitle) {
        res.status(400).json({
          error: 'Vui lòng nhập đầy đủ Môn học, Lớp và Tên bài học để gợi ý Yêu cầu cần đạt.',
        });
        return;
      }

      const prompt = `Bạn là chuyên gia sư phạm cấp Tiểu học của Bộ Giáo dục và Đào tạo Việt Nam, am hiểu sâu sắc Chương trình Giáo dục phổ thông 2018 và Phụ lục 3 Công văn số 2345/BGDĐT-GDTH ngày 07/06/2021.
Hãy xây dựng phần "Yêu cầu cần đạt" ngắn gọn, chuẩn xác, thiết thực cho bài học sau:
- Môn học/Hoạt động giáo dục: ${subject}
- Lớp: ${grade}
- Tên bài học: ${lessonTitle}
- Thời lượng dự kiến: ${duration || '1 tiết (35 phút)'}
- Bộ sách giáo khoa: ${textbook || 'Chương trình GDPT 2018'}

Yêu cầu trình bày rõ các gạch đầu dòng cụ thể:
1. Học sinh thực hiện được việc gì (Năng lực đặc thù của môn học).
2. Vận dụng được những gì vào giải quyết vấn đề trong thực tế cuộc sống.
3. Cơ hội hình thành, phát triển năng lực chung (Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo) và phẩm chất chủ yếu (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm).
Chỉ trả về nội dung văn bản gạch đầu dòng rõ ràng, dễ chỉnh sửa trong ô nhập liệu.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Bạn là Tổ trưởng chuyên môn cấp Tiểu học giàu kinh nghiệm, viết Yêu cầu cần đạt chuẩn mực theo Công văn 2345/BGDĐT-GDTH.',
          temperature: 0.5,
        },
      });

      const suggestedText = response.text || '';
      res.json({ objectives: suggestedText.trim() });
    } catch (error: unknown) {
      console.error('Error suggesting objectives:', error);
      const message =
        error instanceof Error ? error.message : 'Lỗi khi gọi AI gợi ý Yêu cầu cần đạt.';
      res.status(500).json({ error: message });
    }
  });

  // Endpoint 2: Generate full Lesson Plan strictly following Công văn 2345/BGDĐT-GDTH (Phụ lục 3)
  app.post('/api/lesson-plan/generate', async (req, res) => {
    try {
      const {
        subject,
        grade,
        lessonTitle,
        duration,
        objectives,
        textbook,
        executionDate,
        lessonType,
        pedagogicalFocus,
      } = req.body;

      if (!subject || !grade || !lessonTitle) {
        res.status(400).json({
          error: 'Vui lòng cung cấp đầy đủ Môn học, Lớp và Tên bài học.',
        });
        return;
      }

      const prompt = `Hãy soạn một KẾ HOẠCH BÀI DẠY (Giáo án) cấp Tiểu học chi tiết, chuẩn sư phạm và tuân thủ tuyệt đối cấu trúc Phụ lục 3 của Công văn số 2345/BGDĐT-GDTH ngày 07/06/2021 của Bộ Giáo dục và Đào tạo Việt Nam.

THÔNG TIN ĐẦU VÀO DO GIÁO VIÊN CUNG CẤP:
- Môn học/Hoạt động giáo dục: ${subject}
- Lớp: ${grade}
- Tên bài học: ${lessonTitle}
- Thời lượng: ${duration || '1 tiết (35 phút)'}
- Thời gian thực hiện: ${executionDate || 'Ngày ... tháng ... năm 2026'}
- Bộ sách giáo khoa: ${textbook || 'Kết nối tri thức với cuộc sống'}
- Loại bài học: ${lessonType || 'Bài hình thành kiến thức mới'}
- Yêu cầu cần đạt (do GV nhập): ${objectives || 'Tự động xác định chuẩn theo Chương trình GDPT 2018 cho bài học này.'}
- Định hướng phương pháp/kĩ thuật dạy học tích cực: ${pedagogicalFocus || 'Phát huy tính tích cực, chủ động của học sinh; lồng ghép trò chơi học tập và thảo luận nhóm.'}

YÊU CẦU BẮT BUỘC THEO PHỤ LỤC 3 CÔNG VĂN 2345/BGDĐT-GDTH:
1. Phần "1. Yêu cầu cần đạt":
   - Xác định rõ học sinh thực hiện được việc gì; vận dụng được những gì vào giải quyết vấn đề trong thực tế cuộc sống; có cơ hội hình thành, phát triển phẩm chất, năng lực gì (chia rõ Năng lực đặc thù, Năng lực chung: Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo; và các Phẩm chất chủ yếu).
2. Phần "2. Đồ dùng dạy học":
   - Nêu cụ thể thiết bị, học liệu, mô hình, phiếu học tập của Giáo viên và đồ dùng học tập của Học sinh.
3. Phần "3. Các hoạt động dạy học chủ yếu":
   - Bắt buộc thiết kế đầy đủ 4 hoạt động cốt lõi theo đúng trình tự Công văn 2345:
     + Hoạt động 1 (type: "khoi_dong"): Hoạt động Mở đầu: khởi động, kết nối.
     + Hoạt động 2 (type: "kham_pha"): Hoạt động Hình thành kiến thức mới: trải nghiệm, khám phá, phân tích, hình thành kiến thức mới.
     + Hoạt động 3 (type: "luyen_tap"): Hoạt động Luyện tập, thực hành.
     + Hoạt động 4 (type: "van_dung"): Hoạt động Vận dụng, trải nghiệm.
   - Tổng thời lượng (durationMinutes) của 4 hoạt động phải khớp hợp lý với Thời lượng bài học (${duration || '35 phút'}).
   - Trong MỖI hoạt động, phải trình bày cụ thể, chi tiết 4 bước tổ chức hoạt động học tập theo Mục 4 Phần A Phụ lục 3 Công văn 2345:
     a) Chuyển giao nhiệm vụ học tập (step1_transferTask): Nêu rõ vấn đề, hướng dẫn cách thực hiện và yêu cầu sản phẩm.
     b) Tổ chức cho học sinh thực hiện nhiệm vụ học tập (step2_performTask): Học sinh hợp tác, giúp đỡ nhau; giáo viên phát hiện khó khăn và hỗ trợ kịp thời, không "bỏ quên" học sinh nào.
     c) Tổ chức cho học sinh trình bày kết quả và thảo luận (step3_presentAndDiscuss): Hình thức trình bày, kĩ thuật dạy học tích cực, trao đổi thảo luận và xử lý tình huống sư phạm.
     d) Nhận xét, đánh giá thực hiện nhiệm vụ học tập (step4_evaluateAndConclude): Phân tích, nhận xét, đánh giá kết quả và chính xác hóa kiến thức.
   - Đồng thời cung cấp danh sách tóm tắt "teacherActions" (Hoạt động của Giáo viên) và "studentActions" (Hoạt động của Học sinh) để hiển thị trên bảng giáo án 2 cột truyền thống.
4. Phần "4. Đánh giá và Điều chỉnh sau bài dạy":
   - Xây dựng bảng tiêu chí đánh giá thường xuyên theo Thông tư 27/2020/TT-BGDĐT (gồm Tiêu chí, Mức Hoàn thành tốt, Mức Hoàn thành, Mức Cần hỗ trợ, Phương pháp & công cụ đánh giá).
   - Xây dựng gợi ý sâu sắc cho mục "Điều chỉnh sau bài dạy (nếu có)": Những bất cập/khó khăn thường gặp ở bài học này cần lưu ý, nội dung tâm đắc để chia sẻ trong sinh hoạt chuyên môn, và phương án dạy học phân hóa cho học sinh tiếp thu nhanh / học sinh cần hỗ trợ.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Bạn là chuyên gia sư phạm cấp Tiểu học hàng đầu tại Việt Nam. Bạn soạn Kế hoạch bài dạy (giáo án) cực kỳ chi tiết, giàu tính thực tiễn, câu chữ chuẩn mực hành chính - sư phạm theo đúng Phụ lục 3 Công văn 2345/BGDĐT-GDTH.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              header: {
                type: Type.OBJECT,
                properties: {
                  subject: { type: Type.STRING },
                  grade: { type: Type.STRING },
                  lessonTitle: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  executionDate: { type: Type.STRING },
                  textbook: { type: Type.STRING },
                  lessonType: { type: Type.STRING },
                },
                required: [
                  'subject',
                  'grade',
                  'lessonTitle',
                  'duration',
                  'executionDate',
                  'textbook',
                  'lessonType',
                ],
              },
              section1_objectives: {
                type: Type.OBJECT,
                properties: {
                  specificCompetencies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  generalCompetencies: {
                    type: Type.OBJECT,
                    properties: {
                      autonomyAndLearning: { type: Type.STRING },
                      communicationAndCollaboration: { type: Type.STRING },
                      problemSolvingAndCreativity: { type: Type.STRING },
                    },
                    required: [
                      'autonomyAndLearning',
                      'communicationAndCollaboration',
                      'problemSolvingAndCreativity',
                    ],
                  },
                  qualities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  integratedContent: { type: Type.STRING },
                },
                required: [
                  'specificCompetencies',
                  'generalCompetencies',
                  'qualities',
                  'integratedContent',
                ],
              },
              section2_teachingAids: {
                type: Type.OBJECT,
                properties: {
                  teacherPreparation: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  studentPreparation: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['teacherPreparation', 'studentPreparation'],
              },
              section3_activities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: {
                      type: Type.STRING,
                      description:
                        'Must be one of: khoi_dong, kham_pha, luyen_tap, van_dung',
                    },
                    title: { type: Type.STRING },
                    durationMinutes: { type: Type.INTEGER },
                    objective: { type: Type.STRING },
                    organizationForm: { type: Type.STRING },
                    teachingMethod: { type: Type.STRING },
                    steps: {
                      type: Type.OBJECT,
                      properties: {
                        step1_transferTask: { type: Type.STRING },
                        step2_performTask: { type: Type.STRING },
                        step3_presentAndDiscuss: { type: Type.STRING },
                        step4_evaluateAndConclude: { type: Type.STRING },
                      },
                      required: [
                        'step1_transferTask',
                        'step2_performTask',
                        'step3_presentAndDiscuss',
                        'step4_evaluateAndConclude',
                      ],
                    },
                    teacherActions: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    studentActions: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    expectedProducts: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'type',
                    'title',
                    'durationMinutes',
                    'objective',
                    'organizationForm',
                    'teachingMethod',
                    'steps',
                    'teacherActions',
                    'studentActions',
                    'expectedProducts',
                  ],
                },
              },
              section4_assessmentAndAdjustment: {
                type: Type.OBJECT,
                properties: {
                  assessmentCriteria: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        criterion: { type: Type.STRING },
                        levelGood: { type: Type.STRING },
                        levelCompleted: { type: Type.STRING },
                        levelNeedsSupport: { type: Type.STRING },
                        methodAndTool: { type: Type.STRING },
                      },
                      required: [
                        'criterion',
                        'levelGood',
                        'levelCompleted',
                        'levelNeedsSupport',
                        'methodAndTool',
                      ],
                    },
                  },
                  postLessonAdjustments: {
                    type: Type.OBJECT,
                    properties: {
                      inadequaciesAndDifficulties: { type: Type.STRING },
                      effectiveHighlights: { type: Type.STRING },
                      differentiationNotes: { type: Type.STRING },
                    },
                    required: [
                      'inadequaciesAndDifficulties',
                      'effectiveHighlights',
                      'differentiationNotes',
                    ],
                  },
                },
                required: ['assessmentCriteria', 'postLessonAdjustments'],
              },
            },
            required: [
              'header',
              'section1_objectives',
              'section2_teachingAids',
              'section3_activities',
              'section4_assessmentAndAdjustment',
            ],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error('Không nhận được phản hồi từ mô hình AI.');
      }

      const parsed = JSON.parse(rawText.trim());
      const completePlan = {
        id: `khbd-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...parsed,
      };

      res.json({ lessonPlan: completePlan });
    } catch (error: unknown) {
      console.error('Error generating lesson plan:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Đã xảy ra lỗi trong quá trình AI soạn kế hoạch bài dạy.';
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
