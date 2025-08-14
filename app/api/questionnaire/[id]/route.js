import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { answers, results, selectedEntities, selectedDocuments, engagementLetterUrl } = await request.json();

  try {
    const updateData = {
      ...(answers && { answers: JSON.stringify(answers) }),
      ...(results && { results: JSON.stringify(results) }),
      ...(selectedEntities && { selectedEntities: JSON.stringify(selectedEntities) }),
      ...(selectedDocuments && { selectedDocuments: JSON.stringify(selectedDocuments) }),
      ...(engagementLetterUrl && { engagementLetterUrl }),
    };

    const questionnaire = await prisma.questionnaire.update({
      where: { id },
      data: updateData,
    });

    return Response.json(questionnaire, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error updating questionnaire" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
    });

    if (!questionnaire) {
      return Response.json({ error: "Questionnaire not found" }, { status: 404 });
    }

    return Response.json(questionnaire, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error fetching questionnaire" }, { status: 500 });
  }
}
