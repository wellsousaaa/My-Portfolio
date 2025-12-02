import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Header() {
  return (
    <header className="header fixed w-full z-50 flex justify-end">
      <AnimatedThemeToggler />
    </header>
  );
}
