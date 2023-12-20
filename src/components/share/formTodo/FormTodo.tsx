import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import { STATUS_TODO } from "../../../types/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useCreateTodo,
  useEditTodoMutation,
  useGetTodoQuery,
} from "../../../services/todo";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import SelectController from "../../ui/select/SelectController";
export const STATUS_OPTIONS = [
  { value: "1", label: STATUS_TODO.COMPLETE },
  { value: "2", label: STATUS_TODO.DOING },
  { value: "3", label: STATUS_TODO.PENDING },
];
export type FormData = {
  title: string;
  description: string;
  status?: STATUS_TODO;
};
const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
type FormDataProps = {
  isEdit?: boolean;
};
const FormTodo = (props: FormDataProps) => {
  const { id } = useParams();
  const { data: todo } = useGetTodoQuery(id as string);

  const { mutateAsync } = useCreateTodo();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isEdit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: todo?.description || "",
      title: todo?.title || "",
      status: todo?.status || "",
    },
  });

  useEffect(() => {
    setValue("title", todo?.title ?? "");
    setValue("description", todo?.description ?? "");
    setValue("status", todo?.status ?? "");
  }, [isEdit, id, todo, setValue]);

  const { mutateAsync: updateTodo } = useEditTodoMutation(id as string);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEdit) {
      updateTodo({
        title: data.title,
        description: data.description,
        status: data.status,
        date: new Date().toISOString(),
      })
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["todos"] });
          navigate("/");
        })
        .catch(() => {
          toast.error("problem update Todo");
        });
    } else {
      mutateAsync({
        title: data.title,
        description: data.description,
      })
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["todos"] });
          toast.success("created successfully todo");
          navigate("/");
        })
        .catch(() => {
          toast.error("problem create Todo");
        });
    }
  };

  return (
    <Box mt={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={3} container>
          <Grid item xs={12} lg={12}>
            <FormLabel>Title</FormLabel>
            <TextField
              id="title"
              size="small"
              variant="outlined"
              fullWidth
              {...register("title")}
            />
            <Box sx={{ color: "red" }}>{errors.title?.message}</Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormLabel>description</FormLabel>
            <TextField
              id="description"
              size="small"
              multiline
              rows="3"
              variant="outlined"
              fullWidth
              {...register("description")}
            />
            <Box sx={{ color: "red" }}>{errors.title?.message}</Box>
          </Grid>
          {isEdit && (
            <Grid item xs={12} lg={12}>
              <SelectController
                control={control}
                name="status"
                label="status"
                placeholder="select status"
                options={STATUS_OPTIONS || []}
              />
            </Grid>
          )}

          <Grid item xs={12} lg={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              type="submit"
            >
              {isEdit ? "Edit" : "Create"}
            </Button>
            <Button type="reset" variant="contained" color="error">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormTodo;
