import Link from "next/link";
import { PlusCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NoTasks() {
  return (
    <Card className="w-[180px] h-[240px] min-w-[180px] min-h-[240px] max-w-[180px] max-h-[240px] flex flex-col items-center justify-center shadow-md">
      <CardContent>
        <div className="flex flex-col items-center space-y-6 p-2">
          <ClipboardList className="w-12 h-12 text-muted-foreground mt-4" />
          <p className="text-center text-muted-foreground">
            You do not have any tasks
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button asChild>
          <Link href="/tasks/create" className="flex items-center  ">
            <PlusCircle className="w-4 h-4" />
            add new
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
