"use client";

import { z } from "zod";
import {
  Phone,
  MapPin,
  User,
  Building2,
  Ticket,
  Fingerprint,
  ShieldCheck,
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

              {item.role && (
                <Badge variant="secondary" className="shrink-0 rounded-full">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                  {item.role}
                </Badge>
              )}
            </div>

            <DrawerDescription className="mt-1 flex items-center gap-2 truncate">
              <Phone className="h-3.5 w-3.5" />
              {item.phone}
            </DrawerDescription>
          </div>
        </DrawerHeader>

        {/* ===== BODY ===== */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
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
                icon={<MapPin className="h-4 w-4" />}
                label="Tỉnh / Thành phố"
                value={item.city}
              />
            </Block>

            {/* Thông tin học viện */}
            <Block title="Thông tin học viện">
              <InfoRow
                icon={<Building2 className="h-4 w-4" />}
                label="Cơ sở"
                value={item.co_so}
              />
              <InfoRow
                icon={<User className="h-4 w-4" />}
                label="Nhân viên phụ trách"
                value={item.name_nv}
              />
              <InfoRow
                icon={<Ticket className="h-4 w-4" />}
                label="Voucher"
                value={item.voucher}
              />
            </Block>

            {/* Thông tin hệ thống */}
            <Block title="Thông tin hệ thống">
              <InfoRow
                icon={<Fingerprint className="h-4 w-4" />}
                label="User ID"
                value={item.user_id}
              />
            </Block>

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
