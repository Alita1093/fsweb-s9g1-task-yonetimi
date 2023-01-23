import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "", people: [] },
  });
  function onSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
  }
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          type="text"
          name="title"
          {...register("title", {
            required: "Bu alanı doldurmalısınız",
            minLength: { value: 3, message: "En az 3 karakter girmelisiniz!!" },
          })}
        />
        <p className="input-error">
          {errors.title && <p> {errors.title.message}</p>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Bu alanı doldurmalısınız",
            minLength: {
              value: 10,
              message: "En az 10 karakter girmelisiniz!!",
            },
          })}
        ></textarea>
        <p className="input-error">
          {errors.description && <p>{errors.description.message}</p>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  minLength: {
                    value: 1,
                    message: "Lütfen en az bir kişi seçin",
                  },
                  validate: {
                    ustSınır: (secimler) =>
                      secimler.length <= 3 || "En fazla 3 kişi seçilebilir",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">
          {errors.people && <p>{errors.people.message}</p>}
        </p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
