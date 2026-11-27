import Link from "next/link";
import JsonLd from "./json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import styles from "@/app/marketing-layout.module.css";
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className={styles.pageBreadcrumbs}>
        <ol>
          {items.map((item, index) => (
            <li key={item.path}>
              {index > 0 && <span aria-hidden="true"> / </span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
