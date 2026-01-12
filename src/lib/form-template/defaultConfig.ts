import { FormTemplateConfig } from "./types";

export const defaultConfig: FormTemplateConfig = {
  webhookUrl: "https://nextg.nextgency.vn/webhook/EAC-dang-ky",
  theme: {
    bg: "#fde7f1",
    card: "rgba(255,255,255,.92)",
    primary: "#ec5fa4",
    primary2: "#f7a1c4",
    text: "#7a2b4b",
    muted: "#b06a8c",
    ring: "rgba(236,95,164,.35)",
  },
  header: {
    headingImageUrl:
      "https://statics.pancake.vn/web-media/18/f6/71/e6/76c1495e525e89899ae0090a0f9d30cf8a3aedfcf89e51c64f245175-w:1280-h:560-l:613547-t:image/png.png",
    headingAlt: "SGA Penew Pêl",
    descText: "We cordially invite",
    titleText: "Check in sự kiện",
    subtitleText: "",
  },
  infoEvent: {
    topText: "to attend the launch event",
    headline: "SGA Renew Peel",
    motto: "Đa tầng Tác Động, Dứt Vòng Mụn Thâm",
    organizerText: "organized by EAC Group and SRX Laboratory Dermatology",
    bottomText: "We would be honored to have you at the event",
    logo1Url:
      "https://statics.pancake.vn/web-media/4b/c7/06/08/f8e7d877ec55a6dbda6a7a9b95e9b4def686e05a6f4008ecf0870cc7-w:1200-h:628-l:37202-t:image/png.png",
    logo2Url:
      "https://statics.pancake.vn/web-media/c7/26/2c/a7/89cee08c3f61654d699786777490449c70fb8bce6559a21972daf14e-w:1200-h:628-l:34821-t:image/png.png",
  },
  fields: {
    full_name: { enabled: true, required: true, label: "Họ và tên", placeholder: "VD: Nguyễn Văn A" },
    phone: { enabled: true, required: true, label: "Số điện thoại", placeholder: "VD: 0912345678" },
    email: { enabled: true, required: false, label: "Email", placeholder: "VD: abc@email.com" },
    hidden: {
      user_id: { enabled: true },
      city: { enabled: true },
      role: { enabled: true },
      clinic: { enabled: true },
      full_name_nv: { enabled: true },
    },
  },
  questions: Array.from({ length: 5 }).map((_, i) => ({
    id: `q${i + 1}`,
    enabled: false,
    label: `Câu hỏi ${i + 1}`,
    type: "text",
    required: false,
    placeholder: "",
    options: [],
  })),
  footer: {
    gradientFrom: "#f7a1c4",
    gradientTo: "#ec5fa4",
    textColor: "#ffffff",
    dressCodeTitle: "DRESS CODE",
    dressCodeDesc: "Please wear these colors",
    dressDots: { white: "#ffffff", whitePink: "#fed6f0", pink: "#d34c87", black: "#111111" },
    dateDay: "23",
    dateMonth: "12",
    dateYear: "2025",
    timeText: "13:00 – 17:00",
    placeName: "MRD PALACE",
    placeLine1: "8th floor, Viet Tower building",
    placeLine2: "01 Thai Ha Street, Hanoi",
  },
  behavior: {
    readUserIdFromQueryKey: "userid",
    prefillKeys: { city: "city", role: "role" },
    source: "zalo_webview_form",
  },
};
