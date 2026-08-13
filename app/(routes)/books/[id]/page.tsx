import BookDetailPage from '@/app/components/books/[id]/page'

export default function BookDetailRoutePage({ params }: { params: { id: string } }) {
  return <BookDetailPage params={params} />
}
