import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Page() {
  return (
    <div className="p-10 space-y-16">
        <section className="space-y-4">
        <h1 className="text-3xl font-bold text-center uppercase">Quy tắc</h1>
        <p className="text-center w-[600px] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci ut nunc faucibus pretium. Integer scelerisque magna non massa blandit.
        </p>
        <hr width="50%" className="mx-auto" />
      </section>

      {/* ========================================================= */}
      {/* 1. Quy tắc phát triển dự án */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Bộ Quy Tắc Phát Triển Dự Án</h2>

        <ul className="space-y-2 list-disc pl-6">
          <li>Mọi commit phải rõ ràng, có mô tả chi tiết và không được để empty commit.</li>
          <li>Tuyệt đối không push vào branch main nếu chưa qua review.</li>
          <li>Code phải được format theo Prettier và ESLint trước khi submit PR.</li>
          <li>Mọi function viết mới đều phải có mô tả JSDoc.</li>
          <li> Ưu tiên tách nhỏ component, tránh logic phình to.</li>
          <li>Không được hard-code API URL trong bất kỳ component nào.</li>
          <li>Tất cả query phải được cache bằng React Query hoặc server actions.</li>
        </ul>
      </section>

      {/* ========================================================= */}
      {/* 2. Quy tắc UI/UX */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quy Tắc UI/UX</h2>

        <div className="space-y-4">
          <p>Đảm bảo giao diện nhất quán về màu sắc, spacing và typography:</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Padding tối thiểu 16px cho mọi section.</li>
            <li>Heading phải tuân theo scale: 32 → 24 → 20 → 16.</li>
            <li>Không dùng quá 2 font trên toàn bộ hệ thống.</li>
            <li>
              Button phải có 3 trạng thái: <b>default</b>, <b>hover</b>, <b>disabled</b>.
            </li>
            <li>Spacing giữa các block lớn ≥ 40px.</li>
          </ol>

          <p>
            Khi thiết kế component phải đảm bảo <b>mobile-first</b> và hỗ trợ mọi kích thước màn hình.
          </p>
        </div>

         <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
            it&apos;s only fair that they should pay for the privilege.&quot;
        </blockquote>
      </section>

      {/* ========================================================= */}
      {/* 3. Quy tắc Backend */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quy Tắc Backend & API</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>API phải luôn trả về JSON chuẩn theo format chung.</li>
          <li>Không trả về HTML trong API dưới bất kỳ hình thức nào.</li>
          <li>Trường dữ liệu phải snake_case hoặc camelCase thống nhất.</li>
          <li>Response phải bao gồm status code chính xác theo behavior.</li>
          <li>Tốc độ phản hồi API không vượt quá 250ms cho request cơ bản.</li>
          <li>
            Mọi API quan trọng phải có <b>rate limit</b> và <b>token-based</b> authentication.
          </li>
        </ul>
      </section>

      {/* ========================================================= */}
      {/* 4. Quy tắc bảo mật */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quy Tắc Bảo Mật</h2>

        <div className="space-y-2">
          <p>Các nguyên tắc bảo mật phải được áp dụng xuyên suốt:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mật khẩu phải hash bằng bcrypt ≥ 12 rounds.</li>
            <li>Không lưu access token vào localStorage.</li>
            <li>Không ghi log thông tin nhạy cảm.</li>
            <li>Không commit file .env lên git trong mọi tình huống.</li>
            <li>
              File upload phải được kiểm tra mime types và kích thước trước khi xử lý.
            </li>
            <li>
              Các endpoint admin phải có middleware xác thực nhiều lớp (role + token + IP allowlist).
            </li>
          </ul>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. Quy tắc tối ưu hoá */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quy Tắc Tối Ưu Hóa</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Lazy load các component không cần thiết.</li>
          <li>Sử dụng dynamic import cho các module nặng.</li>
          <li>
            Image phải dùng <code>next/image</code> để tối ưu load time.
          </li>
          <li>Hạn chế rerender không cần thiết bằng memoization.</li>
          <li>Tránh gọi API lặp lại trừ khi thực sự cần.</li>
          <li>Cache kết quả nặng ở server hoặc Redis.</li>
        </ul>
      </section>

      {/* ========================================================= */}
      {/* 6. Quy tắc làm việc nhóm */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quy Tắc Làm Việc Nhóm</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Luôn thông báo khi bạn bắt đầu và kết thúc một task.</li>
          <li>Không bao giờ để người khác chờ quá 4 giờ cho một câu hỏi quan trọng.</li>
          <li>Đặt lịch meeting có agenda rõ ràng và không quá 45 phút.</li>
          <li>Hạn chế gửi message ngoài giờ trừ tình huống khẩn cấp.</li>
          <li>
            Báo cáo daily phải có: <b>Hôm nay làm gì – Ngày mai làm gì – Vướng mắc gì</b>.
          </li>
        </ul>
      </section>

      {/* ========================================================= */}
      {/* 7. Bảng mô tả demo */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Bảng Quy Ước Demo</h2>

        <table className="w-full table-auto border-collapse border border-neutral-700">
          <thead className="bg-neutral-900">
            <tr>
              <th className="border border-neutral-700 p-3 text-left">Tên Quy Tắc</th>
              <th className="border border-neutral-700 p-3 text-left">Mô Tả</th>
              <th className="border border-neutral-700 p-3 text-left">Bắt buộc?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Không push lên main", "Mọi code phải qua PR", "Có"],
              ["Có test unit", "Tối thiểu 1 test cho mỗi module chính", "Có"],
              ["Log exceptions", "Ghi log lỗi backend đầy đủ", "Có"],
              ["Dark mode", "UI phải hỗ trợ chế độ tối", "Không"],
              ["Mobile-first", "Ưu tiên mobile trước desktop", "Có"],
            ].map((row, i) => (
              <tr key={i} className="hover:bg-neutral-800">
                <td className="border border-neutral-700 p-3">{row[0]}</td>
                <td className="border border-neutral-700 p-3">{row[1]}</td>
                <td className="border border-neutral-700 p-3">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ========================================================= */}
      {/* 8. Đoạn mô phỏng tài liệu dài bất kỳ */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tài Liệu Mô Phỏng</h2>

        <p>
          Đây là đoạn văn bản dài dùng để mô phỏng tài liệu lorem ipsum…  
          Bạn có thể cần nhiều nội dung để test scroll hoặc layout, nên tôi để đoạn văn
          tương đối dài để thử nghiệm spacing, typography và hiển thị trong nhiều trường hợp.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci ut nunc
          faucibus pretium. Integer scelerisque magna non massa blandit, eget suscipit
          sapien interdum. Vivamus fermentum bibendum eros at gravida. Vestibulum commodo
          finibus dui, eu tincidunt neque ultricies at. Integer fermentum risus nec nisi
          finibus pharetra. Aenean ac ultrices lorem. Cras tempor efficitur nibh, non
          sollicitudin augue tincidunt non.
        </p>

        <p>
          Curabitur et est sed augue ultricies ultricies. Nullam aliquet dolor a vehicula
          interdum. Nulla facilisi. Mauris fringilla, ante nec ultrices vulputate, massa
          libero facilisis erat, sed dictum lorem tortor sed arcu.
        </p>
      </section>
      
      <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Product Information</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping Details</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express shipping
                ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return the
                item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  );
}
