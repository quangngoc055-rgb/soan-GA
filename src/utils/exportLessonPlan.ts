import { LessonPlan2345 } from '../types/lessonPlan';

export function formatLessonPlanAsPlainText(plan: LessonPlan2345): string {
  const lines: string[] = [];

  lines.push('KẾ HOẠCH BÀI DẠY');
  lines.push('(Theo Phụ lục 3 - Công văn số 2345/BGDĐT-GDTH ngày 07/06/2021 của Bộ GD&ĐT)');
  lines.push('====================================================================');
  lines.push(`Môn học/hoạt động giáo dục: ${plan.header.subject}; Lớp: ${plan.header.grade}`);
  lines.push(`Tên bài học: ${plan.header.lessonTitle}; Thời lượng: ${plan.header.duration}`);
  lines.push(`Thời gian thực hiện: ${plan.header.executionDate}`);
  lines.push(`Bộ sách: ${plan.header.textbook} | Loại bài: ${plan.header.lessonType}`);
  lines.push('');

  lines.push('I. YÊU CẦU CẦN ĐẠT');
  lines.push('1. Năng lực đặc thù:');
  plan.section1_objectives.specificCompetencies.forEach((item) => {
    lines.push(`   - ${item}`);
  });
  lines.push('2. Năng lực chung:');
  lines.push(`   - Năng lực tự chủ và tự học: ${plan.section1_objectives.generalCompetencies.autonomyAndLearning}`);
  lines.push(`   - Năng lực giao tiếp và hợp tác: ${plan.section1_objectives.generalCompetencies.communicationAndCollaboration}`);
  lines.push(`   - Năng lực giải quyết vấn đề và sáng tạo: ${plan.section1_objectives.generalCompetencies.problemSolvingAndCreativity}`);
  lines.push('3. Phẩm chất:');
  plan.section1_objectives.qualities.forEach((q) => {
    lines.push(`   - ${q}`);
  });
  if (plan.section1_objectives.integratedContent) {
    lines.push(`4. Nội dung tích hợp: ${plan.section1_objectives.integratedContent}`);
  }
  lines.push('');

  lines.push('II. ĐỒ DÙNG DẠY HỌC');
  lines.push('1. Đối với giáo viên:');
  plan.section2_teachingAids.teacherPreparation.forEach((item) => {
    lines.push(`   - ${item}`);
  });
  lines.push('2. Đối với học sinh:');
  plan.section2_teachingAids.studentPreparation.forEach((item) => {
    lines.push(`   - ${item}`);
  });
  lines.push('');

  lines.push('III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU');
  plan.section3_activities.forEach((act) => {
    lines.push('--------------------------------------------------------------------');
    lines.push(`${act.title.toUpperCase()} (${act.durationMinutes} phút)`);
    lines.push(`* Mục tiêu: ${act.objective}`);
    lines.push(`* Hình thức tổ chức: ${act.organizationForm} | Phương pháp/Kĩ thuật: ${act.teachingMethod}`);
    lines.push('* Cách tiến hành (4 bước tổ chức hoạt động học tập):');
    lines.push(`  a) Chuyển giao nhiệm vụ học tập: ${act.steps.step1_transferTask}`);
    lines.push(`  b) Tổ chức cho học sinh thực hiện nhiệm vụ: ${act.steps.step2_performTask}`);
    lines.push(`  c) Tổ chức cho học sinh trình bày kết quả và thảo luận: ${act.steps.step3_presentAndDiscuss}`);
    lines.push(`  d) Nhận xét, đánh giá thực hiện nhiệm vụ học tập: ${act.steps.step4_evaluateAndConclude}`);
    lines.push('* Tóm tắt tiến trình:');
    lines.push('  + Hoạt động của Giáo viên:');
    act.teacherActions.forEach((t) => lines.push(`    - ${t}`));
    lines.push('  + Hoạt động của Học sinh:');
    act.studentActions.forEach((s) => lines.push(`    - ${s}`));
    lines.push(`* Sản phẩm học tập / Đánh giá: ${act.expectedProducts}`);
    lines.push('');
  });

  lines.push('IV. ĐÁNH GIÁ VÀ ĐIỀU CHỈNH SAU BÀI DẠY');
  lines.push('1. Phương án đánh giá thường xuyên (Theo TT 27/2020/TT-BGDĐT):');
  plan.section4_assessmentAndAdjustment.assessmentCriteria.forEach((c, idx) => {
    lines.push(`   ${idx + 1}) Tiêu chí: ${c.criterion}`);
    lines.push(`      - Hoàn thành tốt: ${c.levelGood}`);
    lines.push(`      - Hoàn thành: ${c.levelCompleted}`);
    lines.push(`      - Cần cố gắng / Hỗ trợ: ${c.levelNeedsSupport}`);
    lines.push(`      - Phương pháp & Công cụ: ${c.methodAndTool}`);
  });
  lines.push('');
  lines.push('2. Điều chỉnh sau bài dạy (nếu có):');
  lines.push(`   - Nội dung còn bất cập, khó khăn: ${plan.section4_assessmentAndAdjustment.postLessonAdjustments.inadequaciesAndDifficulties}`);
  lines.push(`   - Nội dung tâm đắc, hiệu quả (chia sẻ SHCM): ${plan.section4_assessmentAndAdjustment.postLessonAdjustments.effectiveHighlights}`);
  lines.push(`   - Điều chỉnh theo đối tượng học sinh: ${plan.section4_assessmentAndAdjustment.postLessonAdjustments.differentiationNotes}`);

  return lines.join('\n');
}

