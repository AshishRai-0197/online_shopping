import { redirect } from "next/navigation";

// Contact details live on the feedback page.
export default function ContactPage() {
  redirect("/feedback");
}
