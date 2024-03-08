
import classes from './index.module.scss' //CSS

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <h1>rrr</h1>
    </>
  );
}
