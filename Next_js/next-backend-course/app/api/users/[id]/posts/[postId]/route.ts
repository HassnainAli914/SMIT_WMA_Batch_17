interface Param {
  id: number;
  postId: string
}
export async function GET(request: Request, { params }: { params: Promise<Param> }) {
  const { id, postId } = await params;

  return Response.json({
    message: "user found:",
    userId: id,
    message1: "Post found:",
    postId: postId
  });
}
