"use client";

import * as React from "react";

import { Package, Tag, Layers, Banknote, ReceiptText, Image as ImageIcon } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { productSchema } from "./schema";

function money(v: unknown) {
  const n = typeof v === "number" ? v : Number(String(v ?? 0).replaceAll(",", ""));
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("vi-VN");
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-muted-foreground text-[11px]">{label}</div>
        <div className="text-sm leading-snug font-medium">
          {value ?? <span className="text-muted-foreground">—</span>}
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card/60 rounded-2xl border p-3">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="grid gap-2.5">{children}</div>
    </div>
  );
}

export function TableCellViewer({ item }: { item: z.infer<typeof productSchema> }) {
  const isMobile = useIsMobile();

  // ✅ Đổi field ảnh tại đây nếu schema bạn dùng tên khác
  const thumbSrc =
    (item as any)?.thumbnail || (item as any)?.image || (item as any)?.image_url || (item as any)?.thumb || "";

  // ✅ Ảnh mặc định (bạn thay path theo dự án)
  const DEFAULT_THUMB = "/images/product-default.png";

  const giaBan = money(item.gia_ban || 0);
  const giaVon = money(item.gia_von || 0);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>

      {/* max width 400px, full height desktop */}
      <DrawerContent className="h-[100vh] sm:ml-auto sm:h-[100vh] sm:max-w-[400px]">
        {/* HEADER sticky */}
        <DrawerHeader className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10 border-b backdrop-blur">
          <div className="flex items-start gap-3">
            {/* Thumbnail vuông */}
            <div className="bg-muted relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbSrc || DEFAULT_THUMB}
                alt={item.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes(DEFAULT_THUMB)) return;
                  img.src = DEFAULT_THUMB;
                }}
              />
              {!thumbSrc ? (
                <div className="absolute inset-0 grid place-items-center">
                  <ImageIcon className="text-muted-foreground h-5 w-5" />
                </div>
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <DrawerTitle className="truncate text-base">{item.name}</DrawerTitle>
              <DrawerDescription className="truncate">
                Mã: <span className="text-foreground font-medium">{item.pro_ID}</span>
                {item.brand ? <> • {item.brand}</> : null}
              </DrawerDescription>

              <div className="mt-2 flex flex-wrap gap-2">
                {item.brand ? (
                  <Badge variant="outline" className="rounded-full">
                    <Tag className="mr-1 h-3.5 w-3.5" />
                    {String(item.brand)}
                  </Badge>
                ) : null}

                {item.class ? (
                  <Badge variant="secondary" className="rounded-full">
                    <Layers className="mr-1 h-3.5 w-3.5" />
                    {String(item.class)}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        </DrawerHeader>

        {/* BODY scroll */}
        <div className="nice-scroll flex-1 overflow-y-auto px-4 py-4">
          <div className="grid gap-3">
            <Block title="Tổng quan">
              <Row
                icon={<Package className="h-4 w-4" />}
                label="Tên sản phẩm"
                value={<span className="break-words">{item.name}</span>}
              />
              <Row icon={<Tag className="h-4 w-4" />} label="Thương hiệu" value={item.brand ?? "—"} />
              <Row icon={<Layers className="h-4 w-4" />} label="Loại sản phẩm" value={item.class ?? "—"} />
            </Block>

            <Block title="Giá">
              <Row
                icon={<Banknote className="h-4 w-4" />}
                label="Giá bán"
                value={<span className="tabular-nums">{giaBan} VNĐ</span>}
              />
              <Row
                icon={<ReceiptText className="h-4 w-4" />}
                label="Giá vốn"
                value={<span className="tabular-nums">{giaVon} VNĐ</span>}
              />
            </Block>

            <Block title="Thuộc tính">
              <div className="text-muted-foreground text-[11px]">Mô tả</div>
              <div className="text-foreground/90 text-sm break-words whitespace-pre-wrap">
                {item.property ? String(item.property) : "—"}
              </div>
            </Block>
          </div>
        </div>

        {/* FOOTER sticky */}
        <DrawerFooter className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky bottom-0 z-10 border-t backdrop-blur">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Đóng
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
