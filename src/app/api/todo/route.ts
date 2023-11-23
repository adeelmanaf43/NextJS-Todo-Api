import { NextRequest, NextResponse } from "next/server";
import { db, Todo, NewTodo, todoTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm/mysql-core/expressions";

export async function GET() {
  try {
    const res = await db.select().from(todoTable).orderBy(todoTable.id);
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.task) {
      const newTodo: NewTodo = { task: req.task };
      const res = await db.insert(todoTable).values(newTodo).returning();
      return NextResponse.json({ message: "New Todo Added" });
    } else {
      return NextResponse.json({ message: "Missing required field" });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message as string });
  }
}

export async function PUT(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.task && req.id) {
      const updatedTodo: Todo = { task: req.task, id: req.id };
      const res = await db
        .update(todoTable)
        .set(updatedTodo)
        .where(eq(todoTable.id, req.id));
      return NextResponse.json({
        message: `Todo ${req.id} updated successfully`,
      });
    } else {
      return NextResponse.json({ message: "Missing required field" });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message as string });
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.id) {
      await db.delete(todoTable).where(eq(todoTable.id, req.id));
      return NextResponse.json({
        message: `Todo ${req.id} deleted successfully`,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message as string });
  }
}
