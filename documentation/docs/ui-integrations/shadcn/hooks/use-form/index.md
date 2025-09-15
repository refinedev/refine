---
title: useForm
source: https://github.com/refinedev/refine/tree/main/packages/react-hook-form
---

# Forms with useForm

Creating and editing data is at the heart of any admin dashboard. The `useForm` hook from `@refinedev/react-hook-form` makes it easy to build forms that integrate with your Refine data providers while leveraging shadcn/ui components for a polished interface.

This hook handles form state, validation, submission, and automatically connects to your CRUD operations - whether you're creating new records or editing existing ones.

## Installation

Install the React Hook Form adapter for Refine:

```bash
npm install @refinedev/react-hook-form
```

You'll also need the shadcn/ui form components:

```bash
npx shadcn@latest add form input button select textarea
```

## Usage

Here's a comprehensive example of creating a form for a new blog post:

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";

// Define validation schema
const postSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  status: z.string({ required_error: "Please select a status." }),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePost() {
  const {
    refineCore: { onFinish, formLoading },
    ...form
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "draft",
    },
    refineCoreProps: {
      resource: "posts",
      action: "create",
    },
  });

  const onSubmit = (data: PostFormData) => {
    onFinish(data); // Automatically calls your data provider's create method
  };

  return (
    <CreateView>
      <CreateViewHeader title="Create New Post" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your post content..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading}>
              {formLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </CreateView>
  );
}
```

## Edit Forms

For editing existing records, you can use a similar approach with more comprehensive data handling:

```tsx
import { useParams } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

const postSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  status: z.string({ required_error: "Please select a status." }),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPost() {
  const { id } = useParams();

  const {
    refineCore: { onFinish, formLoading, queryResult },
    ...form
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    refineCoreProps: {
      resource: "posts",
      action: "edit",
      id, // Pass the record ID
    },
  });

  const onSubmit = (data: PostFormData) => {
    onFinish(data); // Calls your data provider's update method
  };

  return (
    <EditView>
      <EditViewHeader title={`Edit Post #${id}`} />
      <LoadingOverlay loading={formLoading || queryResult?.isLoading}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
}
```

The edit form automatically loads existing data through the `queryResult` and handles updates when submitted.

````

## Validation

The hook integrates with Zod for comprehensive form validation. Here are some common validation patterns:

```tsx
import * as z from "zod";

const userSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Invalid age"),
  role: z.enum(["admin", "user", "moderator"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Error will show on confirmPassword field
});

type UserFormData = z.infer<typeof userSchema>;
````

Validation errors automatically appear next to form fields using `<FormMessage />`. You can also access validation state:

```tsx
const form = useForm<UserFormData>({
  resolver: zodResolver(userSchema),
  // ...
});

// Check if form is valid
const isValid = form.formState.isValid;

// Get specific field errors
const emailError = form.formState.errors.email?.message;

// Check if field has been touched
const emailTouched = form.formState.touchedFields.email;
```

## API Reference

### useForm Hook

| Option                     | Type                 | Description                                    |
| -------------------------- | -------------------- | ---------------------------------------------- |
| `resolver`                 | `Resolver`           | Form validation resolver (e.g., `zodResolver`) |
| `defaultValues`            | `object`             | Default form values                            |
| `refineCoreProps.resource` | `string`             | Resource name for CRUD operations              |
| `refineCoreProps.action`   | `"create" \| "edit"` | Form action type                               |
| `refineCoreProps.id`       | `string \| number`   | Record ID for edit forms                       |

### Return Values

| Value                    | Type       | Description                      |
| ------------------------ | ---------- | -------------------------------- |
| `refineCore.onFinish`    | `function` | Form submission handler          |
| `refineCore.formLoading` | `boolean`  | Loading state during submission  |
| `refineCore.queryResult` | `object`   | Data query result for edit forms |
| `control`                | `object`   | React Hook Form control object   |
| `handleSubmit`           | `function` | Form submission wrapper          |
| `formState.errors`       | `object`   | Form validation errors           |
