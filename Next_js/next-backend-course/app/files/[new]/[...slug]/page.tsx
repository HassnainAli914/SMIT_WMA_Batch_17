export default async function page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  return (
    <div>
      {/* {JSON.stringify(slug)} */}
      {slug.map((data, index) => (
        <li key={index}>{data}</li>
      ))}
    </div>
  );
}
