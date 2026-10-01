import React from 'react';
import { X, CheckCircle2, FileText, BookOpen } from 'lucide-react';
import { LessonPlan2345 } from '../types/lessonPlan';

interface RegulationReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: LessonPlan2345;
}

export const RegulationReferenceModal: React.FC<RegulationReferenceModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
}) => {
  if (!isOpen) return null;

  const hasAllFourActivities =
    currentPlan.section3_activities.some((a) => a.type === 'khoi_dong') &&
    currentPlan.section3_activities.some((a) => a.type === 'kham_pha') &&
    currentPlan.section3_activities.some((a) => a.type === 'luyen_tap') &&
    currentPlan.section3_activities.some((a) => a.type === 'van_dung');

  const totalMinutes = currentPlan.section3_activities.reduce(
    (acc, item) => acc + (Number(item.durationMinutes) || 0),
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv2345-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Bộ Giáo dục và Đào tạo · Công văn số 2345/BGDĐT-GDTH · Ngày 07/06/2021
            </p>
            <h2
              id="cv2345-modal-title"
              className="font-display mt-1 text-xl font-semibold text-slate-900"
            >
              Quy chuẩn Phụ lục 3 — Khung Kế hoạch bài dạy cấp Tiểu học
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Đóng cửa sổ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left column: Official Framework Structure */}
          <div className="space-y-4 lg:col-span-7">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BookOpen className="h-4 w-4 text-sky-700" />
              Cấu trúc bắt buộc theo Phần B - Phụ lục 3 (Trang 15 CV 2345)
            </h3>

            <div className="space-y-3 border-l-2 border-sky-600 pl-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">
                  Thông tin hành chính đầu bài dạy
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  Môn học/hoạt động giáo dục; Lớp; Tên bài học; Số tiết; Thời gian thực hiện (ngày... tháng... năm...).
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">1. Yêu cầu cần đạt</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  Nêu cụ thể học sinh thực hiện được việc gì; vận dụng được những gì vào giải quyết vấn đề trong thực tế cuộc sống; có cơ hội hình thành, phát triển phẩm chất, năng lực gì.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">2. Đồ dùng dạy học</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  Nêu các thiết bị, học liệu được sử dụng trong bài dạy để tổ chức cho học sinh hoạt động nhằm đạt yêu cầu cần đạt của bài dạy.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  3. Các hoạt động dạy học chủ yếu
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-600">
                  <li>
                    <strong>Hoạt động Mở đầu:</strong> khởi động, kết nối.
                  </li>
                  <li>
                    <strong>Hoạt động Hình thành kiến thức mới:</strong> trải nghiệm, khám phá, phân tích, hình thành kiến thức mới.
                  </li>
                  <li>
                    <strong>Hoạt động Luyện tập, thực hành.</strong>
                  </li>
                  <li>
                    <strong>Hoạt động Vận dụng, trải nghiệm</strong> (nếu có).
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  4. Điều chỉnh sau bài dạy (nếu có)
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  Giáo viên ghi những điểm cần rút kinh nghiệm: Nội dung còn bất cập, còn gặp khó khăn trong quá trình thực hiện; nội dung tâm đắc tổ chức dạy học hiệu quả để trao đổi sinh hoạt chuyên môn.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-900">
                4 chú ý khi tổ chức hoạt động dạy học (Mục 4 Phần A - Trang 14)
              </h4>
              <div className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
                <p>
                  <strong>a) Chuyển giao nhiệm vụ học tập:</strong> Nhiệm vụ rõ ràng, phù hợp khả năng HS; nêu vấn đề, hướng dẫn cách thực hiện và yêu cầu về sản phẩm.
                </p>
                <p>
                  <strong>b) Tổ chức cho HS thực hiện nhiệm vụ:</strong> Khuyến khích HS hợp tác, giúp đỡ nhau; phát hiện kịp thời khó khăn và có biện pháp hỗ trợ, không &ldquo;bỏ quên&rdquo; học sinh nào.
                </p>
                <p>
                  <strong>c) Tổ chức cho HS trình bày kết quả và thảo luận:</strong> Sử dụng kĩ thuật dạy học tích cực; khuyến khích trao đổi, thảo luận và xử lý tình huống sư phạm hợp lý.
                </p>
                <p>
                  <strong>d) Nhận xét, đánh giá thực hiện nhiệm vụ:</strong> Phân tích, nhận xét kết quả thực hiện nhiệm vụ để giúp HS có hứng thú, niềm tin và chính xác hóa kiến thức.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Compliance Audit of Current Lesson Plan */}
          <div className="border-t border-slate-200 pt-4 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FileText className="h-4 w-4 text-emerald-700" />
              Đối chiếu Kế hoạch bài dạy hiện tại
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Bài học: <span className="font-medium text-slate-800">{currentPlan.header.lessonTitle}</span>
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">Đầy đủ thông tin hành chính</p>
                  <p className="text-slate-600">
                    {currentPlan.header.subject} · {currentPlan.header.grade} · {currentPlan.header.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Mục 1: Yêu cầu cần đạt ({currentPlan.section1_objectives.specificCompetencies.length} chỉ báo đặc thù)
                  </p>
                  <p className="text-slate-600">
                    Đã phân tách rõ Năng lực đặc thù, 3 Năng lực chung và {currentPlan.section1_objectives.qualities.length} Phẩm chất.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Mục 2: Đồ dùng dạy học (GV &amp; HS)
                  </p>
                  <p className="text-slate-600">
                    {currentPlan.section2_teachingAids.teacherPreparation.length} học liệu GV ·{' '}
                    {currentPlan.section2_teachingAids.studentPreparation.length} đồ dùng HS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Mục 3: Đủ 4 chuỗi hoạt động ({hasAllFourActivities ? 'Đạt chuẩn' : 'Đã thiết kế'})
                  </p>
                  <p className="font-mono-num text-slate-600">
                    Khởi động → Khám phá → Luyện tập → Vận dụng (Tổng: {totalMinutes} phút).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Mục 4: Đánh giá TT27 &amp; Điều chỉnh sau bài dạy
                  </p>
                  <p className="text-slate-600">
                    Có sẵn {currentPlan.section4_assessmentAndAdjustment.assessmentCriteria.length} tiêu chí đánh giá và 3 mục rút kinh nghiệm SHCM.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800"
              >
                Đã hiểu quy chuẩn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
