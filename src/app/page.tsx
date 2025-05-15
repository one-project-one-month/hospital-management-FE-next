import { Button } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex-center gap-4">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>

      <Button variant="secondary" asChild>
        <Link href="/register">Register</Link>
      </Button>
    </section>
  );
}
