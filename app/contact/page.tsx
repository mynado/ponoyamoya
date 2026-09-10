import ContactForm from "@/components/ContactForm";
import { getContactPage } from "@/lib/sanity/queries/index";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponentProps,
} from "next-sanity";

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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { subject } = await searchParams;
  const pageData = await getContactPage();
  return (
    <div className="mt-16 flex flex-col w-full items-center justify-center gap-4">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4 prose">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "Contact"}
        </h1>
        {pageData?.additionalInfo ? (
          <PortableText
            value={pageData.additionalInfo}
            components={portableTextComponents}
          />
        ) : (
          "Coming soon..."
        )}
      </div>
      <div className="max-w-(--breakpoint-md) mx-auto w-full mt-8 px-4">
        <ContactForm subject={subject} />
      </div>
    </div>
  );
}
