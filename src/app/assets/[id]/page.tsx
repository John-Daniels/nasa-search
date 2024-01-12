const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <div className="bg-white">hello</div>;
};

export default page;
