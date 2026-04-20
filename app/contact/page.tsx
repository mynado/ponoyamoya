import { getPage } from "@/lib/sanity/queries";
import ContactForm from "@/components/ContactForm";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponentProps,
} from "next-sanity";

// PortableText components
const portableTextComponents = {
  listItem: {
    bullet: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="list-disc ml-4">{props.children}</li>
    ),
    number: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="list-decimal ml-4">{props.children}</li>
    ),
  },
};

export default async function ContactPage() {
  const pageData = await getPage("Contact");

  return (
    <div className="mt-16 flex flex-col w-full items-center justify-center gap-4">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.heading || "Contact"}
        </h1>
        {pageData?.content && (
          <PortableText
            value={pageData.content}
            components={portableTextComponents}
          />
        )}
      </div>
      <div className="max-w-(--breakpoint-md) mx-auto w-full mt-8 px-4">
        <ContactForm />
      </div>
    </div>
  );
}
