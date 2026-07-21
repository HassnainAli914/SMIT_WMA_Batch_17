export async function POST(request: Request) {
  const body = await request.json();

  console.log("Received Body:", body);

  return Response.json({
    success: true,
    message: "User loged in Successfully",
    data: body,
  });
}
