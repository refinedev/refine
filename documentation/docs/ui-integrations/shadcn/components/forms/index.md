---
title: Forms with shadcn/ui
source: https://github.com/refinedev/refine/tree/feat/init-shadcn/packages/refine-ui/registry/new-york/refine-ui/form
---

# Building Forms with Refine and shadcn/ui

This guide explains how to create and manage forms in your Refine applications using the `@refinedev/react-hook-form` adapter and `shadcn/ui` components. We'll cover basic setup, validation with Zod, and provide examples for create and edit scenarios.

Refine's `useForm` hook, in conjunction with `react-hook-form` and a schema validation library like Zod, provides a robust solution for handling form state, submission, and validation. When combined with `shadcn/ui` components, you can build accessible and visually consistent forms.

**Key Features:**

- Seamless integration with Refine's data lifecycle for creating and updating resources.
- Powerful validation capabilities using `react-hook-form` and Zod.
- Leverages `shadcn/ui` for pre-built, customizable form components (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `Input`, `Textarea`, `Select`, `Button`, etc.).
- Works well within Refine UI's view components like `CreateView` and `EditView`.

## Installation

First, ensure you have `@refinedev/react-hook-form` installed:

```bash
npm install @refinedev/react-hook-form
```

You'll also need to have `shadcn/ui` initialized in your project and the necessary form-related components added (e.g., `form`, `input`, `button`, `select`, `textarea`). If you haven't already, you can add them via the CLI:

```bash
npx shadcn-ui@latest add form input button select textarea
```

## Usage

The `useForm` hook from `@refinedev/react-hook-form` is used to manage the form state and validation.

- `refineCore`:
  - `onFinish`: A function to handle form submission. It will automatically call the appropriate data provider method (`create` or `update`).
  - `formLoading`: A boolean indicating the loading state of the form submission.
  - `queryResult`: Contains the data for forms in `edit` mode.
- `register`: Function to register your input/select components with `react-hook-form`.
- `handleSubmit`: A wrapper for your submission handler (`onSubmit`) that also triggers validation.
- `formState: { errors }`: An object containing validation errors.
- `control`: Passed to `shadcn/ui`'s `Form` component and `FormField` for integrating `react-hook-form`.
- ...and other `react-hook-form` utilities.

1. Schema Validation with Zod

Zod is a TypeScript-first schema declaration and validation library. You define a schema for your form data, and `zodResolver` from `@hookform/resolvers/zod` integrates it with `react-hook-form`.

```typescript
import * as z from "zod";

const postFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  status: z.string({ required_error: "Please select a status." }),
  // For relations, you might want to define the ID
  category: z.object({
    id: z.number({ required_error: "Please select a category." }),
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;
```

2. `shadcn/ui` Form Components

`shadcn/ui` provides a set of components to build forms:

- `<Form {...form}>`: The main wrapper, taking the spread `form` object from `useForm`.
- `<FormField control={form.control} name="fieldName" render={({ field }) => (...)} />`: Connects an input to `react-hook-form`.
- `<FormItem>`: A container for a label, input, and error message.
- `<FormLabel>`: Displays the label for a form field.
- `<FormControl>`: Wraps the actual input component.
- `<FormMessage />`: Displays validation errors for a field.
- `<Input />`, `<Textarea />`, `<Select />`, etc.: The actual input elements.

The following examples demonstrate creating and editing a "Post" resource.

3. Creating a New Record (`CreatePost` Page)

This example shows a form for creating a new post, typically found in a file like `src/routes/posts/create.tsx`.

```tsx
import React from "react";
import { type HttpError, useBack } from "@refinedev/core";
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
import type { Post } from "../../types/resources"; // Define your Post type

// Define Zod schema
const postFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  status: z.string({ required_error: "Please select a status." }),
});
type PostFormValues = z.infer<typeof postFormSchema>;

// Define your Post type (example)
interface Post {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  // category?: { id: number }; // If you have a category relation
}

export default function CreatePostPage() {
  const back = useBack();

  const {
    refineCore: { onFinish, formLoading },
    ...form // Spread the rest of useForm's return values
  } = useForm<Post, HttpError, PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "draft",
    },
    refineCoreProps: {
      resource: "posts",
      action: "create", // Important: specifies the action
      // redirect: "list", // Optional: redirect after successful creation
      // successNotification: { /* ... */ }, // Optional: custom success notification
    },
  });

  function onSubmit(values: PostFormValues) {
    onFinish(values); // This will call your dataProvider.create()
  }

  return (
    <CreateView>
      <CreateViewHeader title="Create New Post" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
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
                    placeholder="Enter post content"
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading}>
              {formLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </CreateView>
  );
}
```

3. Editing an Existing Record (`EditPost` Page)

This example shows a form for editing an existing post, typically in a file like `src/routes/posts/edit.tsx`. It includes handling relational data (categories) using `useSelect` and a `Popover` + `Command` for selection.

```tsx
import React from "react";
import type { HttpError } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ChevronsUpDown, Check } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import { cn } from "@/lib/utils";
import type { Post, Category } from "../../types/resources";

// Define Zod schema (can be the same as create or extended)
const postFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  status: z.string({ required_error: "Please select a status." }),
  category: z.object({
    id: z.number({ required_error: "Category is required." }), // Assuming ID is a number
  }),
});
type PostFormValues = z.infer<typeof postFormSchema>;

// Define your Post and Category types (example)
interface Category {
  id: number;
  title: string;
}
interface Post {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category?: Category;
}

export default function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get record ID from URL

  const {
    refineCore: { onFinish, formLoading, queryResult }, // queryResult for initial data
    ...form
  } = useForm<Post, HttpError, PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      // Will be overridden by queryResult data
      title: "",
      content: "",
      status: "draft",
      category: { id: undefined },
    },
    refineCoreProps: {
      resource: "posts",
      action: "edit", // Important: specifies the action
      id: id, // Pass the record ID
      // redirect: "list",
      // successNotification: { /* ... */ },
    },
  });

  // Fetch categories for the select/combobox
  const { options: categoryOptions, queryResult: categoriesQuery } =
    useSelect<Category>({
      resource: "categories",
      optionValue: "id",
      optionLabel: "title",
    });

  function onSubmit(values: PostFormValues) {
    onFinish(values); // This will call your dataProvider.update()
  }

  return (
    <EditView>
      <EditViewHeader title={`Edit Post #${id}`} />
      <LoadingOverlay loading={formLoading || queryResult?.isLoading}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-4"
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
                      placeholder="Enter post content"
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
              name="category.id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                          type="button" // Important for not submitting the form
                          disabled={categoriesQuery.isLoading}
                        >
                          {field.value
                            ? categoryOptions?.find(
                                (option) => option.value === field.value,
                              )?.label
                            : "Select category..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoryOptions?.map((option) => (
                              <CommandItem
                                value={option.label} // Or option.value
                                key={option.value}
                                onSelect={() => {
                                  form.setValue(
                                    "category.id",
                                    option.value as number,
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    option.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                    value={field.value} // Ensure value is controlled for edit forms
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/posts")} // Adjust navigation path
                disabled={formLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={formLoading}>
                {formLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
}
```
