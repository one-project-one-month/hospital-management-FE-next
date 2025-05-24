import { Button } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="flex-center size-full gap-5">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>

        <Button variant="secondary" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </section>
  );
}
