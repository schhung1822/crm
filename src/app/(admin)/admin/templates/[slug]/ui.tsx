/* eslint-disable max-lines */
/* eslint-disable prettier/prettier */
/* eslint-disable security/detect-object-injection */
"use client";

import React, { useMemo, useState } from "react";

import NextImage from "next/image";

import {
  Palette,
  FormInput,
  MessageSquare,
  FileText,
  Save,
  Eye,
  Upload,
  X,
  Image as ImageIcon,
  List,
  Calendar,
  MapPin,
} from "lucide-react";

import TemplateRenderer from "@/components/form-template/TemplateRenderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { FormTemplateConfig, FieldType, TemplateStyle } from "@/lib/form-template/types";

import { saveTemplateAction } from "./actions";

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      alert("Lỗi khi upload ảnh");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL ảnh hoặc upload file"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Đang tải..." : "Upload"}
          </Button>
          {value && (
            <Button type="button" variant="outline" size="sm" onClick={() => onChange("")} className="gap-2">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {value && (
          <div className="bg-muted/30 rounded-md border p-2">
            <NextImage src={value} alt="Preview" width={320} height={160} className="mx-auto max-h-32 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-md border"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 font-mono text-sm" />
      </div>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="hover:bg-muted/30 flex items-center justify-between rounded-md px-1 py-2.5 transition-colors">
      <label className="cursor-pointer text-sm font-medium text-foreground">
        {label}
      </label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default function AdminTemplateEditor({
  slug,
  initialName,
  initialConfig,
}: {
  slug: string;
  initialName: string;
  initialConfig: FormTemplateConfig;
}) {
  const [config, setConfig] = useState<FormTemplateConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<FormTemplateConfig>) => setConfig((s) => ({ ...s, ...patch }));

  const previewConfig = useMemo(() => config, [config]);

  async function onSave() {
    try {
      setSaving(true);
      await saveTemplateAction(slug, initialName, config);
      alert("Đã lưu template thành công!");
    } catch (error) {
        alert("Lỗi khi lưu template");
        console.error(error);
      } finally {
      setSaving(false);
    }
  }

  return (
    <div className="template-editor-container bg-background flex h-screen flex-col">
      {/* Header */}
      <div className="nice-scroll border-b shadow-sm">
        <div className="flex h-12 w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-bold">Chỉnh sửa Template</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/t/${slug}`, "_blank")}
              className="cursor-pointer gap-2"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button onClick={onSave} disabled={saving} size="sm" className="cursor-pointer gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="nice-scroll flex-1 overflow-hidden">
        <div className="grid h-full grid-cols-[440px_1fr]">
          {/* Left Sidebar - Editor */}
          <div className="bg-muted/10 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30 overflow-y-auto border-r">
            <Tabs defaultValue="theme" className="w-full">
              <div className="bg-background sticky top-0 z-10 border-b shadow-sm">
                <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-1">
                  <TabsTrigger
                    value="theme"
                    className="data-[state=active]:bg-background flex-1 cursor-pointer gap-2 rounded-md data-[state=active]:shadow-sm"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Giao diện</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="fields"
                    className="data-[state=active]:bg-background flex-1 cursor-pointer gap-2 rounded-md data-[state=active]:shadow-sm"
                  >
                    <FormInput className="h-4 w-4" />
                    <span className="hidden sm:inline">Form</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="footer"
                    className="data-[state=active]:bg-background flex-1 cursor-pointer gap-2 rounded-md data-[state=active]:shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Thông tin</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="theme" className="mt-0 space-y-5">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center gap-2 text-base">
                        <Palette className="h-4 w-4" />
                        Kiểu giao diện
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <label className="text-foreground block text-sm font-medium">Chọn template</label>
                      <Select
                        value={config.templateStyle ?? "default"}
                        onValueChange={(value: TemplateStyle) => update({ templateStyle: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn kiểu giao diện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Mặc định</SelectItem>
                          <SelectItem value="starry">Bầu trời sao</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1 text-base text-foreground">
                        <Calendar className="h-4 w-4" />
                        Tên sự kiện
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          value={config.behavior.eventName}
                          onChange={(e) => {
                            const eventName = e.target.value;
                            update({
                              behavior: { ...config.behavior, eventName },
                              header: { ...config.header, titleText: eventName },
                            });
                          }}
                          placeholder="VD: Check in sự kiện EAC Summit 2024"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <ImageIcon className="h-4 w-4" />
                        Ảnh heading
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground">
                      <ImageUploadField
                        label="Ảnh tiêu đề (Heading)"
                        value={config.header.headingImageUrl}
                        onChange={(url) => update({ header: { ...config.header, headingImageUrl: url } })}
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-medium ">
                          Alt text cho ảnh
                        </label>
                        <Input
                          value={config.header.headingAlt}
                          onChange={(e) => update({ header: { ...config.header, headingAlt: e.target.value } })}
                          placeholder="VD: Logo sự kiện"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <Palette className="h-4 w-4" />
                        Màu sắc chủ đạo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ColorInput
                        label="Màu chính (Primary)"
                        value={config.theme.primary}
                        onChange={(v) => update({ theme: { ...config.theme, primary: v } })}
                      />
                      <ColorInput
                        label="Màu phụ (Primary 2)"
                        value={config.theme.primary2}
                        onChange={(v) => update({ theme: { ...config.theme, primary2: v } })}
                      />
                      <ColorInput
                        label="Màu chữ (Text)"
                        value={config.theme.text}
                        onChange={(v) => update({ theme: { ...config.theme, text: v } })}
                      />
                      <ColorInput
                        label="Màu mờ (Muted)"
                        value={config.theme.muted}
                        onChange={(v) => update({ theme: { ...config.theme, muted: v } })}
                      />
                      <ColorInput
                        label="Màu nền (Background)"
                        value={config.theme.bg}
                        onChange={(v) => update({ theme: { ...config.theme, bg: v } })}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fields" className="mt-0 space-y-5">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <FormInput className="h-4 w-4" />
                        Trường dữ liệu cơ bản
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0.5">
                      <ToggleField
                        label="Hiện trường: Họ và tên"
                        checked={config.fields.full_name.enabled}
                        onChange={(v) =>
                          update({
                            fields: { ...config.fields, full_name: { ...config.fields.full_name, enabled: v } },
                          })
                        }
                      />
                      <ToggleField
                        label="Bắt buộc nhập: Họ và tên"
                        checked={config.fields.full_name.required}
                        onChange={(v) =>
                          update({
                            fields: { ...config.fields, full_name: { ...config.fields.full_name, required: v } },
                          })
                        }
                      />
                      <Separator className="my-2" />
                      <ToggleField
                        label="Hiện trường: Số điện thoại"
                        checked={config.fields.phone.enabled}
                        onChange={(v) =>
                          update({ fields: { ...config.fields, phone: { ...config.fields.phone, enabled: v } } })
                        }
                      />
                      <ToggleField
                        label="Bắt buộc nhập: Số điện thoại"
                        checked={config.fields.phone.required}
                        onChange={(v) =>
                          update({ fields: { ...config.fields, phone: { ...config.fields.phone, required: v } } })
                        }
                      />
                      <Separator className="my-2" />
                      <ToggleField
                        label="Hiện trường: Email"
                        checked={config.fields.email.enabled}
                        onChange={(v) =>
                          update({ fields: { ...config.fields, email: { ...config.fields.email, enabled: v } } })
                        }
                      />
                      <ToggleField
                        label="Bắt buộc nhập: Email"
                        checked={config.fields.email.required}
                        onChange={(v) =>
                          update({ fields: { ...config.fields, email: { ...config.fields.email, required: v } } })
                        }
                      />
                    </CardContent>
                  </Card>

                  {/* Câu hỏi */}
                  <div className="pt-4">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                      <List className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                      Câu hỏi
                    </h3>
                    <div className="space-y-5">
                      {config.questions.slice(0, 5).map((q, idx) => (
                        <Card key={q.id} className="border-2">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                                <MessageSquare className="h-4 w-4" />
                                Câu hỏi {idx + 1}
                              </CardTitle>
                              <Switch
                                checked={q.enabled}
                                onCheckedChange={(v) => {
                                  const next = [...config.questions];
                                  next[idx] = { ...q, enabled: v };
                                  update({ questions: next });
                                }}
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Nhãn câu hỏi
                              </label>
                              <Input
                                value={q.label}
                                onChange={(e) => {
                                  const next = [...config.questions];
                                  next[idx] = { ...q, label: e.target.value };
                                  update({ questions: next });
                                }}
                                placeholder="VD: Bạn muốn tìm hiểu gì?"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Loại input
                              </label>
                              <Select
                                value={q.type}
                                onValueChange={(type: FieldType) => {
                                  const next = [...config.questions];
                                  next[idx] = { ...q, type };
                                  update({ questions: next });
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="textarea">Textarea</SelectItem>
                                  <SelectItem value="select">Select</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="tel">Số điện thoại</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <ToggleField
                              label="Bắt buộc"
                              checked={q.required}
                              onChange={(v) => {
                                const next = [...config.questions];
                                next[idx] = { ...q, required: v };
                                update({ questions: next });
                              }}
                            />

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Placeholder
                              </label>
                              <Input
                                value={q.placeholder ?? ""}
                                onChange={(e) => {
                                  const next = [...config.questions];
                                  next[idx] = { ...q, placeholder: e.target.value };
                                  update({ questions: next });
                                }}
                                placeholder="VD: Nhập câu trả lời..."
                              />
                            </div>

                            {q.type === "select" && (
                              <div className="space-y-2">
                                <label
                                  className="block text-sm font-medium text-foreground"
                                >
                                  Các lựa chọn (mỗi dòng 1 option)
                                </label>
                                <Textarea
                                  value={(q.options ?? []).join("\n")}
                                  onChange={(e) => {
                                    const options = e.target.value
                                      .split("\n")
                                      .map((s) => s.trim())
                                      .filter(Boolean);
                                    const next = [...config.questions];
                                    next[idx] = { ...q, options };
                                    update({ questions: next });
                                  }}
                                  placeholder="Lựa chọn 1&#10;Lựa chọn 2&#10;Lựa chọn 3"
                                  rows={4}
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="footer" className="mt-0 space-y-5">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <FileText className="h-4 w-4" />
                        Thông tin sự kiện
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Dòng chữ trên (VD: to attend the launch event)
                        </label>
                        <Input
                          value={config.infoEvent.topText}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, topText: e.target.value } })}
                          placeholder="to attend the launch event"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Tiêu đề chính (VD: SGA Renew Peel)
                        </label>
                        <Input
                          value={config.infoEvent.headline}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, headline: e.target.value } })}
                          placeholder="SGA Renew Peel"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Khẩu hiệu (VD: Đa tầng Tác Động...)
                        </label>
                        <Input
                          value={config.infoEvent.motto}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, motto: e.target.value } })}
                          placeholder="Đa tầng Tác Động, Dứt Vọng Mụn Thâm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Tổ chức bởi (VD: organized by...)
                        </label>
                        <Input
                          value={config.infoEvent.organizerText}
                          onChange={(e) =>
                            update({ infoEvent: { ...config.infoEvent, organizerText: e.target.value } })
                          }
                          placeholder="organized by EAC Group and SRX Laboratory Dermatology"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          URL Logo 1
                        </label>
                        <Input
                          value={config.infoEvent.logo1Url ?? ""}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, logo1Url: e.target.value } })}
                          placeholder="https://example.com/logo1.png"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          URL Logo 2
                        </label>
                        <Input
                          value={config.infoEvent.logo2Url ?? ""}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, logo2Url: e.target.value } })}
                          placeholder="https://example.com/logo2.png"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Dòng chữ dưới (VD: We would be honored...)
                        </label>
                        <Input
                          value={config.infoEvent.bottomText}
                          onChange={(e) => update({ infoEvent: { ...config.infoEvent, bottomText: e.target.value } })}
                          placeholder="We would be honored to have you at the event"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <Palette className="h-4 w-4" />
                        Màu sắc Chân trang
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ColorInput
                        label="Gradient bắt đầu"
                        value={config.footer.gradientFrom}
                        onChange={(v) => update({ footer: { ...config.footer, gradientFrom: v } })}
                      />
                      <ColorInput
                        label="Gradient kết thúc"
                        value={config.footer.gradientTo}
                        onChange={(v) => update({ footer: { ...config.footer, gradientTo: v } })}
                      />
                      <ColorInput
                        label="Màu chữ"
                        value={config.footer.textColor}
                        onChange={(v) => update({ footer: { ...config.footer, textColor: v } })}
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <FileText className="h-4 w-4" />
                        Dress Code
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Tiêu đề
                        </label>
                        <Input
                          value={config.footer.dressCodeTitle}
                          onChange={(e) => update({ footer: { ...config.footer, dressCodeTitle: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Mô tả
                        </label>
                        <Input
                          value={config.footer.dressCodeDesc}
                          onChange={(e) => update({ footer: { ...config.footer, dressCodeDesc: e.target.value } })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <ColorInput
                          label="Màu 1"
                          value={config.footer.dressDots.white}
                          onChange={(v) =>
                            update({
                              footer: {
                                ...config.footer,
                                dressDots: { ...config.footer.dressDots, white: v },
                              },
                            })
                          }
                        />
                        <ColorInput
                          label="Màu 2"
                          value={config.footer.dressDots.whitePink}
                          onChange={(v) =>
                            update({
                              footer: {
                                ...config.footer,
                                dressDots: { ...config.footer.dressDots, whitePink: v },
                              },
                            })
                          }
                        />
                        <ColorInput
                          label="Màu 3"
                          value={config.footer.dressDots.pink}
                          onChange={(v) =>
                            update({
                              footer: {
                                ...config.footer,
                                dressDots: { ...config.footer.dressDots, pink: v },
                              },
                            })
                          }
                        />
                        <ColorInput
                          label="Màu 4"
                          value={config.footer.dressDots.black}
                          onChange={(v) =>
                            update({
                              footer: {
                                ...config.footer,
                                dressDots: { ...config.footer.dressDots, black: v },
                              },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <Calendar className="h-4 w-4" />
                        Ngày giờ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Ngày
                          </label>
                          <Input
                            value={config.footer.dateDay}
                            onChange={(e) => update({ footer: { ...config.footer, dateDay: e.target.value } })}
                            placeholder="20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Tháng
                          </label>
                          <Input
                            value={config.footer.dateMonth}
                            onChange={(e) => update({ footer: { ...config.footer, dateMonth: e.target.value } })}
                            placeholder="12"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Năm
                          </label>
                          <Input
                            value={config.footer.dateYear}
                            onChange={(e) => update({ footer: { ...config.footer, dateYear: e.target.value } })}
                            placeholder="2024"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Giờ
                        </label>
                        <Input
                          value={config.footer.timeText}
                          onChange={(e) => update({ footer: { ...config.footer, timeText: e.target.value } })}
                          placeholder="14:00 - 17:00"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-foreground">
                        <MapPin className="h-4 w-4" />
                        Địa điểm
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Tên địa điểm
                        </label>
                        <Input
                          value={config.footer.placeName}
                          onChange={(e) => update({ footer: { ...config.footer, placeName: e.target.value } })}
                          placeholder="Khách sạn New World"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Dòng 1
                        </label>
                        <Input
                          value={config.footer.placeLine1}
                          onChange={(e) => update({ footer: { ...config.footer, placeLine1: e.target.value } })}
                          placeholder="76 Lê Lai, Bến Thành"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Dòng 2
                        </label>
                        <Input
                          value={config.footer.placeLine2}
                          onChange={(e) => update({ footer: { ...config.footer, placeLine2: e.target.value } })}
                          placeholder="Quận 1, TP.HCM"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Side - Preview */}
          <div className="from-muted/20 via-background to-muted/30 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30 overflow-y-auto bg-linear-to-br">
            <div className="w-full">
              <TemplateRenderer config={previewConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
