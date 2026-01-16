"use client";

import { z } from "zod";
import {
  Phone,
  CircleHelp,
  User,
  Ticket,
  Fingerprint,
  ShieldCheck,
  Mail
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { academySchema } from "./schema";

/* ---------- UI helpers ---------- */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">
          {value ?? <span className="text-muted-foreground">—</span>}
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card/60 p-3">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="grid gap-2.5">{children}</div>
    </div>
  );
}

/* ---------- Component ---------- */
export function TableCellViewer({
  item,
}: {
  item: z.infer<typeof academySchema>;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-white hover:text-white">
          {item.name}
        </Button>
      </DrawerTrigger>

      {/* Drawer 400px – full height desktop */}
      <DrawerContent className="h-[100vh] sm:max-w-[400px] sm:ml-auto">
        {/* ===== HEADER ===== */}
        <DrawerHeader className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <DrawerTitle className="truncate text-base">
                {item.name}
              </DrawerTitle>

              {item.event_name && (
                <Badge variant="secondary" className="shrink-0 rounded-full">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                  {item.event_name}
                </Badge>
              )}
            </div>

            <DrawerDescription className="mt-1 flex items-center gap-2 truncate">
              <Fingerprint className="h-3.5 w-3.5" />
              User ID: {item.user_id || 'N/A'}
            </DrawerDescription>
          </div>
        </DrawerHeader>

        {/* ===== BODY ===== */}
        <div className="flex-1 overflow-y-auto px-4 py-4 nice-scroll">
          <div className="grid gap-3">
            {/* Thông tin cá nhân */}
            <Block title="Thông tin cá nhân">
              <InfoRow
                icon={<User className="h-4 w-4" />}
                label="Họ và tên"
                value={item.name}
              />
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label="Điện thoại"
                value={item.phone}
              />
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={item.email}
              />
            </Block>

            {/* Câu hỏi */}
            {(item.q1 || item.q2 || item.q3 || item.q4 || item.q5) && (
              <Block title="Câu hỏi">
                {item.q1 && (
                  <InfoRow
                    icon={<CircleHelp className="h-4 w-4" />}
                    label={item.title_q1 || "Câu hỏi 1"}
                    value={item.q1}
                  />
                )}
                {item.q2 && (
                  <InfoRow
                    icon={<CircleHelp className="h-4 w-4" />}
                    label={item.title_q2 || "Câu hỏi 2"}
                    value={item.q2}
                  />
                )}
                {item.q3 &&(
                  <InfoRow
                    icon={<CircleHelp className="h-4 w-4" />}
                    label={item.title_q3 || "Câu hỏi 3"}
                    value={item.q3}
                  />
                )}
                {item.q4 && (
                  <InfoRow
                    icon={<CircleHelp className="h-4 w-4" />}
                    label={item.title_q4 || "Câu hỏi 4"}
                    value={item.q4}
                  />
                )}
                {item.q5 && (
                  <InfoRow
                    icon={<CircleHelp className="h-4 w-4" />}
                    label={item.title_q5 || "Câu hỏi 5"}
                    value={item.q5}
                  />
                )}
              </Block>
            )}

            {/* Voucher */}
            {item.voucher && (
              <Block title="Mã Voucher">
                <InfoRow
                  icon={<Ticket className="h-4 w-4" />}
                  label="Voucher"
                  value={
                    <span className="font-mono text-base font-semibold text-primary">
                      {item.voucher}
                    </span>
                  }
                />
              </Block>
            )}

            <Separator />
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <DrawerFooter className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur">
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
