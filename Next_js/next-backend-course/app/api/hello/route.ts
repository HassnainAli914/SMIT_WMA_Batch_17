export async function GET(request: Request) {
  console.log(request.url);
  console.log(request.method);

  return Response.json({
    success: true
  });
}