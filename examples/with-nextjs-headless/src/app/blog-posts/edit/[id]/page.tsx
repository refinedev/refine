"use client";

import { useForm } from "@refinedev/react-hook-form";
import { Link, useSelect, useTranslate } from "@refinedev/core";

export default function BlogPostEdit() {
  const translate = useTranslate();

  const {
    refineCore: { onFinish, query },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const data = query?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  return (
    <div>
      <br />

      <h1>
        {translate("blog_posts.titles.edit")} #{data?.id}
      </h1>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>{translate("blog_posts.fields.title")}</label>
          <br />
          <input
            type="text"
            {...register("title", {
              required: "This field is required",
            })}
          />
          {errors.title && <span>{errors.title.message?.toString()}</span>}
        </div>

        <div>
          <label>{translate("blog_posts.fields.content")}</label>
          <br />
          <textarea
            {...register("content", {
              required: "This field is required",
            })}
            rows={5}
          />
          {errors.content && <span>{errors.content.message?.toString()}</span>}
        </div>

        <div>
          <label>{translate("blog_posts.fields.category")}</label>
          <br />
          <select
            {...register("category.id", {
              required: "This field is required",
            })}
          >
            <option value="">
              {translate("blog_posts.form.select.category.placeholder")}
            </option>
            {categoryOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && <span>This field is required</span>}
        </div>

        <div>
          <label>{translate("blog_posts.fields.status.title")}</label>
          <br />
          <select
            {...register("status", {
              required: "This field is required",
            })}
            defaultValue="draft"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.status && <span>{errors.status.message?.toString()}</span>}
        </div>

        <br />

        <button type="submit">{translate("buttons.save")}</button>
        <button type="button">
          <Link go={{ to: { resource: "blog_posts", action: "list" } }}>
            {translate("buttons.cancel")}
          </Link>
        </button>
      </form>
    </div>
  );
}
