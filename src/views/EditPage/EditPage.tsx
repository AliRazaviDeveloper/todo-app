import PageContainer from "../../components/share/pageContainer/PageContainer.tsx";
import Content from "../../components/share/content/Content.tsx";
import Breadcrumb from "../../components/share/breadcrumb/Breadcrumb.tsx";
import FormTodo from "../../components/share/formTodo/FormTodo.tsx";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Edit Todo",
  },
];
const EditPage = () => {
  return (
    <PageContainer>
      <Breadcrumb title="Edit Todo Page" items={BCrumb} />
      <Content title="Todo List Page">
        <FormTodo isEdit />
      </Content>
    </PageContainer>
  );
};

export default EditPage;
