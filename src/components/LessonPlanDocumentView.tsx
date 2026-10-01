import React from 'react';
import { LessonPlan2345, TeachingActivity2345 } from '../types/lessonPlan';
import { Clock, Edit3, Check } from 'lucide-react';

export type DocumentViewMode = 'document_2col' | 'steps_4' | 'assessment';

interface LessonPlanDocumentViewProps {
  plan: LessonPlan2345;
  viewMode: DocumentViewMode;
  useSerifFont: boolean;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdatePlan: (updated: LessonPlan2345) => void;
}

const PHASE_LABELS: Record<string, { number: string; badgeText: string }> = {
  khoi_dong: {
    number: 'Hoạt động 1',
    badgeText: 'Mở đầu: Khởi động, kết nối',
  },
  kham_pha: {
    number: 'Hoạt động 2',
    badgeText: 'Hình thành kiến thức mới: Trải nghiệm, khám phá',
  },
  luyen_tap: {
    number: 'Hoạt động 3',
    badgeText: 'Luyện tập, thực hành',
  },
  van_dung: {
    number: 'Hoạt động 4',
    badgeText: 'Vận dụng, trải nghiệm',
  },
};

export const LessonPlanDocumentView: React.FC<LessonPlanDocumentViewProps> = ({
  plan,
  viewMode,
  useSerifFont,
  isEditing,
  onToggleEdit,
  onUpdatePlan,
}) => {
  const totalMinutes = plan.section3_activities.reduce(
    (sum, act) => sum + (Number(act.durationMinutes) || 0),
    0
  );

  const handleActivityChange = (
    index: number,
    updater: (act: TeachingActivity2345) => TeachingActivity2345
  ) => {
    const nextActivities = plan.section3_activities.map((act, i) =>
      i === index ? updater(act) : act
    );
    onUpdatePlan({
      ...plan,
      section3_activities: nextActivities,
    });
  };

  const handlePostAdjustmentChange = (
    field: keyof LessonPlan2345['section4_assessmentAndAdjustment']['postLessonAdjustments'],
    value: string
  ) => {
    onUpdatePlan({
      ...plan,
      section4_assessmentAndAdjustment: {
        ...plan.section4_assessmentAndAdjustment,
        postLessonAdjustments: {
          ...plan.section4_assessmentAndAdjustment.postLessonAdjustments,
          [field]: value,
        },
      },
    });
  };

  return (
    <div
      className={`print-only-container rounded-xl border border-slate-200 bg-white p-6 sm:p-10 ${
        useSerifFont ? 'font-serif-doc text-[15.5px] leading-relaxed' : 'font-sans text-[15px] leading-relaxed'
      }`}
    >
      {/* Official Administrative Document Header (Phụ lục 3 - Công văn 2345) */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 no-print mb-4 font-sans">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>Phụ lục 3 · Công văn 2345/BGDĐT-GDTH</span>
            <span aria-hidden="true">·</span>
            <span>{plan.header.textbook}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num">Tổng thời lượng: {totalMinutes} phút</span>
          </div>
          <button
            onClick={onToggleEdit}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              isEditing
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Hoàn tất chỉnh sửa
              </>
            ) : (
              <>
                <Edit3 className="h-3.5 w-3.5" />
                Chỉnh sửa trực tiếp
              </>
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs font-medium tracking-wide text-slate-500">
            KHUNG KẾ HOẠCH BÀI DẠY (KÈM THEO CÔNG VĂN SỐ 2345/BGDĐT-GDTH)
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            KẾ HOẠCH BÀI DẠY
          </h1>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-y-2 text-slate-800 sm:grid-cols-2 sm:gap-x-6">
          <p>
            <strong className="font-semibold text-slate-900">
              Môn học/hoạt động giáo dục:
            </strong>{' '}
            {plan.header.subject}
          </p>
          <p>
            <strong className="font-semibold text-slate-900">Lớp:</strong>{' '}
            {plan.header.grade}
          </p>
          <p className="sm:col-span-2">
            <strong className="font-semibold text-slate-900">Tên bài học:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={plan.header.lessonTitle}
                onChange={(e) =>
                  onUpdatePlan({
                    ...plan,
                    header: { ...plan.header, lessonTitle: e.target.value },
                  })
                }
                className="mt-1 w-full rounded border border-sky-300 bg-sky-50/40 px-2.5 py-1 text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            ) : (
              <span className="font-semibold text-sky-950">{plan.header.lessonTitle}</span>
            )}
          </p>
          <p>
            <strong className="font-semibold text-slate-900">Số tiết / Thời lượng:</strong>{' '}
            <span className="font-mono-num">{plan.header.duration}</span>
          </p>
          <p>
            <strong className="font-semibold text-slate-900">Thời gian thực hiện:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={plan.header.executionDate}
                onChange={(e) =>
                  onUpdatePlan({
                    ...plan,
                    header: { ...plan.header, executionDate: e.target.value },
                  })
                }
                className="rounded border border-sky-300 bg-sky-50/40 px-2 py-0.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            ) : (
              plan.header.executionDate
            )}
          </p>
        </div>
      </div>

      {/* MODE 1 & MODE 2 both show Section 1 (Yêu cầu cần đạt) & Section 2 (Đồ dùng dạy học) */}
      {viewMode !== 'assessment' && (
        <>
          {/* SECTION 1: YÊU CẦU CẦN ĐẠT */}
          <section className="mt-7 border-b border-slate-200 pb-6">
            <h2 className="text-lg font-bold text-slate-900">
              1. Yêu cầu cần đạt
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 font-sans">
              Xác định rõ học sinh thực hiện được việc gì; vận dụng vào thực tế cuộc sống; cơ hội hình thành và phát triển phẩm chất, năng lực.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  a) Năng lực đặc thù:
                </h3>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={plan.section1_objectives.specificCompetencies.join('\n')}
                    onChange={(e) =>
                      onUpdatePlan({
                        ...plan,
                        section1_objectives: {
                          ...plan.section1_objectives,
                          specificCompetencies: e.target.value
                            .split('\n')
                            .filter((line) => line.trim() !== ''),
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                ) : (
                  <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-slate-800">
                    {plan.section1_objectives.specificCompetencies.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  b) Năng lực chung:
                </h3>
                <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-slate-800">
                  <li>
                    <strong className="font-medium text-slate-900">
                      Năng lực tự chủ và tự học:
                    </strong>{' '}
                    {plan.section1_objectives.generalCompetencies.autonomyAndLearning}
                  </li>
                  <li>
                    <strong className="font-medium text-slate-900">
                      Năng lực giao tiếp và hợp tác:
                    </strong>{' '}
                    {plan.section1_objectives.generalCompetencies.communicationAndCollaboration}
                  </li>
                  <li>
                    <strong className="font-medium text-slate-900">
                      Năng lực giải quyết vấn đề và sáng tạo:
                    </strong>{' '}
                    {plan.section1_objectives.generalCompetencies.problemSolvingAndCreativity}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  c) Phẩm chất chủ yếu:
                </h3>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={plan.section1_objectives.qualities.join('\n')}
                    onChange={(e) =>
                      onUpdatePlan({
                        ...plan,
                        section1_objectives: {
                          ...plan.section1_objectives,
                          qualities: e.target.value
                            .split('\n')
                            .filter((line) => line.trim() !== ''),
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                ) : (
                  <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-slate-800">
                    {plan.section1_objectives.qualities.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                )}
              </div>

              {plan.section1_objectives.integratedContent && (
                <div>
                  <h3 className="font-semibold text-slate-900">
                    d) Nội dung tích hợp / liên môn:
                  </h3>
                  <p className="mt-1 text-slate-800">
                    {plan.section1_objectives.integratedContent}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: ĐỒ DÙNG DẠY HỌC */}
          <section className="mt-7 border-b border-slate-200 pb-6">
            <h2 className="text-lg font-bold text-slate-900">
              2. Đồ dùng dạy học
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-900">
                  a) Đối với giáo viên:
                </h3>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={plan.section2_teachingAids.teacherPreparation.join('\n')}
                    onChange={(e) =>
                      onUpdatePlan({
                        ...plan,
                        section2_teachingAids: {
                          ...plan.section2_teachingAids,
                          teacherPreparation: e.target.value
                            .split('\n')
                            .filter((line) => line.trim() !== ''),
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                ) : (
                  <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-slate-800">
                    {plan.section2_teachingAids.teacherPreparation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  b) Đối với học sinh:
                </h3>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={plan.section2_teachingAids.studentPreparation.join('\n')}
                    onChange={(e) =>
                      onUpdatePlan({
                        ...plan,
                        section2_teachingAids: {
                          ...plan.section2_teachingAids,
                          studentPreparation: e.target.value
                            .split('\n')
                            .filter((line) => line.trim() !== ''),
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                ) : (
                  <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-slate-800">
                    {plan.section2_teachingAids.studentPreparation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SECTION 3: CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU */}
      {viewMode === 'document_2col' && (
        <section className="mt-7 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              3. Các hoạt động dạy học chủ yếu
            </h2>
            <span className="font-sans text-xs text-slate-500">
              Chuỗi 4 hoạt động: Khởi động · Khám phá · Luyện tập · Vận dụng
            </span>
          </div>

          <div className="mt-5 space-y-8">
            {plan.section3_activities.map((act, idx) => {
              const phaseMeta = PHASE_LABELS[act.type] || {
                number: `Hoạt động ${idx + 1}`,
                badgeText: act.title,
              };
              return (
                <div key={act.id || idx} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <p className="font-sans text-xs font-medium text-sky-800">
                        {phaseMeta.number} · {phaseMeta.badgeText}
                      </p>
                      <h3 className="text-base font-bold text-slate-900">
                        {act.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono-num text-xs text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{act.durationMinutes} phút</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-slate-800">
                    <p>
                      <strong className="font-semibold text-slate-900">
                        a) Mục tiêu:
                      </strong>{' '}
                      {isEditing ? (
                        <input
                          type="text"
                          value={act.objective}
                          onChange={(e) =>
                            handleActivityChange(idx, (prev) => ({
                              ...prev,
                              objective: e.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded border border-sky-300 bg-sky-50/30 px-2.5 py-1 text-sm text-slate-900"
                        />
                      ) : (
                        act.objective
                      )}
                    </p>
                    <p>
                      <strong className="font-semibold text-slate-900">
                        b) Cách thức tiến hành:
                      </strong>{' '}
                      {act.organizationForm} ·{' '}
                      <span className="italic text-slate-600">
                        Phương pháp/Kĩ thuật: {act.teachingMethod}
                      </span>
                    </p>
                  </div>

                  {/* Two-column standard table: Hoạt động của Giáo viên | Hoạt động của Học sinh */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-slate-900">
                          <th className="w-1/2 border border-slate-300 px-4 py-2.5 font-semibold">
                            Hoạt động của Giáo viên
                          </th>
                          <th className="w-1/2 border border-slate-300 px-4 py-2.5 font-semibold">
                            Hoạt động của Học sinh
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="align-top border border-slate-300 p-4 space-y-3 text-slate-800">
                            <div>
                              <p className="font-semibold text-slate-900">
                                1. Chuyển giao nhiệm vụ học tập:
                              </p>
                              {isEditing ? (
                                <textarea
                                  rows={3}
                                  value={act.steps.step1_transferTask}
                                  onChange={(e) =>
                                    handleActivityChange(idx, (prev) => ({
                                      ...prev,
                                      steps: {
                                        ...prev.steps,
                                        step1_transferTask: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded border border-sky-300 bg-sky-50/30 p-2 text-sm"
                                />
                              ) : (
                                <p className="mt-1 whitespace-pre-line">
                                  {act.steps.step1_transferTask}
                                </p>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                2. Hướng dẫn, hỗ trợ thực hiện:
                              </p>
                              <ul className="mt-1 list-disc space-y-1 pl-4">
                                {act.teacherActions.map((t, tIdx) => (
                                  <li key={tIdx}>{t}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                3. Nhận xét, đánh giá và chuẩn hóa:
                              </p>
                              {isEditing ? (
                                <textarea
                                  rows={3}
                                  value={act.steps.step4_evaluateAndConclude}
                                  onChange={(e) =>
                                    handleActivityChange(idx, (prev) => ({
                                      ...prev,
                                      steps: {
                                        ...prev.steps,
                                        step4_evaluateAndConclude: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded border border-sky-300 bg-sky-50/30 p-2 text-sm"
                                />
                              ) : (
                                <p className="mt-1 whitespace-pre-line">
                                  {act.steps.step4_evaluateAndConclude}
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="align-top border border-slate-300 p-4 space-y-3 text-slate-800">
                            <div>
                              <p className="font-semibold text-slate-900">
                                1. Thực hiện nhiệm vụ học tập:
                              </p>
                              {isEditing ? (
                                <textarea
                                  rows={3}
                                  value={act.steps.step2_performTask}
                                  onChange={(e) =>
                                    handleActivityChange(idx, (prev) => ({
                                      ...prev,
                                      steps: {
                                        ...prev.steps,
                                        step2_performTask: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded border border-sky-300 bg-sky-50/30 p-2 text-sm"
                                />
                              ) : (
                                <p className="mt-1 whitespace-pre-line">
                                  {act.steps.step2_performTask}
                                </p>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                2. Trình bày kết quả và thảo luận:
                              </p>
                              {isEditing ? (
                                <textarea
                                  rows={3}
                                  value={act.steps.step3_presentAndDiscuss}
                                  onChange={(e) =>
                                    handleActivityChange(idx, (prev) => ({
                                      ...prev,
                                      steps: {
                                        ...prev.steps,
                                        step3_presentAndDiscuss: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded border border-sky-300 bg-sky-50/30 p-2 text-sm"
                                />
                              ) : (
                                <p className="mt-1 whitespace-pre-line">
                                  {act.steps.step3_presentAndDiscuss}
                                </p>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                3. Sản phẩm học tập / Tiêu chí đánh giá:
                              </p>
                              <p className="mt-1 text-slate-700">
                                {act.expectedProducts}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* MODE 2: CHI TIẾT 4 BƯỚC TỔ CHỨC HOẠT ĐỘNG HỌC TẬP (MỤC 4 PHẦN A PHỤ LỤC 3) */}
      {viewMode === 'steps_4' && (
        <section className="mt-7 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              3. Phân tích 4 bước tổ chức từng hoạt động dạy học (Mục 4 Phụ lục 3)
            </h2>
            <span className="font-sans text-xs text-slate-500">
              a) Chuyển giao · b) Thực hiện · c) Trình bày, thảo luận · d) Nhận xét, đánh giá
            </span>
          </div>

          <div className="mt-5 space-y-8">
            {plan.section3_activities.map((act, idx) => (
              <div
                key={act.id || idx}
                className="border-l-2 border-sky-600 pl-4 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {act.title}
                  </h3>
                  <span className="font-mono-num text-xs font-medium text-slate-600">
                    Thời lượng: {act.durationMinutes} phút · {act.organizationForm}
                  </span>
                </div>

                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Mục tiêu hoạt động:</strong>{' '}
                  {act.objective}
                </p>

                <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                  <div className="border-t border-slate-200 pt-2.5">
                    <p className="text-xs font-semibold text-sky-900">
                      Bước a) Chuyển giao nhiệm vụ học tập
                    </p>
                    <p className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                      {act.steps.step1_transferTask}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5">
                    <p className="text-xs font-semibold text-sky-900">
                      Bước b) Tổ chức cho học sinh thực hiện nhiệm vụ
                    </p>
                    <p className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                      {act.steps.step2_performTask}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5">
                    <p className="text-xs font-semibold text-sky-900">
                      Bước c) Tổ chức cho học sinh trình bày kết quả và thảo luận
                    </p>
                    <p className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                      {act.steps.step3_presentAndDiscuss}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5">
                    <p className="text-xs font-semibold text-sky-900">
                      Bước d) Nhận xét, đánh giá thực hiện nhiệm vụ học tập
                    </p>
                    <p className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                      {act.steps.step4_evaluateAndConclude}
                    </p>
                  </div>
                </div>

                <p className="pt-1 text-xs text-slate-600">
                  <strong className="text-slate-900">Sản phẩm mong đợi:</strong>{' '}
                  {act.expectedProducts}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: ĐÁNH GIÁ VÀ ĐIỀU CHỈNH SAU BÀI DẠY (Always shown at bottom of full doc or dedicated in 'assessment' view) */}
      <section className="mt-7 space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            4. Đánh giá và Điều chỉnh sau bài dạy
          </h2>
          <p className="mt-0.5 font-sans text-xs text-slate-500">
            Kết hợp tiêu chí đánh giá thường xuyên theo Thông tư 27/2020/TT-BGDĐT và ghi chú rút kinh nghiệm sau tiết dạy.
          </p>
        </div>

        {/* 4.1 Rubric Table */}
        <div>
          <h3 className="font-semibold text-slate-900">
            4.1. Phương án đánh giá thường xuyên trong bài dạy:
          </h3>
          <div className="mt-2.5 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-900">
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Tiêu chí đánh giá
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Hoàn thành tốt
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Hoàn thành
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Cần hỗ trợ thêm
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Phương pháp &amp; Công cụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {plan.section4_assessmentAndAdjustment.assessmentCriteria.map(
                  (c, idx) => (
                    <tr key={idx} className="align-top text-slate-800">
                      <td className="border border-slate-300 p-3 font-medium text-slate-900">
                        {c.criterion}
                      </td>
                      <td className="border border-slate-300 p-3">
                        {c.levelGood}
                      </td>
                      <td className="border border-slate-300 p-3">
                        {c.levelCompleted}
                      </td>
                      <td className="border border-slate-300 p-3">
                        {c.levelNeedsSupport}
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-600">
                        {c.methodAndTool}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4.2 Điều chỉnh sau bài dạy (nếu có) */}
        <div className="space-y-3 pt-2">
          <h3 className="font-semibold text-slate-900">
            4.2. Điều chỉnh sau bài dạy (nếu có):
          </h3>

          <div className="space-y-3 text-slate-800">
            <div>
              <label className="block font-medium text-slate-900">
                a) Những nội dung còn bất cập, còn gặp khó khăn trong quá trình thực hiện tổ chức dạy học:
              </label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .inadequaciesAndDifficulties
                  }
                  onChange={(e) =>
                    handlePostAdjustmentChange(
                      'inadequaciesAndDifficulties',
                      e.target.value
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900"
                />
              ) : (
                <p className="mt-1 text-slate-700">
                  {
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .inadequaciesAndDifficulties
                  }
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-slate-900">
                b) Nội dung tâm đắc, tổ chức dạy học hiệu quả để trao đổi thảo luận khi tham gia sinh hoạt chuyên môn:
              </label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .effectiveHighlights
                  }
                  onChange={(e) =>
                    handlePostAdjustmentChange(
                      'effectiveHighlights',
                      e.target.value
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900"
                />
              ) : (
                <p className="mt-1 text-slate-700">
                  {
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .effectiveHighlights
                  }
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-slate-900">
                c) Phương án dạy học phân hóa / điều chỉnh cho đối tượng học sinh cụ thể:
              </label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .differentiationNotes
                  }
                  onChange={(e) =>
                    handlePostAdjustmentChange(
                      'differentiationNotes',
                      e.target.value
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-sky-300 bg-sky-50/30 p-2.5 text-sm text-slate-900"
                />
              ) : (
                <p className="mt-1 text-slate-700">
                  {
                    plan.section4_assessmentAndAdjustment.postLessonAdjustments
                      .differentiationNotes
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
