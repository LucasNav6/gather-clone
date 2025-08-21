import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/shared/freamwork/shadcn/ui/label";
import { Input } from "@/shared/freamwork/shadcn/ui/input";
import { Button } from "@/shared/freamwork/shadcn/ui/button";
import { FormItem } from "@/shared/freamwork/shadcn/ui/form";
import { useCreateRoom } from "../hooks/useCreateRoom";

const createRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  emails: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((email) => email.trim()) : undefined
    )
    .refine(
      (arr) => !arr || arr.every((email) => /^\S+@\S+\.\S+$/.test(email)),
      "Some emails are invalid"
    ),
  estimatedPeople: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || val >= 1, "Must be >= 1"),
});

type CreateRoomFormValues = z.infer<typeof createRoomSchema>;

export const CreateRoomPage = () => {
  const { handleCreateRoom: createRoom } = useCreateRoom();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomFormValues>()

  const onSubmit = (values: CreateRoomFormValues) => {
    createRoom({
        name: values.name,
        members: values.emails,
        maxPersons: values.estimatedPeople
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <FormItem>
        <Label>Room Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Enter room name" />}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </FormItem>

      <FormItem>
        <Label>Invite Members (emails, optional)</Label>
        <Controller
          name="emails"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="user1@example.com,user2@example.com" />
          )}
        />
        {errors.emails && <p className="text-red-500">{errors.emails.message}</p>}
      </FormItem>

      <FormItem>
        <Label>Estimated People (optional)</Label>
        <Controller
          name="estimatedPeople"
          control={control}
          render={({ field }) => <Input {...field} type="number" placeholder="e.g. 5" />}
        />
        {errors.estimatedPeople && (
          <p className="text-red-500">{errors.estimatedPeople.message}</p>
        )}
      </FormItem>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Crear"}
      </Button>
    </form>
  );
};
