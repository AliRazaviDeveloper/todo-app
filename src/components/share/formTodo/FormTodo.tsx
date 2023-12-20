import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import { STATUS_TODO } from "../../../types/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateTodo } from "../../../services/todo";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const { mutateAsync } = useCreateTodo();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isEdit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      mutateAsync({
        title: data.title,
        description: data.description,
      });
      queryClient.refetchQueries({ queryKey: ["todos"] });
      toast.success("created successfully todo");
      navigate("/");
    } catch (error) {
      toast.error("problem create Todo");
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

          <Grid item xs={12} lg={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              type="submit"
            >
              Create
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