export function generateWordHtmlDocument(plan: LessonPlan2345): string {
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\n/g, '<br/>');

  const activitiesRowsHtml = plan.section3_activities
    .map(
      (act) => `
      <div style="margin-top: 14pt; margin-bottom: 8pt;">
        <p style="font-weight: bold; font-size: 13pt; margin: 0 0 4pt 0;">
          ${escapeHtml(act.title)} (${act.durationMinutes} phút)
        </p>
        <p style="margin: 0 0 3pt 0; font-size: 13pt;">
          <b>a) Mục tiêu:</b> ${escapeHtml(act.objective)}
        </p>
        <p style="margin: 0 0 6pt 0; font-size: 13pt;">
          <b>b) Cách thức tổ chức:</b> ${escapeHtml(act.organizationForm)} — <i>Phương pháp/Kĩ thuật:</i> ${escapeHtml(act.teachingMethod)}
        </p>
        <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse; border: 1px solid #000000; font-family: 'Times New Roman', serif; font-size: 13pt;">
          <thead>
            <tr style="background-color: #F1F5F9;">
              <th style="width: 50%; border: 1px solid #000000; text-align: center; font-weight: bold; padding: 6pt;">
                Hoạt động của Giáo viên
              </th>
              <th style="width: 50%; border: 1px solid #000000; text-align: center; font-weight: bold; padding: 6pt;">
                Hoạt động của Học sinh
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="vertical-align: top; border: 1px solid #000000; padding: 6pt;">
                <p style="margin: 0 0 6pt 0;"><b>* Chuyển giao nhiệm vụ:</b><br/>${escapeHtml(act.steps.step1_transferTask)}</p>
                <p style="margin: 0 0 6pt 0;"><b>* Hướng dẫn, hỗ trợ thực hiện:</b><br/>${act.teacherActions.map((a) => `- ${escapeHtml(a)}`).join('<br/>')}</p>
                <p style="margin: 0;"><b>* Nhận xét, đánh giá, kết luận:</b><br/>${escapeHtml(act.steps.step4_evaluateAndConclude)}</p>
              </td>
              <td style="vertical-align: top; border: 1px solid #000000; padding: 6pt;">
                <p style="margin: 0 0 6pt 0;"><b>* Thực hiện nhiệm vụ học tập:</b><br/>${escapeHtml(act.steps.step2_performTask)}</p>
                <p style="margin: 0 0 6pt 0;"><b>* Báo cáo kết quả &amp; thảo luận:</b><br/>${escapeHtml(act.steps.step3_presentAndDiscuss)}</p>
                <p style="margin: 0;"><b>* Sản phẩm cần đạt:</b><br/>${escapeHtml(act.expectedProducts)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `
    )
    .join('');

  const assessmentRowsHtml = plan.section4_assessmentAndAdjustment.assessmentCriteria
    .map(
      (c) => `
      <tr>
        <td style="border: 1px solid #000000; padding: 6pt; vertical-align: top;"><b>${escapeHtml(c.criterion)}</b></td>
        <td style="border: 1px solid #000000; padding: 6pt; vertical-align: top;">${escapeHtml(c.levelGood)}</td>
        <td style="border: 1px solid #000000; padding: 6pt; vertical-align: top;">${escapeHtml(c.levelCompleted)}</td>
        <td style="border: 1px solid #000000; padding: 6pt; vertical-align: top;">${escapeHtml(c.levelNeedsSupport)}</td>
        <td style="border: 1px solid #000000; padding: 6pt; vertical-align: top;">${escapeHtml(c.methodAndTool)}</td>
      </tr>
    `
    )
    .join('');

  return `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${escapeHtml(plan.header.lessonTitle)}</title>
      <style>
        @page Section1 {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2.5cm;
          mso-header-margin: 1.2cm;
          mso-footer-margin: 1.2cm;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13pt;
          line-height: 1.35;
          color: #000000;
        }
        h1, h2, h3 {
          font-family: 'Times New Roman', Times, serif;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        <p style="text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 2pt;">
          KẾ HOẠCH BÀI DẠY
        </p>
        <p style="text-align: center; font-style: italic; font-size: 12pt; margin-top: 0; margin-bottom: 14pt;">
          (Kèm theo Phụ lục 3 - Công văn số 2345/BGDĐT-GDTH ngày 07/06/2021 của Bộ Giáo dục và Đào tạo)
        </p>

        <p style="margin: 3pt 0;"><b>Môn học/hoạt động giáo dục:</b> ${escapeHtml(plan.header.subject)}; <b>Lớp:</b> ${escapeHtml(plan.header.grade)}</p>
        <p style="margin: 3pt 0;"><b>Tên bài học:</b> ${escapeHtml(plan.header.lessonTitle)}; <b>Số tiết:</b> ${escapeHtml(plan.header.duration)}</p>
        <p style="margin: 3pt 0 12pt 0;"><b>Thời gian thực hiện:</b> ${escapeHtml(plan.header.executionDate)} (${escapeHtml(plan.header.textbook)})</p>

        <p style="font-weight: bold; font-size: 13pt; margin: 10pt 0 4pt 0;">1. Yêu cầu cần đạt</p>
        <p style="margin: 2pt 0;"><b>a) Năng lực đặc thù:</b></p>
        <ul style="margin-top: 2pt; margin-bottom: 6pt;">
          ${plan.section1_objectives.specificCompetencies.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <p style="margin: 2pt 0;"><b>b) Năng lực chung:</b></p>
        <ul style="margin-top: 2pt; margin-bottom: 6pt;">
          <li><b>Tự chủ và tự học:</b> ${escapeHtml(plan.section1_objectives.generalCompetencies.autonomyAndLearning)}</li>
          <li><b>Giao tiếp và hợp tác:</b> ${escapeHtml(plan.section1_objectives.generalCompetencies.communicationAndCollaboration)}</li>
          <li><b>Giải quyết vấn đề và sáng tạo:</b> ${escapeHtml(plan.section1_objectives.generalCompetencies.problemSolvingAndCreativity)}</li>
        </ul>
        <p style="margin: 2pt 0;"><b>c) Phẩm chất:</b></p>
        <ul style="margin-top: 2pt; margin-bottom: 6pt;">
          ${plan.section1_objectives.qualities.map((q) => `<li>${escapeHtml(q)}</li>`).join('')}
        </ul>
        ${
          plan.section1_objectives.integratedContent
            ? `<p style="margin: 2pt 0 8pt 0;"><b>d) Nội dung tích hợp:</b> ${escapeHtml(plan.section1_objectives.integratedContent)}</p>`
            : ''
        }

        <p style="font-weight: bold; font-size: 13pt; margin: 10pt 0 4pt 0;">2. Đồ dùng dạy học</p>
        <p style="margin: 2pt 0;"><b>a) Đối với giáo viên:</b></p>
        <ul style="margin-top: 2pt; margin-bottom: 6pt;">
          ${plan.section2_teachingAids.teacherPreparation.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <p style="margin: 2pt 0;"><b>b) Đối với học sinh:</b></p>
        <ul style="margin-top: 2pt; margin-bottom: 8pt;">
          ${plan.section2_teachingAids.studentPreparation.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>

        <p style="font-weight: bold; font-size: 13pt; margin: 10pt 0 6pt 0;">3. Các hoạt động dạy học chủ yếu</p>
        ${activitiesRowsHtml}

        <p style="font-weight: bold; font-size: 13pt; margin: 14pt 0 6pt 0;">4. Đánh giá và Điều chỉnh sau bài dạy</p>
        <p style="margin: 4pt 0;"><b>4.1. Tiêu chí đánh giá thường xuyên bài học:</b></p>
        <table border="1" cellspacing="0" cellpadding="6" style="width: 100%; border-collapse: collapse; border: 1px solid #000000; font-family: 'Times New Roman', serif; font-size: 12pt; margin-bottom: 10pt;">
          <thead>
            <tr style="background-color: #F1F5F9;">
              <th style="border: 1px solid #000000; padding: 6pt;">Tiêu chí đánh giá</th>
              <th style="border: 1px solid #000000; padding: 6pt;">Hoàn thành tốt</th>
              <th style="border: 1px solid #000000; padding: 6pt;">Hoàn thành</th>
              <th style="border: 1px solid #000000; padding: 6pt;">Cần hỗ trợ</th>
              <th style="border: 1px solid #000000; padding: 6pt;">Phương pháp &amp; Công cụ</th>
            </tr>
          </thead>
          <tbody>
            ${assessmentRowsHtml}
          </tbody>
        </table>

        <p style="margin: 6pt 0 3pt 0;"><b>4.2. Điều chỉnh sau bài dạy (nếu có):</b></p>
        <p style="margin: 2pt 0;">- <b>Những nội dung còn bất cập, gặp khó khăn:</b> ${escapeHtml(plan.section4_assessmentAndAdjustment.postLessonAdjustments.inadequaciesAndDifficulties)}</p>
        <p style="margin: 2pt 0;">- <b>Nội dung tâm đắc, tổ chức dạy học hiệu quả:</b> ${escapeHtml(plan.section4_assessmentAndAdjustment.postLessonAdjustments.effectiveHighlights)}</p>
        <p style="margin: 2pt 0;">- <b>Điều chỉnh theo đối tượng học sinh:</b> ${escapeHtml(plan.section4_assessmentAndAdjustment.postLessonAdjustments.differentiationNotes)}</p>
      </div>
    </body>
    </html>
  `;
}

export function downloadWordFile(plan: LessonPlan2345): void {
  const htmlContent = generateWordHtmlDocument(plan);
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const safeSlug = plan.header.lessonTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `KHBD-2345-${safeSlug || 'giao-an'}.doc`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadTextFile(plan: LessonPlan2345): void {
  const textContent = formatLessonPlanAsPlainText(plan);
  const blob = new Blob([textContent], {
    type: 'text/plain;charset=utf-8'
  });
  const safeSlug = plan.header.lessonTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `KHBD-2345-${safeSlug || 'giao-an'}.txt`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
