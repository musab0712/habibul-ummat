import BooksPageClient from "./BooksPageClient";

// ye route config sirf SERVER file me allowed hai
export const dynamic = "force-dynamic";
// optional: agar [lang] ka dynamic params use kar rahe ho
export const dynamicParams = true;

export default function BooksPage() {
  return <BooksPageClient />;
}
