import { CurrentYear } from "@/components/ui/CurrentYear";
import { FooterBar } from "@/components/FooterBar";

export function Footer() {
  return <FooterBar year={<CurrentYear />} />;
}
