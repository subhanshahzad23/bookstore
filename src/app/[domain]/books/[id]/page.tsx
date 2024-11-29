/* eslint-disable @typescript-eslint/no-explicit-any */
import BookShowcase from "@/components/book-showcase";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/books-reel";
import {
  getBookByIdAction,
  getBooksAction,
} from "@/lib/actions/product.action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [books, bookData] = await Promise.all([
    getBooksAction(),
    getBookByIdAction({
      id,
    }),
  ]);

  return (
    <div className="w-full min-h-screen h-fit mt-[160px] pt-16 ">
      <MaxWidthWrapper className="my-8 h-fit">
        <BookShowcase book={bookData} />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="h-fit my-8 ">
        <ProductReel
          // these books they were comming from the database but i removed the action call
          books={books as any[]}
          title="Tuote-ehdotukset"
          desc="Ehdotukset perustuvat esitetyn tuotteen tekijään, tuoteryhmään tai aiheisiin."
        />
      </MaxWidthWrapper>
    </div>
  );
}
