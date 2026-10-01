/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  Wand2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Trash2,
  Search,
  AlertCircle,
  Loader2,
  FileDown,
} from 'lucide-react';
import {
  LessonPlan2345,
  LessonPlanInputForm,
} from './types/lessonPlan';
import {
  SUBJECT_GROUPS_2018,
  SUBJECT_OPTIONS,
  GRADE_OPTIONS,
  DURATION_OPTIONS,
  TEXTBOOK_OPTIONS,
  LESSON_TYPE_OPTIONS,
  QUICK_PRESETS,
  INITIAL_SAMPLE_PLANS,
} from './data/sampleLessonPlans';
import {
  formatLessonPlanAsPlainText,
  downloadWordFile,
  downloadTextFile,
} from './utils/exportLessonPlan';
import {
  LessonPlanDocumentView,
  DocumentViewMode,
} from './components/LessonPlanDocumentView';
import { RegulationReferenceModal } from './components/RegulationReferenceModal';

const STORAGE_KEY = 'soan_giang_2345_saved_plans_v1';

type ActiveWorkspaceTab = 'editor' | 'library' | 'presets';

export default function App() {
  // Saved plans state (hydrated from localStorage or seeded with initial sample)
  const [savedPlans, setSavedPlans] = useState<LessonPlan2345[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default sample
    }
    return INITIAL_SAMPLE_PLANS;
  });

  // Currently displayed lesson plan
  const [currentPlan, setCurrentPlan] = useState<LessonPlan2345>(
    () => savedPlans[0] || INITIAL_SAMPLE_PLANS[0]
  );

  // Input form state (5 core inputs requested by user + optional pedagogical settings)
  const [form, setForm] = useState<LessonPlanInputForm>(QUICK_PRESETS[0].form);
  const [isCustomSubject, setIsCustomSubject] = useState<boolean>(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

  // Navigation & view states
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('editor');
  const [viewMode, setViewMode] = useState<DocumentViewMode>('document_2col');
  const [useSerifFont, setUseSerifFont] = useState<boolean>(true);
  const [isEditingDoc, setIsEditingDoc] = useState<boolean>(false);
  const [isRegulationModalOpen, setIsRegulationModalOpen] = useState<boolean>(false);

  // AI Generation & Suggestion states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStepText, setGenerationStepText] = useState<string>('');
  const [isSuggestingObjectives, setIsSuggestingObjectives] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Copy & Export feedback
  const [copiedState, setCopiedState] = useState<boolean>(false);

  // Library search & filter
  const [librarySearch, setLibrarySearch] = useState<string>('');
  const [libraryGradeFilter, setLibraryGradeFilter] = useState<string>('all');

  // Sync savedPlans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlans));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedPlans]);

  // Look up current subject metadata from SUBJECT_GROUPS_2018
  const selectedSubjectMeta = React.useMemo(() => {
    for (const group of SUBJECT_GROUPS_2018) {
      const found = group.subjects.find((s) => s.name === form.subject);
      if (found) return found;
    }
    return null;
  }, [form.subject]);

  const handleUpdateCurrentPlan = (updated: LessonPlan2345) => {
    setCurrentPlan(updated);
    setSavedPlans((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleSelectPreset = (presetId: string) => {
    const found = QUICK_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setForm(found.form);
      setIsCustomSubject(!SUBJECT_OPTIONS.includes(found.form.subject));
      setErrorMessage(null);
      setActiveTab('editor');
    }
  };

  const handleSuggestObjectives = async () => {
    if (!form.subject.trim() || !form.grade.trim() || !form.lessonTitle.trim()) {
      setErrorMessage(
        'Vui lòng nhập Môn học, Lớp và Tên bài học trước khi nhờ AI gợi ý Yêu cầu cần đạt.'
      );
      return;
    }

    setErrorMessage(null);
    setIsSuggestingObjectives(true);

    try {
      const response = await fetch('/api/lesson-plan/suggest-objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: form.subject,
          grade: form.grade,
          lessonTitle: form.lessonTitle,
          duration: form.duration,
          textbook: form.textbook,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Không thể gợi ý Yêu cầu cần đạt lúc này.');
      }

      if (data.objectives) {
        setForm((prev) => ({ ...prev, objectives: data.objectives }));
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Lỗi kết nối khi gợi ý Yêu cầu cần đạt.'
      );
    } finally {
      setIsSuggestingObjectives(false);
    }
  };

  const handleGenerateLessonPlan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.subject.trim() || !form.grade.trim() || !form.lessonTitle.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Môn học, Lớp và Tên bài học.');
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);
    setIsEditingDoc(false);
    setGenerationStepText(
      'Đang phân tích Yêu cầu cần đạt và thiết kế chuỗi 4 hoạt động (Khởi động, Khám phá, Luyện tập, Vận dụng) theo Công văn 2345...'
    );

    try {
      const response = await fetch('/api/lesson-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || 'Đã xảy ra lỗi khi soạn kế hoạch bài dạy.'
        );
      }

      if (data.lessonPlan) {
        const newPlan: LessonPlan2345 = data.lessonPlan;
        setCurrentPlan(newPlan);
        setSavedPlans((prev) => [newPlan, ...prev]);
        setActiveTab('editor');
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Không thể kết nối tới máy chủ AI. Vui lòng thử lại.'
      );
    } finally {
      setIsGenerating(false);
      setGenerationStepText('');
    }
  };

  const handleCopyContent = async () => {
    try {
      const text = formatLessonPlanAsPlainText(currentPlan);
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formatLessonPlanAsPlainText(currentPlan);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    }
  };

  const handleDeleteSavedPlan = (id: string) => {
    setSavedPlans((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (currentPlan.id === id && filtered.length > 0) {
        setCurrentPlan(filtered[0]);
      }
      return filtered;
    });
  };

  const filteredSavedPlans = savedPlans.filter((plan) => {
    const matchesGrade =
      libraryGradeFilter === 'all' || plan.header.grade === libraryGradeFilter;
    const q = librarySearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      plan.header.lessonTitle.toLowerCase().includes(q) ||
      plan.header.subject.toLowerCase().includes(q) ||
      plan.header.grade.toLowerCase().includes(q);
    return matchesGrade && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-3.5 backdrop-blur-xs">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('editor');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
        >
          Soạn Giảng 2345
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-1 transition-colors whitespace-nowrap ${
              activeTab === 'editor'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8'
                : 'hover:text-slate-900'
            }`}
          >
            Soạn giáo án
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`py-1 transition-colors whitespace-nowrap ${
              activeTab === 'library'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8'
                : 'hover:text-slate-900'
            }`}
          >
            Thư viện đã lưu ({savedPlans.length})
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-1 transition-colors whitespace-nowrap ${
              activeTab === 'presets'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8'
                : 'hover:text-slate-900'
            }`}
          >
            Mẫu bài dạy ({QUICK_PRESETS.length})
          </button>
          <button
            onClick={() => setIsRegulationModalOpen(true)}
            className="py-1 transition-colors hover:text-slate-900 whitespace-nowrap"
          >
            Quy chuẩn CV 2345
          </button>
        </nav>

        {/* Zone 3: 2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyContent}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap"
          >
            {copiedState ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy nội dung</span>
              </>
            )}
          </button>

          <button
            onClick={() => downloadWordFile(currentPlan)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Xuất file Word</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="no-print flex md:hidden items-center justify-around border-b border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-2 py-1 rounded ${
            activeTab === 'editor' ? 'bg-slate-100 text-slate-900 font-semibold' : ''
          }`}
        >
          Soạn giáo án
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-2 py-1 rounded ${
            activeTab === 'library' ? 'bg-slate-100 text-slate-900 font-semibold' : ''
          }`}
        >
          Đã lưu ({savedPlans.length})
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`px-2 py-1 rounded ${
            activeTab === 'presets' ? 'bg-slate-100 text-slate-900 font-semibold' : ''
          }`}
        >
          Mẫu gợi ý
        </button>
        <button
          onClick={() => setIsRegulationModalOpen(true)}
          className="px-2 py-1 rounded text-sky-700"
        >
          CV 2345
        </button>
      </div>

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* TAB 1: EDITOR WORKSPACE */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* LEFT PANEL: Input Form for Lesson Plan Generation */}
            <aside className="no-print lg:col-span-5 xl:col-span-4 rounded-xl border border-slate-200 bg-white p-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs text-slate-500">
                  Phụ lục 3 · Công văn 2345/BGDĐT-GDTH · CT GDPT 2018
                </p>
                <h2 className="font-display mt-1 text-xl font-semibold text-slate-900">
                  Thông tin Kế hoạch bài dạy
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Đầy đủ các môn học và hoạt động giáo dục theo Chương trình GDPT 2018 (Thông tư 32/2018/TT-BGDĐT).
                </p>
              </div>

              {/* Quick Sample Presets Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Nạp nhanh bài mẫu theo môn:</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('presets')}
                    className="text-sky-700 hover:underline font-medium"
                  >
                    Xem đủ {QUICK_PRESETS.length} môn ({'>'})
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PRESETS.slice(0, 6).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-900 truncate max-w-full"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleGenerateLessonPlan} className="mt-5 space-y-4">
                {/* Row 1: Môn học (Full CT GDPT 2018 Selector) & Lớp */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="input-subject"
                        className="block text-xs font-semibold text-slate-800"
                      >
                        Môn học / Hoạt động giáo dục (CT GDPT 2018){' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomSubject((prev) => !prev);
                          if (isCustomSubject && !SUBJECT_OPTIONS.includes(form.subject)) {
                            setForm((prev) => ({ ...prev, subject: SUBJECT_OPTIONS[0] }));
                          }
                        }}
                        className="text-xs text-sky-700 hover:underline"
                      >
                        {isCustomSubject ? 'Chọn từ danh mục CT 2018' : 'Tự nhập tên khác'}
                      </button>
                    </div>

                    {!isCustomSubject ? (
                      <select
                        id="input-subject"
                        value={form.subject}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                      >
                        {SUBJECT_GROUPS_2018.map((group) => (
                          <optgroup key={group.groupName} label={group.groupName}>
                            {group.subjects.map((subj) => (
                              <option key={subj.name} value={subj.name}>
                                {subj.name} ({subj.grades})
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    ) : (
                      <input
                        id="input-subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        placeholder="Nhập tên môn học / hoạt động giáo dục..."
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                      />
                    )}

                    {selectedSubjectMeta && (
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        <span>{selectedSubjectMeta.grades}</span>
                        <span aria-hidden="true"> · </span>
                        <span>Trọng tâm: {selectedSubjectMeta.specificCompetenciesHint}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 1b: Lớp & Thời lượng */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="input-grade"
                        className="block text-xs font-semibold text-slate-800"
                      >
                        Lớp <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="input-grade"
                        value={form.grade}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, grade: e.target.value }))
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                      >
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="input-duration"
                        className="block text-xs font-semibold text-slate-800"
                      >
                        Thời lượng <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="input-duration"
                        list="duration-datalist"
                        type="text"
                        required
                        value={form.duration}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, duration: e.target.value }))
                        }
                        placeholder="VD: 1 tiết (35 phút)"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                      />
                      <datalist id="duration-datalist">
                        {DURATION_OPTIONS.map((d) => (
                          <option key={d} value={d} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Row 2: Tên bài học */}
                <div>
                  <label
                    htmlFor="input-lesson-title"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Tên bài học / Chủ đề <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="input-lesson-title"
                    type="text"
                    required
                    value={form.lessonTitle}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, lessonTitle: e.target.value }))
                    }
                    placeholder="VD: Bài 53: Khái niệm phân số (Tiết 1)"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                  />
                </div>

                {/* Row 3: Yêu cầu cần đạt + AI Auto-Suggest button */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="input-objectives"
                      className="block text-xs font-semibold text-slate-800"
                    >
                      Yêu cầu cần đạt
                    </label>
                    <button
                      type="button"
                      onClick={handleSuggestObjectives}
                      disabled={isSuggestingObjectives || isGenerating}
                      className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800 transition-colors hover:bg-sky-100 disabled:opacity-50 whitespace-nowrap"
                    >
                      {isSuggestingObjectives ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Đang gợi ý...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-3 w-3" />
                          <span>Gợi ý chuẩn CT 2018</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    id="input-objectives"
                    rows={5}
                    value={form.objectives}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, objectives: e.target.value }))
                    }
                    placeholder="Nêu cụ thể học sinh thực hiện được việc gì; vận dụng vào giải quyết vấn đề thực tế; cơ hội hình thành phẩm chất, năng lực gì (Có thể bấm 'Gợi ý chuẩn CT 2018' để AI điền giúp)..."
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/15"
                  />
                </div>

                {/* Expandable Advanced Pedagogical Parameters */}
                <div className="border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedOptions((prev) => !prev)}
                    className="flex w-full items-center justify-between text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    <span>Tùy chọn bộ sách &amp; phương pháp sư phạm</span>
                    {showAdvancedOptions ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {showAdvancedOptions && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <label
                          htmlFor="input-textbook"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Bộ sách giáo khoa
                        </label>
                        <select
                          id="input-textbook"
                          value={form.textbook}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              textbook: e.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                        >
                          {TEXTBOOK_OPTIONS.map((tb) => (
                            <option key={tb} value={tb}>
                              {tb}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="input-lesson-type"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Tính chất bài học
                        </label>
                        <select
                          id="input-lesson-type"
                          value={form.lessonType}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              lessonType: e.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                        >
                          {LESSON_TYPE_OPTIONS.map((lt) => (
                            <option key={lt} value={lt}>
                              {lt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="input-exec-date"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Thời gian thực hiện
                        </label>
                        <input
                          id="input-exec-date"
                          type="text"
                          value={form.executionDate}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              executionDate: e.target.value,
                            }))
                          }
                          placeholder="VD: Ngày 15 tháng 01 năm 2026"
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="input-pedagogical-focus"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Kĩ thuật dạy học tích cực ưu tiên
                        </label>
                        <input
                          id="input-pedagogical-focus"
                          type="text"
                          value={form.pedagogicalFocus}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              pedagogicalFocus: e.target.value,
                            }))
                          }
                          placeholder="VD: Thảo luận nhóm đôi, Khăn trải bàn, Trò chơi..."
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Submit CTA: 'Soạn giáo án' */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 disabled:opacity-60 whitespace-nowrap"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Đang soạn Kế hoạch bài dạy...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      <span>Soạn giáo án</span>
                    </>
                  )}
                </button>
              </form>
            </aside>

            {/* RIGHT PANEL: Generated Lesson Plan Document Stage */}
            <section className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Action & View Control Bar */}
              <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                {/* Segmented View Switcher */}
                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('document_2col')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      viewMode === 'document_2col'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bản chuẩn 2 cột
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('steps_4')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      viewMode === 'steps_4'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chi tiết 4 bước
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('assessment')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      viewMode === 'assessment'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đánh giá &amp; Điều chỉnh
                  </button>
                </div>

                {/* Secondary Document Actions: Font, Copy, Export Word, Export TXT, Print */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUseSerifFont((prev) => !prev)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                    title="Chuyển đổi phông chữ hành chính (Times New Roman) và phông chữ hiện đại"
                  >
                    {useSerifFont ? 'Phông: Times / Serif' : 'Phông: Sans-serif'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyContent}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    {copiedState ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã copy</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadWordFile(currentPlan)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-900 hover:bg-sky-100 whitespace-nowrap"
                  >
                    <FileDown className="h-3.5 w-3.5 text-sky-700" />
                    <span>Xuất Word (.doc)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadTextFile(currentPlan)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Xuất .txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>In / PDF</span>
                  </button>
                </div>
              </div>

              {/* Loading Skeleton State when AI is Generating */}
              {isGenerating ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                    <Loader2 className="h-6 w-6 animate-spin text-sky-700 shrink-0" />
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        AI đang biên soạn Kế hoạch bài dạy: {form.lessonTitle}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {generationStepText}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 animate-pulse">
                    <div className="h-5 w-1/3 rounded bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-3.5 w-full rounded bg-slate-100" />
                      <div className="h-3.5 w-11/12 rounded bg-slate-100" />
                      <div className="h-3.5 w-4/5 rounded bg-slate-100" />
                    </div>
                    <div className="h-5 w-2/5 rounded bg-slate-200 pt-2" />
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="h-32 rounded-lg bg-slate-100" />
                      <div className="h-32 rounded-lg bg-slate-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 rounded-lg bg-slate-100" />
                      <div className="h-32 rounded-lg bg-slate-100" />
                    </div>
                  </div>
                </div>
              ) : (
                <LessonPlanDocumentView
                  plan={currentPlan}
                  viewMode={viewMode}
                  useSerifFont={useSerifFont}
                  isEditing={isEditingDoc}
                  onToggleEdit={() => setIsEditingDoc((prev) => !prev)}
                  onUpdatePlan={handleUpdateCurrentPlan}
                />
              )}
            </section>
          </div>
        )}

        {/* TAB 2: SAVED LESSON PLANS LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs text-slate-500">
                  Lưu trữ tự động trên trình duyệt
                </p>
                <h1 className="font-display mt-1 text-2xl font-semibold text-slate-900">
                  Thư viện Kế hoạch bài dạy đã lưu
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Tìm tên bài, môn học..."
                    className="rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                  <button
                    onClick={() => setLibraryGradeFilter('all')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      libraryGradeFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả khối
                  </button>
                  {GRADE_OPTIONS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setLibraryGradeFilter(g)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        libraryGradeFilter === g
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredSavedPlans.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                <FolderOpen className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  Chưa tìm thấy Kế hoạch bài dạy phù hợp
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Hãy quay lại màn hình Soạn giáo án để tạo Kế hoạch bài dạy mới bằng AI.
                </p>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="mt-4 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800"
                >
                  Soạn giáo án mới
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredSavedPlans.map((plan) => {
                  const isCurrent = plan.id === currentPlan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`flex flex-col justify-between rounded-xl border bg-white p-5 transition-colors ${
                        isCurrent
                          ? 'border-sky-600 ring-1 ring-sky-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        {/* Zero-pill unboxed metadata with typographic separators */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                          <span className="font-medium text-sky-800">
                            {plan.header.subject}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{plan.header.grade}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-num">{plan.header.duration}</span>
                        </div>

                        <h3 className="mt-2 text-base font-semibold text-slate-900">
                          {plan.header.lessonTitle}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                          {plan.section1_objectives.specificCompetencies[0] ||
                            'Đầy đủ 4 hoạt động: Khởi động, Khám phá, Luyện tập, Vận dụng.'}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCurrentPlan(plan);
                              setActiveTab('editor');
                            }}
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                          >
                            Mở giáo án
                          </button>
                          <button
                            onClick={() => downloadWordFile(plan)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Tải .doc
                          </button>
                        </div>

                        {savedPlans.length > 1 && (
                          <button
                            onClick={() => handleDeleteSavedPlan(plan.id)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                            title="Xóa giáo án này"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QUICK PRESETS & CURRICULUM TEMPLATES FOR ALL CT GDPT 2018 SUBJECTS */}
        {activeTab === 'presets' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs text-slate-500">
                Thông tư 32/2018/TT-BGDĐT · Phụ lục 1.1 &amp; Phụ lục 3 Công văn 2345/BGDĐT-GDTH
              </p>
              <h1 className="font-display mt-1 text-2xl font-semibold text-slate-900">
                Danh mục đầy đủ các môn học &amp; mẫu bài dạy CT GDPT 2018
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                Chọn một môn học hoặc mẫu bài dạy dưới đây để nạp sẵn thông tin chuẩn vào khung soạn thảo.
              </p>
            </div>

            {/* Overview of all 3 official subject groups in CT GDPT 2018 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {SUBJECT_GROUPS_2018.map((group) => (
                <div
                  key={group.groupName}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-3"
                >
                  <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                    {group.groupName}
                  </h2>
                  <div className="space-y-2.5">
                    {group.subjects.map((subj) => (
                      <div
                        key={subj.name}
                        className="flex items-start justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{subj.name}</p>
                          <p className="text-slate-500">{subj.grades}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomSubject(false);
                            setForm((prev) => ({
                              ...prev,
                              subject: subj.name,
                            }));
                            setActiveTab('editor');
                          }}
                          className="shrink-0 rounded border border-slate-200 px-2 py-1 font-medium text-sky-700 hover:bg-sky-50"
                        >
                          Chọn môn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Preset Cards */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Mẫu bài dạy điển hình theo từng môn học ({QUICK_PRESETS.length} mẫu)
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {QUICK_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-sky-800">
                          {preset.form.subject}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{preset.form.grade}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num">{preset.form.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{preset.form.textbook}</span>
                      </div>

                      <h3 className="mt-2 text-lg font-semibold text-slate-900">
                        {preset.form.lessonTitle}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-xs text-slate-600 whitespace-pre-line">
                        <p className="font-semibold text-slate-800">
                          Yêu cầu cần đạt trọng tâm:
                        </p>
                        <p>{preset.form.objectives}</p>
                      </div>

                      <p className="mt-3 text-xs text-slate-500">
                        <strong className="text-slate-700">Định hướng sư phạm:</strong>{' '}
                        {preset.form.pedagogicalFocus}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleSelectPreset(preset.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Sử dụng mẫu này để soạn giáo án</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="no-print mt-12 border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2">
          <p>
            Soạn Giảng 2345 — Hệ thống hỗ trợ thiết kế Kế hoạch bài dạy cấp Tiểu học theo Phụ lục 3 Công văn số 2345/BGDĐT-GDTH.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRegulationModalOpen(true)}
              className="hover:text-slate-900 hover:underline"
            >
              Tra cứu Phụ lục 3 CV 2345
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => window.print()}
              className="hover:text-slate-900 hover:underline"
            >
              Bản in A4
            </button>
          </div>
        </div>
      </footer>

      {/* Modal: Quy chuẩn Công văn 2345/BGDĐT-GDTH */}
      <RegulationReferenceModal
        isOpen={isRegulationModalOpen}
        onClose={() => setIsRegulationModalOpen(false)}
        currentPlan={currentPlan}
      />
    </div>
  );
}
