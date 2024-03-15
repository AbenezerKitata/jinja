import { getNotionDatabase } from "@/lib/actions";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const data = await getNotionDatabase(slug);

  // Handle the page data as needed
  console.log(data);

  return <div>Page Content</div>;
}
