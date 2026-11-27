import Link from "next/link";
import s from "@/app/marketing-layout.module.css";
export default function UpdatesForm() {
  return (
    <div className={s.action}>
      <p>
        Choose production updates, customer-capture news or future developer
        tools in one place.
      </p>
      <Link href="/updates" className={s.button}>
        Choose your interests
      </Link>
      <p className={s.note}>
        Optional marketing emails. Essential guides remain free to read.
      </p>
    </div>
  );
}
